const User = require('../models/userModel')

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).json({
      status:"succes",
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}
