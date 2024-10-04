import app from './server.js';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import GamesDAO from './dao/gamesDAO.js';


async function main(){
    dotenv.config();

    const client = new mongodb.MongoClient(process.env.FREEGAMES_DB_URI);
    
    const port = process.env.PORT || 8000;

    try{
        await client.connect();
        await GamesDAO.injectDB(client);


        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}

main().catch(console.error);