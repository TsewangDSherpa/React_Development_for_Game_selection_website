/*
Name: Tsewang Dorjey Sherpa
Date: 2024-11-21
Course: IT 302
Section: 451
Assignment: Phase 5 C.U.D. Node.js Data using React.js Assignment
email: tds22@njit.edu
*/

import axios from "axios";


class FreeGamesDataService {

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tds22/games?page=${page}`);
    }

    get(id) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tds22/games/id/${id}`);
    }

    find(query, by = "title", page = 0) {
        return axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/tds22/games?${by}=${query}&page=${page}`
        )
    }

    createCritique(data) {
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tds22/games/critique`, data);
    }

    updateCritique(data) {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tds22/games/critique`, data);
    }

    deleteCritique(id, userId) {
        return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tds22/games/critique`, {
            data: {
                critique_id: id, 
                user_id: userId
            }
        });
    }


    getGenres(){
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tds22/games/genres`);
    }

}

const freegamesDataService = new FreeGamesDataService();
export default freegamesDataService;