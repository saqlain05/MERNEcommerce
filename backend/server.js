const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//  Handling Uncaught Exeption Error

process.on("uncaughtException", (err)=>{
  console.log(`Error : ${err.message}`);
  console.log(`Shurting Down the server due to Uncaught Exeption Error`)
  process.exit(1)
})

//config
dotenv.config({path:"backend/config/config.env"})

//connecting to database 
connectDatabase();


const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shurting Down the server due to UnHandled Promise Rejection`)

  server.close(()=>{
    process.exit(1)
  })
})