import { Request, Response } from "express";
import { Imovies } from "./interfaces";
import { client } from "./database";
import format from "pg-format";

export const getOneMovie = async (req: Request, res: Response) => {
    return res.status(200).json(res.locals.movie);
};

export const getMovies = async (req: Request, res: Response) => {
    let query = format(
        `SELECT * FROM movies WHERE category = %L;`,
        req.query.category
    );
    let data = await client.query(query);

    if (data.rows.length === 0) {
        query = `SELECT * FROM movies;`;
        data = await client.query(query);
    }

    return res.status(200).json(data.rows);
};

export const createMovie = async (req: Request, res: Response) => {
    const newMovie: Omit<Imovies, "id"> = {
        name: req.body.name,
        category: req.body.category,
        duration: req.body.duration,
        price: req.body.price,
    };

    const query = format(
        `INSERT INTO movies (%I) VALUES (%L) RETURNING *;`,
        Object.keys(newMovie),
        Object.values(newMovie)
    );
    const data = await client.query(query);

    return res.status(201).json(data.rows[0]);
};

export const deleteMovie = async (req: Request, res: Response) => {
    const query = format(`DELETE FROM movies WHERE id = %L;`, req.params.id);

    await client.query(query);

    return res.status(204).json();
};

export const updateMovie = async (req: Request, res: Response) => {
    const query = format(
        `UPDATE movies SET (%I) = ROW (%L) WHERE id = (%L) RETURNING *;`,
        Object.keys(req.body),
        Object.values(req.body),
        req.params.id
    );

    const data = await client.query(query);

    return res.status(200).json(data.rows[0]);
};
