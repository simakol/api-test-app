const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User already exist!" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();

      // return res.json({ message: "User successfully registered" });
      return res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User is not found!" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Wrong password!" });
      }

      // const token = generateAccessToken(user._id, user.roles);
      // return res.json({ token });
      return res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }

  async getUserByUsername(req, res) {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(400).json({ message: "User is not found!" });
    }

    res.json(user);
  }

  async addToHistory(req, res) {
    const { value } = req.body;
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(400).json({ message: "User is not found!" });
    }

    const isValueNew = !user.reqHistory.includes(value);

    if (isValueNew) {
      user.reqHistory.push(value);
    }

    await user.save();
    res.json(user);
    return isValueNew ? value : "";
  }

  async clearHistory(req, res) {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(400).json({ message: "User is not found!" });
    }

    user.reqHistory.splice(0);

    await user.save();
    res.json(user);
  }
}

module.exports = new AuthController();
