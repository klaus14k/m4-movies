import "dotenv/config";
import express from "express";
import { connectDatabase, createTables } from "./database";
import { createMovie,deleteMovie,getMovies,getOneMovie,updateMovie } from "./logic";
import { isIdValid, isNameValid } from "./middlewares";

const app = express();

app.use(express.json());

app.post("/movies", isNameValid, createMovie);
app.get("/movies", getMovies);
app.get("/movies/:id", isIdValid, getOneMovie);
app.delete("/movies/:id", isIdValid, deleteMovie);
app.patch("/movies/:id", isIdValid, isNameValid, updateMovie);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`API successfully started at port ${PORT}`);
    await connectDatabase();
    await createTables();
});
