import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos";

import example1 from '../../assets/example-image-1.png'

import './Photoswipe.css'

const Photoswipe = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const CustomFooter = ({ isModal, currentView }) => isModal && (
    <div className="react-images__footer">
      <button
        className="btn some-stylin"
        type="button"
        className="photoswipe-button"
        onClick={()=>{props.uploadData(currentView['src'])}} 
      >
        Submit
      </button>
      <img src={currentView['src']} id={currentView['src']} style={{display: "none"}}/>
    </div>
  );

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x, i) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
              components={{Footer: CustomFooter}}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default Photoswipe;