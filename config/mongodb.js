import mongoose from 'mongoose'

const connectDB = async () => {

  mongoose.connection.on('connected', () => {
    console.log('Database connected!');
  })

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
  } catch (error) {
    console.log('MongoDb connection failed!', error)
    process.exit(1)
  }
}

export default connectDB