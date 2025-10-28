const User = require('../model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const username = 'dummy';
    if (!username || !email || !password)
      return res
        .status(404)
        .json({ message: 'data not found💖💖', success: 0 });

    const checkExsitUser = await User.findOne({ email: email });
    console.log(checkExsitUser, 'chelk urer');
    if (checkExsitUser) {
      return res
        .status(400)
        .json({ message: 'user already exist', success: 0 });
    }

    let savedUser = null;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userInstnace = new User({
        userName: username,
        email: email,
        password: hashedPassword,
      });

      savedUser = await userInstnace.save();

      const payload = {
        id: savedUser._id,
        email: savedUser.email,
      };

      const token = jwt.sign(payload, 'todoApp', { expiresIn: '2d' });

      res.setHeader('Authorization', `Bearer ${token}`);

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });

      const userData = {
        userName: savedUser.userName,
        email: savedUser.email,
      };

      return res.status(200).json({
        message: 'user register successful',
        success: 1,
        data: userData,
        token,
      });
    } catch (error) {
      console.log(error);
      if (savedUser) {
        await User.findByIdAndDelete(savedUser._id);
      }
      return res.status(400).json({
        message: 'error signup',
        success: 0,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'sign up api fail',
      success: 0,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log(password, email);
    if (!email || !password) {
      return res.status(400).json({
        message: 'data missing',
        success: 0,
      });
    }

    const findUser = await User.findOne({ email: email }).select('+password');

    if (!findUser) {
      return res.status(404).json({
        message: 'invalid user',
        success: 0,
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: 0,
        message: 'invalid credential',
      });
    }

    const payload = { id: findUser._id, email: findUser.email };
    const token = jwt.sign(payload, 'todoApp', { expiresIn: '2d' });

    res.setHeader('Authorization', `Bearer ${token}`);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // must be true on HTTPS
      sameSite: 'None', // exactly 'None' (case-sensitive)
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    const data = {
      userName: findUser.userName,
      email: findUser.email,
    };

    return res.status(200).json({
      message: 'login successful',
      success: 1,
      data,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'login failed due to server error',
      success: 0,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    res.removeHeader('Authorization');

    return res.status(200).json({
      message: 'user logout successful',
      success: 1,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'logout failed due to server error',
      success: 0,
    });
  }
};
