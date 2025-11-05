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

const passwordValidator = (val) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).{6,12}$/;
    return passwordRegex.test(val);
};

const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(12).refine(
        passwordValidator,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
});

const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(12).refine(
        passwordValidator,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
});

module.exports = {
    validate,
    signupSchema,
    signinSchema
};