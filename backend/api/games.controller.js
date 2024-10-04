import GamesDAO from "../dao/gamesDAO.js";

export default class GamesController {
    static async apiGetGames(req, res, next) {
        const gamesPerPage = req.query.gamesPerPage ? parseInt(req.query.gamesPerPage, 10) : 20;
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
}
