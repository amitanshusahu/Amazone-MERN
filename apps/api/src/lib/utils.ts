import userModel from "../models/UserModel";

export async function isSeller(username: string): Promise<boolean> {
  try{
    const user = await userModel.findOne({username});
    if (user?.type != 'seller') {
      return false;
    }
    return true;
  }
  catch (ex) {
    console.log(ex);
    return false;
  }
}