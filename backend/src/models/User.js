import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {type: String},
  username: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  googleID: {
    type: String
  },
  appleID: {
    type: String
  },
  MFAsecret: {
    type: String
  },
  MFAenabled: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: true,
  verificationToken: String
},{
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword){
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);