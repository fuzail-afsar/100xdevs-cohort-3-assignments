const z = require('zod')

const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        return res.status(400).json({
            error: JSON.parse(err)
        });
    }
};

module.exports = {
    z,
    validate
};