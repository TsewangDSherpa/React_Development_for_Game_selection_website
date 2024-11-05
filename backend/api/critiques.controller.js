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
      const lastModified = new Date();
      const CritiqueResponse = await CritiquesDAO.addCritique(
        freeGameID,
        critiqueText,
        userInfo,
        lastModified
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
      const CritiqueResponse = await CritiquesDAO.updateCritique(
        critiqueId,
        req.body.user_id,
        critiqueText,
        lastModified
      );

      var { error } = CritiqueResponse;
      if (error) {
        res.status.json({ error });
      }
      if (CritiqueResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update critique. User may not be original poster"
        );
      }
      res.json(CritiqueResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteCritique(req, res, next) {
    try {
      const critiqueId = req.body.critique_id;
      const user_id = req.body.user_id;
      const CritiqueResponse = await CritiquesDAO.deleteCritique(
        critiqueId,
        user_id
      );
      res.json(CritiqueResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetCritiques(req, res, next) {
    const crititquesPerPage = req.query.crititquesPerPage
      ? parseInt(req.query.crititquesPerPage, 10)
      : 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    const allCritiques = await CritiquesDAO.getCritiques({
      crititquesPerPage,
      page,
    });

    let response = {
      critiques: allCritiques,
      page: page,
      entries_per_page: crititquesPerPage,
      total_results: allCritiques.length,
    };
    res.json(response);
  }
}
