module.exports = {
    respondWithError(req, res, error) {
        res.status(500);
        if (typeof (error) == typeof ('')) {
            return this.respond(req, res, false, "", "", error, "");
        }
        return this.respond(req, res, false, "", "", error.message, "");
    },
    send(req, res, obj = {}) {
        if (obj && obj.error) {
            return this.respondWithError(res, res, obj.error);
        }
        this.respondWithSuccess(req, res, obj.data);
    },
    respondUnauthorised(req, res) {
        res.status(401);
        return this.respond(req, res, false, "", "", 'Unauthorised Request', "")
    },
    respondWithNotFoundError(req, res, message) {
        res.status(404);
        return this.respond(req, res, false, "", "", message, "");
    },
    respondWithValidationError(req, res, errors) {
        res.status(422);
        if (typeof (errors) == typeof ('')) {
            return this.respond(req, res, false, "", "", errors, "")
        }
        if (errors.isJoi) {
            return this.respond(req, res, false, "", null, errors.details[0].message.replace(/"/g, ''), null);
        }
        console.trace(errors);
        return this.respond(req, res, false, "", "", errors.array()[0], "", errors.mapped());
    },
    respondWithSuccess(req, res, data, message = "") {
        res.status(200);
        return this.respond(req, res, true, "", data, message, "");
    },
    respondWithFailure(req, res, data, message = "") {
        res.status(200);
        return this.respond(req, res, false, "", data, message, "");
    },
    respondWithToken(req, res, token = "", data, message, permissonToken = "") {
        res.status(200);
        return this.respond(req, res, true, token ? token : req.user ? req.user.token : "", data, message, permissonToken);
    },
    respond(req, res, status, token = "", data, message = "", permissonToken = "", error = "") {
        return res.json({
            status,
            data,
            message,
            token: token ? token : req.user ? req.user.token : "",
            permissonToken,
            error
        });
    },
    formatter({
        location,
        msg,
        param,
        value,
        nestedErrors
    }) {
        return msg;
    }
}