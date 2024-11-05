/*
Name: Tsewang Dorjey Sherpa
Date: 2024-11-04
Course: IT 302
Section: 451
Assignment: Phase 4 Read MongoDB Data using React.js Assignment
email: tds22@njit.edu
*/

import { Routes, Route, NavLink } from 'react-router-dom';
import { useState, useCallback  } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import AddCritique from './components/addCritique';
import FreeGamesList from './components/freegamesList';
import Login from './components/login';
import FreeGame from './components/freegame';

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const loginSetter = useCallback(user => {
    setUser(user);
  }, [setUser]);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  
  function handleLogout() {
    if (user) {
      logout();
    }
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ paddingLeft: '20px' }} > Game Critiques </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/freegames">Free Games</Nav.Link>
            <Nav.Link as={NavLink} onClick={handleLogout} to={user ? "/" : "/login"}>{user ? "Logout User" : "Login"}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      <Routes>
        <Route path="/" element={<FreeGamesList />}></Route>
        <Route path="/freegames" element={<FreeGamesList />}></Route>

        <Route path="/freegames/:id/" element={<FreeGame user={user} />}></Route>
        <Route
          path="/freegames/:id/critiques"
          element={<AddCritique user={user}  />}
        ></Route>

        <Route path="/login" element={<Login user={user} loginSetter={loginSetter} login={login} />}></Route>
      </Routes>

    </div>
  );
}





export default App;
