import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import './ImageSlider.css'

const ImageSlider = props => {

    let imageDivs = props.links.map(imgData => (
        <img key={imgData.key} src={imgData.url} alt=""/>
    ))

    return (
        <Carousel infiniteLoop showArrows showThumbs={false}>
            {imageDivs}
        </Carousel>
    )

}

export default ImageSlider;