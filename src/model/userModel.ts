import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    email: { type: String, unique: true },
    name: { type: String, unique: true, default: '' },
    password: { type: String, default: '' },
    role: { type: String, default: 'user' }
  },
  {
    timestamps: true
  }
)

const userModel = mongoose.model('users', userSchema)

export default userModel
