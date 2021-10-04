function BadRequest(message = "") {
    this.code = 400
    this.name = "BadRequest";
    this.message = message;
}

function Unauthorized(message = "") {
    this.code = 401
    this.name = "Unauthorized";
    this.message = message;
}

function Forbidden(message = "") {
    this.code = 403
    this.name = "Forbidden";
    this.message = message;
}

function NotFound(message = "") {
    this.code = 404
    this.name = "NotFound";
    this.message = message;
}

function NotAcceptable(message = "") {
    this.code = 406
    this.name = "NotAcceptable";
    this.message = message;
}

function InternalServerErrors(message = "") {
    this.code = 500
    this.name = "InternalServerErrors";
    this.message = message;
}


BadRequest.prototype = Error.prototype;
Unauthorized.prototype = Error.prototype;
Forbidden.prototype = Error.prototype;
NotFound.prototype = Error.prototype;
NotAcceptable.prototype = Error.prototype;
InternalServerErrors.prototype = Error.prototype;


module.exports = {
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    NotAcceptable,
    InternalServerErrors
};