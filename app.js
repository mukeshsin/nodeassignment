// import express
import express from "express";

//import cors
import cors from "cors";

// import database
import db from "./config/db.config.js";

//import router
import Router from "./routes/routes.js";
//await db.sync({alter:true});

<<<<<<< HEAD
// models
import "./models/index.js";
=======
// modals
import './models/index.js'

>>>>>>> 329eddee4ac9139229abf7efc16d3feab024981b
const app = express();
app.use(express.json());

app.use(cors());

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(Router);

// listen on port
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
