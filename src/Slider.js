import React from 'react'
import image from './images/slider/banner.jpg' 
import './App.css'


function Slider() {
    return (
        <div>

            <div className="slider-detail">

                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={image} alt="First slide" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className=" bounceInDown">E - Learning</h5>
                                <p className=" text-center">Powering Education of world.</p>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Slider
