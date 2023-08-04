import mongoose from 'mongoose'

export function dbconnect() {
  console.log("connecting to :", process.env.MONGO_URI);
  
  if ( !process.env.MONGO_URI ) {
    throw Error("No Mongo Uri in .env");
  }

  mongoose.connect(process.env.MONGO_URI)
  .then( () => {
    console.log("Db connection sucess!");
  })
  .catch( e => {
    console.log(e);
  });
  
};