const { z } = require('./index')

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

const createTodoSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().optional(),
    isCompleted: z.boolean().optional()
});

const updateTodoSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional()
}).refine((obj) => {
    // Iterate over the values of the object
    for (const val of Object.values(obj)) {
        // If any value is not undefined, then at least one field is present
        if (val !== undefined) {
            return true;
        }
    }
    // If no non-undefined values are found, the validation fails
    return false;
}, {
    message: "At least one field must be provided."
});

module.exports = {
    signupSchema,
    signinSchema,
    createTodoSchema,
    updateTodoSchema,
}