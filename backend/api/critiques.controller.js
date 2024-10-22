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

  static async apiUpdateCritique(req, res, next) {
    try {
      const critiqueId = req.body.critique_id;
      const critiqueText = req.body.critiqueText;
      const lastModified = new Date();
      const ReviewResponse = await CritiquesDAO.updateCritique(
        critiqueId,
        req.body.user_id,
        critiqueText,
        lastModified
      );

      var { error } = ReviewResponse;
      if (error) {
        res.status.json({ error });
      }
      if (ReviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update critique. User may not be original poster"
        );
      }
      res.json(ReviewResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteCritique(req, res, next) {
    try {
      const critiqueId = req.body.critique_id;
      const user_id = req.body.user_id;
      const ReviewResponse = await CritiquesDAO.deleteCritique(
        critiqueId,
        user_id
      );
      res.json(ReviewResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
