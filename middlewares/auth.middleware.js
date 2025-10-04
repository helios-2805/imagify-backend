import jwt from 'jsonwebtoken'

export const userAuth = async (req, res, next) => {
  // finding the userId token for usage in user.controller.js
  const { token } = req.headers

  if(!token) {
    return res
    .status(400)
    .json({
      success: false,
      message: 'Not authorized, Login again!'
    })
  }
  try {
      const tokenDecoded = jwt.verify(token, process.env.TOKEN_SECRET)

      if(tokenDecoded.id) {
        req.userId = tokenDecoded.id
      } else {
        res.
        status(401)
        .json({
          success: false,
          message: 'Not Authorized. Login again!'
        })
      }

      next()

    } catch (err) {
      console.log('An error occurred while verifying the userId', err)
      res
      .status(404)
      .json({
        success: false,
        message: err.message
      })
    }
}