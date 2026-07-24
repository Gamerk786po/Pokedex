import dotenv from "dotenv";
dotenv.config(); // configuring dotenv
import dbConnect from "./db/dbConnect.js";
import app from "./app.js"; 

const port = Number(process.env.PORT) ||4000
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
