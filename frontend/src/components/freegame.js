/*
Name: Tsewang Dorjey Sherpa
Date: 2024-11-04
Course: IT 302
Section: 451
Assignment: Phase 4 Read MongoDB Data using React.js Assignment
email: tds22@njit.edu
*/

import React, { useState, useEffect } from 'react';
import FreegamesDataService from '../services/freegamesDataService';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Game = (props) => {

    const [game, setGame] = useState({
        id: null,
        title: "",
        genre: "",
        critiques: []
    })
    let { id } = useParams();

    const getGame = id => {
        FreegamesDataService.get(id)
            .then(response => {
                setGame(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }
    useEffect(() => {
        getGame(id)
    }, [id])

    const deleteCritique = (critiqueId, index) => {
        FreegamesDataService.deleteCritique(critiqueId, props.user.id)
            .then(response => {
                setGame((prevState) => {
                    prevState.critiques.splice(index, 1)
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={game.thumbnail} fluid width={"600rem"} />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h3">{game.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {game.short_description}
                                </Card.Text>
                                <Card.Text>
                                    Genre: {game.genre}
                                </Card.Text>
                                <Card.Text>
                                    Release Date: {new Date(Date.parse(game.release_date)).toDateString()}
                                </Card.Text>
                                <Card.Text>
                                    Platform: {game.platform}
                                </Card.Text>
                                <Card.Text>
                                    Developer: {game.developer}
                                </Card.Text>
                                <Card.Link href={game.freetogame_profile_url} target="_blank">
                                    {game.freetogame_profile_url}
                                </Card.Link>
                                {props.user &&
                                    <Link to={"/freegames/" + id + "/critique"}>
                                        Add Critique
                                    </Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Critiques</h2><br></br>
                        {game.critiques.map((critique, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Body>
                                        <h5>{critique.name + " critiqued on " + new Date(Date.parse(critique.lastModified)).toDateString()}</h5>
                                        <p>{critique.critiqueText}</p>
                                        {props.user && props.user.id === critique.user_id &&
                                            <Row>
                                                <Col><Link
                                                    to={"/freegames/" + id + "/critique"}
                                                    state={{ currentCritique: critique }}
                                                >Edit</Link>
                                                </Col>
                                                <Col><Button variant="link" onClick={() => deleteCritique(critique._id, index)}>Delete</Button></Col>
                                            </Row>}
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Game;