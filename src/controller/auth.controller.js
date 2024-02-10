const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const user = require("../models/user.model");
const { createToken } = require("../middlewares/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await user.findOne({ email });

  if (!userInfo) {
    throw new APIError("The email or password is incorrect!", 401);
  }

  const comparePassword = await bcrypt.compare(password, userInfo.password);

  if (!comparePassword) {
    throw new APIError("The email or password is incorrect!", 401);
  }

  createToken(userInfo, res);
};

const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email }); // normali email: req.body.email ama aynı isimde olduklarından tek yazdık

  if (userCheck) {
    throw new APIError("Mail is already exist!", 401);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const userSave = new user(req.body);
  await userSave
    .save()
    .then((data) => {
      return new Response(data).created(res);
    })
    .catch(() => {
      return new APIError("The user could not be registered!", 400);
    });
};

const me = async (req, res) => {
  return new Response(req.user).success(res);
};
module.exports = {
  login,
  register,
  me,
};
