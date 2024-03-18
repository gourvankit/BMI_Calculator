import { User } from "./models";
import { connectToDb } from "./utils";
export const getData = async () => {
  try {
    connectToDb();
    const data = await User.find();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
