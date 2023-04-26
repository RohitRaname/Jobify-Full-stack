const mongoose= require('mongoose')

const connect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log('db succesfully connected'));
  } catch (err) {
    console.log('mongoose err', err);
    throw err;
  }
};

module.exports= connect;
        