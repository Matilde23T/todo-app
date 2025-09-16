//entry point

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import todosRoutes from "./routes/todos.js";

const app = express();

app.use(cors());
app.use(express.json())


//routes

app.use("/api/login", authRoutes);
app.use("/api/todos", todosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server in http://localhost:${PORT}`))