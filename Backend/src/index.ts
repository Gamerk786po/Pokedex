import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import app from "./app.js";
dotenv.config(); // configuring dotenv

const port = Number(process.env.PORT) || 4000
// connecting with database
dbConnect()
  .then(() => { 
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is runing that http://localhost:${port}.`);
    });
  })
  .catch((error) => {
    console.log(`DB failed to connnect !!! ${error}`);
  });
