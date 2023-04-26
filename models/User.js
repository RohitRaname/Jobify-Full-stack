

const mongoose= require('mongoose')
const validator= require('validator')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: 3,
    maxLength: 20,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Provide a valid email",
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
    select:false
  },

  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "lastName",
  },

  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "my City",
  },

  __v: {
    type: Number,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});


UserSchema.methods.createJWT= function(){
  return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})

}

UserSchema.methods.comparePassword=async function(givenPassword,dbPassword){
  return await bcrypt.compare(givenPassword,dbPassword)

}

const User = new mongoose.model("user", UserSchema);

module.exports = User;
