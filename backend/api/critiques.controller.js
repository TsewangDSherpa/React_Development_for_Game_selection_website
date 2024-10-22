/*
Name: Tsewang Dorjey Sherpa
Date: 2024-10-20
Course: IT 302 
Section: 451
Assignment: Phase 3 C.U.D. MongoDB Data using Node.js Assignment
email: tds22@njit.edu
*/

import CritiquesDAO from "../dao/critiquesDAO.js";

export default class CritiquesController {
  static async apiPostCritique(req, res, next) {
    try {
      const freeGameID = req.body.freeGameID;
      const critiqueText = req.body.critiqueText;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();
      const CritiqueResponse = await CritiquesDAO.addCritique(
        freeGameID,
        critiqueText,
        userInfo,
        date
      );

      res.json(CritiqueResponse);
    } catch (e) {
      console.error(`apiPostCritique: ${e}`);
    }
  }

  //   static async apiUpdateCritique(req, res, next) {

  //   }

  //   static async apiDeleteCritique(req, res, next) {

  //   }
}
