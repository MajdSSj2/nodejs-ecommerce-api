const mongoose = require("mongoose");

const DBconnection = () => {
  //connect to db
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`DB connected!: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`error: ${err}`);
      process.exit(1);
    });
};

module.exports = DBconnection;
