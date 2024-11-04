/*
Name: Tsewang Dorjey Sherpa
Date: 2024-11-04
Course: IT 302 
Section: 451
Assignment: Phase 4 Read MongoDB Data using React.js Assignment
email: tds22@njit.edu
*/

import GamesDAO from "../dao/gamesDAO.js";

export default class GamesController {
  static async apiGetGames(req, res, next) {
    const gamesPerPage = req.query.gamesPerPage
      ? parseInt(req.query.gamesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let filters = {};

    if (req.query.title) {
      filters.title = req.query.title;
    } else if (req.query.platform) {
      filters.platform = req.query.platform;
    }

    const { gamesList, totalNumGames } = await GamesDAO.getGames({
      filters,
      page,
      gamesPerPage,
    });

    let response = {
      games: gamesList,
      page: page,
      filters: filters,
      entries_per_page: gamesPerPage,
      total_results: totalNumGames,
    };
    res.json(response);
  }

  static async apiGetGameById(req, res, next) {
    try {
      let id = req.params.id || {};
      const game = await GamesDAO.getGameById(id);

      if (!game) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      res.json(game);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
