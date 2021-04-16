import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';

import HomepageContainer from '../components/HomepageContainer/HomepageContainer'

const Homepage = () => {
    const [ menu, setMenu ] = useState(false)

    return(
        <>
            {!menu?
            <Navbar/>
            :
            undefined
            }   
            <HomepageContainer 
                setMenu={setMenu}
            />
        </>
    );
}

export default Homepage;