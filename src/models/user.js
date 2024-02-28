import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a Name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please Provide a Email"],
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a Password"],
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
