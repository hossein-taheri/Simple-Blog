//Router file
const router = require('../routers/index') ;

module.exports = ( app ) => {
    //App uses this router file
    app.use('/', router ) ;
}