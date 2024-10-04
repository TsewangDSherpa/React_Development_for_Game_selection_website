/*
Name: Tsewang Dorjey Sherpa
Date: 2024-10-04
Course: IT 302 
Section: 451
Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
email: tds22@njit.edu
*/

import express from "express";
import cors from "cors";
import games from "./api/games.route.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/tds22/games", games);

app.use("*", (req, res) => {
    res.status(404).json({ error: "not found" });
});

export default app;