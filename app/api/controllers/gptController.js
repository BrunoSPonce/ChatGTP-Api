const gptService = require('../services/gptService')
const service = new gptService();

module.exports.chat = function (req, res) {
    service.chat(req, res)
}