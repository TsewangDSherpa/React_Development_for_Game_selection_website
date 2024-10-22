/*
Name: Tsewang Dorjey Sherpa
Date: 2024-10-20
Course: IT 302 
Section: 451
Assignment: Phase 3 C.U.D. MongoDB Data using Node.js Assignment
email: tds22@njit.edu
*/
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let critiques;

export default class CritiquesDAO {
  static async injectDB(conn) {
    if (critiques) {
      return;
    }
    try {
      critiques = await conn
        .db(process.env.FREEGAMES_DB_name)
        .collection("freegames_critiques_tds22");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in critiquesDAO: ${e}`
      );
    }
  }

  static async addCritique(freeGameID, critiqueText, userInfo, date) {
    try {
      const critiqueDoc = {
        name: userInfo.name,
        user_id: userInfo._id,
        date: date,
        critiqueText: critiqueText,
        freegame_id: new ObjectId(freeGameID),
      };

      return await critiques.insertOne(critiqueDoc);
    } catch (e) {
      console.error(`Unable to post critique: ${e}`);
      return { error: e };
    }
  }
}
