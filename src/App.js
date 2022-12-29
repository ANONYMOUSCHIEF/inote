import './App.css';
import React from 'react'
import About from './components/About'
import Navbar from './components/Navbar'
import Home from './components/Home'
import NoteState from './components/contex/notes/Notestate';
import {BrowserRouter as Router,Route,Routes}  from 'react-router-dom';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Details from './components/Details';
function App() {
  return (
    <>
   
    <Router>
    <NoteState>
    <Navbar/>
    <Alert/>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/signup' element={<SignUp/>}></Route>
      <Route exact path='/Details' element={<Details/>}></Route>
      </Routes>
      </NoteState>
    </Router>
   
    </>
  );
}

export default App;
