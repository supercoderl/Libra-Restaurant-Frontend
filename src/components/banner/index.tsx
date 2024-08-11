import React, { useEffect } from 'react'
import EmblaCarousel from 'src/plugins/Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel';
import { LazyLoadImage } from 'src/plugins/Carousel/EmblaCarouselLazyLoadImage';

export default function Banner() {
    const OPTIONS: EmblaOptionsType = { loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    return (
        <EmblaCarousel
            className='banner'
            options={OPTIONS} >
            {
                SLIDES.map((index) => (
                    <LazyLoadImage
                        key={index}
                        index={index}
                        imgSrc={`https://picsum.photos/600/350?v=${index}`}
                        inView={SLIDES.indexOf(index) > -1}
                    />
                ))
            }
        </EmblaCarousel>
    );
}