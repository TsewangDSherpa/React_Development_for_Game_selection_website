/*
Name: Tsewang Dorjey Sherpa
Date: 2024-11-04
Course: IT 302
Section: 451
Assignment: Phase 4 Read MongoDB Data using React.js Assignment
email: tds22@njit.edu
*/

import React, { useState, useEffect } from 'react'
import FreeGamesDataService from "../services/freegamesDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const FreeGamesList = () => {
  const [freegames, setFreeGames] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [genres, setGenres] = useState(["All Genres"]);
  const [currentPage, setCurrentPage] = useState(0)
  const [entriesPerPage, setEntriesPerPage] = useState(0)
  const [currentSearchMode, setCurrentSearchMode] = useState("")

  useEffect(() => {
    retrieveFreeGames();
    retrieveGenres();
  }, []);

  useEffect( () => {
    setCurrentPage(0)
  }, [currentSearchMode])
  
  useEffect(() => {
    retrieveNextPage()
  }, [currentPage])

  const retrieveNextPage = () => {
    if(currentSearchMode === "findByTitle") {
      findByTitle()
    } else if(currentSearchMode === "findByGenre") {
      findbyGenre()
    } else {
      retrieveFreeGames()
    }
  }
  

  const retrieveFreeGames = () => {
    setCurrentSearchMode("")
    FreeGamesDataService.getAll(currentPage)
      .then((response) => {
        console.log(response.data);
        setFreeGames(response.data.games);
        setCurrentPage(response.data.page)
        setEntriesPerPage(
          response.data.entries_per_page)
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveGenres = () => {
    FreeGamesDataService.getGenres()
      .then((response) => {
        console.log(response.data);
    
        setGenres(["All Genres"].concat(response.data.genres));
      })
      .catch(e => {
        console.log(e);
      });
  };
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchGenre(searchRating);
  };

  const find = (query, by) => {
    FreeGamesDataService.find(query, by, currentPage)
      .then(response => {
        console.log(response.data)
        setFreeGames(response.data.games)
      })
      .catch(e => {
        console.log(e)
      })
  }
  const findByTitle =
    () => {
      setSearchGenre("")
      setCurrentSearchMode("findByTitle")
      find(searchTitle, "title")
    }
  const findbyGenre =
    () => {
      setSearchTitle("")
      setCurrentSearchMode("findByGenre")
      if (searchGenre === "All Genres") {
        retrieveFreeGames()
      } else {
        find(searchGenre, "genre")
      }
    }

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select" onChange={onChangeSearchRating}  >
                  {genres.map((genre, index) => {
                    return (
                      <option value={genre} key={index} selected = {searchGenre === genre}>{genre}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findbyGenre}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <hr></hr>
        <Row>
          {freegames.map((game, index) => {
            return (
              <Col key={index}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={game.thumbnail } />
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <Card.Text>
                      Rating: {game.genre}
                    </Card.Text>
                    <Card.Text>{game.short_description}</Card.Text>
                    <Link to={"/freegames/" + game._id} >Learn More</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
        <br />
        Showing Page: {currentPage}
        <Button
          variant="link"
          onClick={() => { setCurrentPage(currentPage + 1) }} >
          Get Next {entriesPerPage} Results
        </Button>
      </Container>
    </div>
  );
}

export default FreeGamesList;