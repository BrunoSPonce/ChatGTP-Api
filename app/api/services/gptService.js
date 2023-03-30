const openai = require('../utils/openaiUtils');
const _ = require('lodash')

class gptService {
    async chat(req, res) {
        try {
            if (!_.isNil(req.swagger.params.message.value)) {
                var prompt = req.swagger.params.message.value;

                var result = await openai.send(prompt);
                res.status(result[1]).send(result[0]);
            }

            if (_.isNil(req.swagger.params.message.value))
                res.status(400).send("Message can\'t be null")
        } catch (e) {
            console.log(e.message)
            res.status(e.response.status).send(e.response.statusText);
        }
    }
}

module.exports = gptService;