/*
Name: Tsewang Dorjey Sherpa
Date: 2024-11-21
Course: IT 302
Section: 451
Assignment: Phase 5 C.U.D. Node.js Data using React.js Assignment
email: tds22@njit.edu
*/



import React, { useState } from 'react'
import FreeGameDataService from "../services/freegamesDataService"
import { Link, useParams, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddCritique = (props) => {
    let editing = false
    let initialCritiqueState = ""
    const location = useLocation();
    const [critique, setCritique] = useState(initialCritiqueState)
    const [submitted, setSubmitted] = useState(false)
    let { id } = useParams();

    const onChangecritiques = e => {
        const critique = e.target.value
        setCritique(critique);
    }


    if (location.state && location.state.currentCritique) {
        editing = true
        initialCritiqueState = location.state.currentCritique.critique
    }

    const savecritiques = () => {
        var data = {
            freeGameID: id,
            critiqueText: critique,
            user_id: props.user.id,
            name: props.user.name
        }


        if (editing) {
            data.critique_id = location.state.currentCritique._id
            FreeGameDataService.updateCritique(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e);
                })
        } else {
            FreeGameDataService.createCritique(data)
                .then(response => {
                    setSubmitted(true)
                }).catch(e => {console.log(e)}) 
        }
    }

    return (
        <div>
            {submitted ? (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px'}}>
                    <h5>Critique submitted successfully</h5>
                    <Link to={"/freegames/" + id}>
                        Back to Game
                    </Link>
                </div>
            ) : (
                <Form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px'}}>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit" : "Create"} Critique</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={critique}
                            onChange={onChangecritiques}
                        />
                    </Form.Group>


                    <Button variant="primary" onClick={savecritiques}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    )
}

export default AddCritique;


