module.exports = ( app ) => {
    //If request is here , then no route has not been found
    app.use( (req, res ) => {
        // Respond with json
        return res.json({ // TODO :: remove this after adding response class
            status : 404 ,
            messages : 'Not Found' ,
            data : null ,
        });
    });
}