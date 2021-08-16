"""run.py: REST API for running caltus software."""

__author__ = "Fidel A. Guerrero Pena"
__copyright__ = "Copyright 2020"


import os
import secrets
import math
import threading
from flask import Flask, send_file
from flask_restful import reqparse, Resource, Api
from werkzeug.datastructures import FileStorage
from flask_cors import CORS
from process import Test_process
import json
import potrace
from imageutl import imread, imsave
import numpy as np
from zipfile import ZipFile
from threading import Thread
import concurrent.futures

from datetime import datetime

app = Flask(__name__)

# Added CORS
CORS(app)
api = Api(app)


CONFIG_EXEC = "jcell segment"
CONFIG_PATH = os.getcwd() + "/"

test = {}

output_types = [
    "image",
    "object_overlay",
    "segmentation",
    "instances_rgb",
    "boundary",
    "bound_overlay",
    "instances",
    "probability",
    "classification",
]


def run_method(id, model="general", GPU=False):
    output_path = os.getcwd()

    model_dict = json.load(open("models/models.json"))

    if id not in test.keys():
        test[id] = Test_process(CONFIG_PATH, CONFIG_EXEC)
        args = {
            "model": model_dict[model]["path"],
            "input": "inputs/{}".format(id),
            "output": "{}/outputs/".format(output_path),
            "use_gpu": 1 if GPU else False,
            "output_type": "all",
        }
        print(args)
        test[id](args)

def thread_paths(max_instances, image, last):
    svg_dict = dict()
    path_svg = max_instances
    svg_paths = {}
    svg_str = ""
    for i in range(1, max_instances + 1):
        instance = (image == i).astype(np.uint32)
        bmp = potrace.Bitmap(instance)
        path = bmp.trace()
        svg = bmp.to_xml()
        svg = svg.split("<path")
        if i == 1:
            svg_str = svg[0]
            if len(svg) == 1:
                svg_str = svg_str.replace("</g>", "").replace("</svg>", "")

        if len(svg) > 1:
            ending = svg[1].split("/>")[1]
            for s in range(1, len(svg)):
                svg_paths[str(path_svg)] = (
                    svg[s]
                    .split("/>")[0]
                    .replace("\n", " ")
                    .replace(' d="', "")
                    .replace('"', "")
                )
                path_svg = path_svg + 1
            svg = [
                "<path" + s.split("/>")[0].replace("\n", " ") + "/>"
                for s in svg[1:]
            ]
            svg_str += " ".join(svg)
            svg_dict[i] = svg
        if i == max_instances and last:
            svg_str += ending
    return svg_str, svg_paths
        

def svg_extraction(filename):
    svg_str = ""
    threads = []
    svg_paths = {}
    if not os.path.exists("outputs/{}_instances.svg".format(filename)):
        image = imread("outputs/{}_instances.tif".format(filename))

        max_instances = image.max()
        max_threads = math.ceil(max_instances/10)
        rest = max_instances % 10 

        for i in range(0, max_threads):
            last = True if i == max_threads - 1 else False
            with concurrent.futures.ThreadPoolExecutor() as executor:
                threads.append(executor.submit(thread_paths, []))

        for i in range(0, len(threads)):
            if threads[i].running(): i = i - 1 

        for thread in threads:
            str_path, svg_path = thread.result()
            svg_str += str_path
            svg_paths = {**svg_paths, **svg_path}

        f = open("outputs/{}_instances.svg".format(filename), "w")
        f.write(svg_str)
        f.close()
    return svg_paths
    # return send_file("outputs/{}_instances.svg".format(filename))


def zip_images(filename):
    zipObj = ZipFile("outputs/{}.zip".format(filename), "w")
    for x in output_types:
        zipObj.write("outputs/{}_{}".format(filename, x))
    zipObj.write("outputs/{}_instances.svg".format(filename))
    zipObj.close()
    return send_file("outputs/{}.zip".format(filename))


class Model(Resource):
    def get(self, id=None):
        model = json.load(open("models/models.json"))
        if id is None:
            return model

        return send_file(
            model[id]["image_sample"],
            mimetype="image/gif",
        )


class Image(Resource):
    def get(self, id=None, flag=None):

        # id must be valid
        if id is None:
            return {"message": "Please, provide a valid id"}

        # Request for other masks
        flag = int(flag)
        id, _ = os.path.splitext(id)
        ext = ".png"
        if flag < 9 and flag >= 0:
            filename = "outputs/{}_{}{}".format(
                id,
                output_types[flag],
                ext if flag not in [6, 7] else ".tif",
            )
            if not os.path.exists(filename):
                image = imread(filename[:-4] + ".tif")
                imsave(filename[:-4] + ".png", image)

            return send_file(
                filename,
                mimetype="image/gif",
            )
        elif flag == 9:
            return svg_extraction(id)
        elif flag == 10:
            return send_file("outputs/{}_instances.svg".format(id))
        elif flag == 11:
            return zip_images(id)
        else:
            return {
                "message": "Please, provide a valid output type flag (0-8)"
            }


class Result(Resource):
    def get(self, id=None):
        """
        Example:
        curl -X GET  http://localhost:5000/result/<id>/
        """
        if id is None:
            return {"message": "Please, provide a valid id"}

        if id in test.keys():
            # if task completed, i.e. status=dead and return_type=D
            if test[id].status == "dead" and test[id].return_type == "D":
                return {"message": "Done processing"}

            # Error during evaluation
            elif test[id].status == "dead":
                return {
                    "message": "The following error ocurred during evaluation\n {}".format(
                        test[id].err
                    )
                }

            # Process still running
            else:
                return {
                    "message": "Process still running",
                    "Stage": test[id].stage,
                    "Percentage": test[id].percentage,
                    "ETA": test[id].eta,
                }

        # Id not found
        else:
            return {"message": "Please, provide a valid id"}


class Segmentation(Resource):
    def post(self):
        """
        Example:
        curl -v POST -F "image=@a.png" "model=all" http://localhost:5000/segmentation/
        """
        parse = reqparse.RequestParser()
        parse.add_argument("image", type=FileStorage, location="files")
        parse.add_argument("model", type=str, default="general")
        parse.add_argument("gpu", type=bool, default=False)

        args = parse.parse_args()
        image_file = args["image"]
        id = datetime.now().strftime("%m%d%Y_%H%M%S_") + image_file.filename
        image_file.save("inputs/{}".format(id))

        run_method(id, args["model"], True)
        return {"id": id}, 201


api.add_resource(Image, "/result/image/<id>/<flag>/")
api.add_resource(Model, "/models/", "/models/<id>/")
api.add_resource(Result, "/result/<id>/")
api.add_resource(Segmentation, "/segmentation/")

if __name__ == "__main__":
    app.run(debug=True)
