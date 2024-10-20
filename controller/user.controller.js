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
      throw new Error("이미 가입이 된 유저입니다");
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
    res.status(400).json({ status: "fail", error });
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
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

module.exports = userController;
