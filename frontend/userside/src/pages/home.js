import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Media from "../component/media"
import "./styles/home.css"
import Navbar from "../component/navbar"

export default class Home extends React.Component{
    render(){
        return(
            <div className="home">
                <Navbar/>
                <div className="banner">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 my-3">
                                <h1 className="white">Get your 
                                    laundry & dry cleaning<br/> 
                                    within <span className="oren">24 hours</span>  
                                </h1>
                                <p>
                                    a convenient laundry solution 
                                    that helps protect the environment
                                </p>
                                <Link to="/packages"><button className="btn btn-banner">See Our Services</button></Link>
                            </div>
                            <div className="col-lg-7">
                                <Media value image="banner-image.png" width="100%" height="100%"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="howtowork">
                    <div className="container">
                        <h2 className="text-center">How MyLaundry <span className="biru-laut">Works</span></h2>
                        <div className="row row1">
                            <div className="col-sm-12 col-md-6 col-lg-4 my-2">
                                <div className="row justify-content-center">
                                    <div className="circle">
                                        <Media value image="outlet-logo.png" width="100px" height="100px"/>
                                    </div>
                                    <p>
                                        <span className="bold">Select Outlet</span>-select the location of the 
                                        MyLaundry outlet that you want
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 my-2">
                                <div className="row justify-content-center">
                                    <div className="circle">
                                        <Media value image="paket-logo.png" width="100px" height="100px"/>
                                    </div>
                                    <p>
                                        <span className="bold">Select Package</span>-select the laundry<br/> 
                                        package you want
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 my-2">
                                <div className="row justify-content-center">
                                    <div className="circle">
                                        <Media value image="shirt-logo.png" width="100px" height="100px"/>
                                    </div>
                                    <p>
                                        <span className="bold">We Deliver or You Pick Up</span>- Your clothes can 
                                        be delivered or you can pick up yourself
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="deliver">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 mb-5">
                                <h1>
                                    Affordable 
                                    wash & deliver
                                </h1>
                                <p> Hassle free and affordable dry<br/>
                                    cleaning and laundry delivered to<br/>
                                    your home or office
                                </p>
                                <Link to="/packages"><button className="btn btn-deliver">Order Now</button></Link>
                            </div>
                            <div className="col-lg-7">
                                <Media value image="deliver-image.png" width="100%" height="100%"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="superiority">
                    <div className="container">
                        <h2 className="text-center">Clean clothes, <span className="biru-laut">Y'all</span></h2>
                        <div className="row row1">
                            <div className="col-sm-12 col-md-6 col-lg-4 my-3">
                                <div className="row justify-content-center text-center">
                                    <div className="image">
                                        <Media value image="checked-icon.png" width="100px" height="100px"/>
                                    </div>
                                    <h3>Easy & Convenient</h3>
                                    <p>Our app make scheduling hasle free</p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 my-3">
                                <div className="row justify-content-center text-center">
                                    <div className="image">
                                        <Media value image="pricing-icon.png" width="100px" height="100px"/>
                                    </div>
                                    <h3>Competitive Pricing</h3>
                                    <p> 
                                        You won’t find a better cleaner for<br/> 
                                        the price
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 my-3">
                                <div className="row justify-content-center text-center">
                                    <div className="image">
                                        <Media value image="guarantee-icon.png" width="100px" height="100px"/>
                                    </div>
                                    <h3>Quality guarantee</h3>
                                    <p>
                                        Our quality is the best in Indonesia
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prices">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-4 mb-5">
                                <h2>
                                    Wash & 
                                    Deliver <span className="biru-laut">Pricing</span>
                                </h2>
                            </div>
                            <div className="col-lg-4 ">
                                <div className="square">
                                    <div className="square-header"></div>
                                    <div className="content">
                                        <h3 className="text-center">+Rp. 5000</h3>
                                        <p>
                                            We will wash and deliver your laundry if
                                            you add IDR. 5000 for your laundry delivery 
                                            fee.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="testimoni">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-sm-12 col-md-6 col-lg-4 my-3 text">
                                <Media value image="bubble-text.png" width="80px" height="40px"/>
                                <h2>
                                    What People<br/> 
                                    Are <span className="oren">Saying</span>
                                </h2>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 my-3">
                                <div className="square">
                                    <div className="square-header"></div>
                                    <div className="content">
                                        <div className="pp d-flex justify-content-center">
                                            <Media value image="testimoni-pp.png" width="80px" height="80px"/>
                                        </div>
                                        <p>
                                            very good, the work is fast and the results are guaranteed. 
                                            The fragrance lasts a long time and my clothes 
                                            are maximally clean
                                        </p>
                                        <div className="star text-center">
                                        <Media value image="star.png" width="180px" height="36px"/>
                                        </div>
                                        <p className="name">Tony Stark</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 my-3">
                                <div className="square">
                                    <div className="square-header"></div>
                                    <div className="content">
                                        <div className="pp d-flex justify-content-center">
                                            <Media value image="testimoni-pp.png" width="80px" height="80px"/>
                                        </div>
                                        <p>
                                            very good, the work is fast and the results are guaranteed. 
                                            The fragrance lasts a long time and my clothes 
                                            are maximally clean
                                        </p>
                                        <div className="star text-center">
                                        <Media value image="star.png" width="180px" height="36px"/>
                                        </div>
                                        <p className="name">Tony Stark</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}