/*
Name: Tsewang Dorjey Sherpa
Date: 2024-10-04
Course: IT 302 
Section: 451
Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
email: tds22@njit.edu
*/
import express from "express";
import GamesController from "./games.controller.js";

const router = express.Router();

router.route("/").get(GamesController.apiGetGames);






export default router;