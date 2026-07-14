import dotenv from "dotenv";
import dbConnect from "./db/dbConnect";
import app from "./app";
dotenv.config(); // configuring dotenv

// connecting with database
dbConnect()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is runing that http://localhost:${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(`DB failed to connnect !!! ${error}`);
  });
