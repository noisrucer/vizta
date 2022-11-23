import React from "react";
// import { Button } from "@mui/material"
// import { Link } from "react-router-dom";
// import Typography from "@mui/material/Typography";
import ProductHero from "../../components/views/ProductHero";
import ProductValues from "../../components/views/ProductValues";
import ProductCategories from "../../components/views/ProductCategories";
import ProductHowItWorks from "../../components/views/ProductHowItWorks";
import ProductCTA from "../../components/views/ProductCTA";
import ProductSmokingHero from "../../components/views/ProductSmokingHero";
import AppFooter from "../../components/views/AppFooter";

const Landing = (props) => {

    return (
        <>
            <React.Fragment>
                <ProductHero />
                <ProductValues />
                <ProductCategories />
                <ProductHowItWorks />
                <ProductCTA />
                <ProductSmokingHero />
                <AppFooter />
            </React.Fragment>
        </>
        )
    };


export default Landing;

// Product Intro
// Sign-in
// Sign-up
