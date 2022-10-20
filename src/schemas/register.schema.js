import joi from 'joi';

const urlRegex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    pictureUrl: joi.string().pattern(urlRegex).required().messages({ 'string.pattern.base': 'picture url must be a valid url'})
});

export default registerSchema;