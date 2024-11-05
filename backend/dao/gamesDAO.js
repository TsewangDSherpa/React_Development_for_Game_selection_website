/*
Name: Tsewang Dorjey Sherpa
Date: 2024-11-04
Course: IT 302 
Section: 451
Assignment: Phase 4 Read MongoDB Data using React.js Assignment
email: tds22@njit.edu
*/

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let games;

export default class GamesDAO {
  static async injectDB(conn) {
    if (games) {
      return;
    }
    try {
      games = await conn
        .db(process.env.FREEGAMES_DB_name)
        .collection("freegames_tds22");
    } catch (e) {
      console.error(`Unable to establish collection handles in gamesDAO: ${e}`);
    }
  }

  static async getGames({ filters = null, page = 0, gamesPerPage = 20 } = {}) {
    let query;

    if (filters) {
      if ("title" in filters) {
        query = { title: { $regex: filters["title"], $options: "i" } };
      } else if ("platform" in filters) {
        query = { platform: { $eq: filters["platform"] } };
      } else if ("genre" in filters) {
        query = { genre: { $eq: filters["genre"] } };
      }
    }

    let cursor;
    try {
      cursor = await games
        .find(query)
        .limit(gamesPerPage)
        .skip(gamesPerPage * page);
      const gamesList = await cursor.toArray();
      const totalNumGames = await games.countDocuments(query);
      return { gamesList, totalNumGames };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      console.error(e);
      return { gamesList: [], totalNumGames: 0 };
    }
  }

  static async getGameById(Id) {
    try {
      return await games
        .aggregate([
          {
            $match: {
              _id: new ObjectId(Id),
            },
          },
          {
            $lookup: {
              from: "freegames_critiques_tds22",
              localField: "_id",
              foreignField: "freegame_id",
              as: "critiques",
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`something went wrong in getGameById: ${e}`);
      throw e;
    }
  }

  static async getGenres() {
    try {
      const genres = await games.distinct("genre");

      return genres;
    } catch (e) {
      console.error(`something went wrong in getGenres: ${e}`);
      return [];
    }
  }
}
