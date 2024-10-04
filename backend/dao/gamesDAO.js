let games; 

export default class GamesDAO {
    static async injectDB(conn) {
        if (games) {
            return;
        }
        try {
            games = await conn.db(process.env.FREEGAMES_DB_name).collection("freegames_tds22");
        } catch (e) {
            console.error(`Unable to establish collection handles in gamesDAO: ${e}`);
        }
    }
    
    static async getGames({
        filters = null,
        page = 0,
        gamesPerPage = 20,
    } = {}) {
        let query;

        if (filters) {
            if ("title" in filters) {
                query = { title: { $regex: filters["title"], $options: "i" } };
            } else if ("platform" in filters) {
                query = { platform: { $eq: filters["platform"] } };
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

}