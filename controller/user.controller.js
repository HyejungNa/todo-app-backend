const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

// 빈 객체에 함수(createUser)생성하기
userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // 유저 중복 먼저 체크
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("This email already registered.");
    }

    // 비밀번호 암호화
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    // console.log("hash", hash);

    // 암호화된 비밀전호 저장
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");

    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("Email address or password dose not match.");
  } catch (error) {
    console.error(error); // 오류 로그
    res.status(400).json({ status: "fail", message: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("can not find user");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
