import { Client } from "pg";

export const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB,
    port: Number(process.env.DB_PORT),
});

export const connectDatabase = async () => {
    try {
        await client.connect();
        console.log("Database succesfully connected.");
    } catch (error) {
        console.log(error);
    }
};

export const createTables = async () => {
    try {
        const resetQuery = `DROP TABLE movies;`;
        await client.query(resetQuery);

        const createTableQuery = `CREATE TABLE IF NOT EXISTS movies (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            category VARCHAR(20) NOT NULL,
            duration INTEGER NOT NULL,
            price INTEGER NOT NULL
        );`;
        await client.query(createTableQuery);
    } catch (error) {
        console.log(error);
    }
};
