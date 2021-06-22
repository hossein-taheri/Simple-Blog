const express = require("express") ;
const morgan = require("morgan");
const helmet = require("helmet");


module.exports = ( app ) => {
    
    //Secure app By Helmet
    app.use(helmet());

    //Some main express configs
    app.use(express.static('public')) ;

    app.use(express.json());

    app.use(express.urlencoded({
        extended: true
    }));


    //Log requests with morgan
    app.use(morgan("dev")) ;

}
