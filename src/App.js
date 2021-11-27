import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { About } from './components/About';
import { Alert } from './components/Alert';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { SignUp } from './components/SignUp';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className='mx-2 my-2'>
          <Alert message={"Hello World"}></Alert>
          </div>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
