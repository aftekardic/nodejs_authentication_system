const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  constructor() {}
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "The name field should be regular text.",
            "string.empty": "The name field cannot be empty!",
            "string.min": "The name field must be at least 3 characters!",
            "string.max": "The name field can consist of up to 100 characters!",
            "string.required": "The name field is mandatory.",
          }),
          lastname: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "The last name field must be regular text.",
            "string.empty": "The last name field cannot be empty!",
            "string.min": "The last name field must be at least 3 characters!",
            "string.max":
              "The last name field can consist of up to 100 characters!",
            "string.required": "The last name field is mandatory.",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "The email field should be normal text.",
              "string.empty": "The email field cannot be empty!",
              "string.min": "The email field must be at least 3 characters!",
              "string.email": "Please enter a valid email!",
              "string.max":
                "The email field can consist of up to 100 characters!",
              "string.required": "The email field is mandatory.",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "The password field must be regular text.",
            "string.empty": "The password field cannot be empty!",
            "string.min": "The password field must be at least 6 characters!",
            "string.max":
              "The password field can consist of up to 36 characters!",
            "string.required": "The password field is mandatory.",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message) {
        throw new APIError(error.details[0].message, 400);
      } else {
        throw new APIError("Please follow the validation rules.", 400);
      }
    }
    next();
  };

  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "The email field should be normal text.",
              "string.empty": "The email field cannot be empty!",
              "string.min": "The email field must be at least 3 characters!",
              "string.email": "Please enter a valid email!",
              "string.max":
                "The email field can consist of up to 100 characters!",
              "string.required": "The email field is mandatory.",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "The password field must be regular text.",
            "string.empty": "The password field cannot be empty!",
            "string.min": "The password field must be at least 6 characters!",
            "string.max":
              "The password field can consist of up to 36 characters!",
            "string.required": "The password field is mandatory.",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message) {
        throw new APIError(error.details[0].message, 400);
      } else {
        throw new APIError("Please follow the validation rules.", 400);
      }
    }
    next();
  };
}

module.exports = authValidation;
