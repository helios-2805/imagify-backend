import { User } from '../models/user.model.js'
import FormData from 'form-data'
import axios from 'axios'

export const generateImage = async (req, res) => {
  try {
    // userid for number of tokens remaining and prompt for the image
    const { userId } = req
    const { prompt } = req.body

    const user = await User.findById(userId)

    if(!user) {
      return res
      .status(400)
      .json({
        success: false,
        message: 'Missing user!'
      })
    }
    if(!prompt) {
      return res
      .status(400)
      .json({
        success: false,
        message: 'Missing prompt!'
      })
    }
    // check balance now i.e the credit balance
    if(user.creditBalance === 0 || User.creditBalance < 0) {
      return res
      .status(401)
      .json({
        success: false,
        message: 'No credits left!',
        creditBalance: user.creditBalance
      })
    }

    const formData = new FormData
    formData.append('prompt', prompt)

    // getting the image in the form of arraybuffer from the api thru axios
    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: 'arraybuffer'
    })
    // converting the arraybuffer to base64 image
    const base64Image = Buffer.from(data, 'binary').toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`

    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1
    })

    res
    .status(200)
    .json({
      success: true,
      message: 'Image Generated!',
      creditBalance: user.creditBalance - 1,
      resultImage
    })

  } catch (err) {
    console.log('An error occurred while generating an image', err)
    res.json({
      success: false,
      message: err.message
    })
  }
}