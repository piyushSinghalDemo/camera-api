const fs = require('fs');
const ROOT_PATH = require("../constants/constants").ROOT_PATH;
const Responder = require('./errorhandler')
module.exports.getLogLists = async function (req, res) {
    let logFiles = [];
    fs.readdirSync(`${ROOT_PATH}/logs`).forEach(file => {
        logFiles.push(file)
    });
    res.json(logFiles);
}
module.exports.getLog = async function (req, res) {
    let logFilePath = `${ROOT_PATH}/logs/${req.params.log}`;
    console.log(logFilePath);
    if (!fs.existsSync(logFilePath)) {
        return Responder.respondWithFailure(req, res, 'No such file exists');
    }
    let file = fs.readFileSync(logFilePath)
    res.set('Content-Type', 'text/html').send(file);
}