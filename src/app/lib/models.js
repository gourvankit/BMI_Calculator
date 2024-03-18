import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true,
    min: 2,
    max: 120,
  },
  weight: {
    type: Number,
    required: true,
    min: 30,
    max: 300,
  },
  age: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
});
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
