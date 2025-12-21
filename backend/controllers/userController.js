import User from "../models/UserModel.js";

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res
      .status(200)
      .json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    const updatedUser = await user.save();
    return res
      .status(200)
      .json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

export { getUserProfile, updateUserProfile };
