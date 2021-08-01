const Errors = {
    errors : ( err_messages ) =>  {
        return err_messages.array() ;
    } ,
    error : ( err_message ) => {
        return [ { "msg" : err_message } ]  ;
    } ,
    message : ( message ) => {
        return [ { "msg" : message } ] ;
    } ,
    serverError :() => {
        return  Errors.error('Internal Server Errors') ;
    } ,
}

module.exports = Errors ;