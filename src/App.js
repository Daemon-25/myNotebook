import React, { useState } from 'react'
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
import User from './components/User';
import NoteState from './context/notes/NoteState';
import UserState from './context/users/UserState';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }

  return (
    <>
      <NoteState>
        <UserState>
          <Router>
            <Navbar />
            <div className='mx-2 my-2'>
              <Alert alert={alert} />
            </div>
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Home showAlert={showAlert} />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/getuser">
                  <User showAlert={showAlert}/>
                </Route>
                <Route exact path="/signup">
                  <SignUp showAlert={showAlert} />
                </Route>
                <Route exact path="/login">
                  <Login showAlert={showAlert} />
                </Route>
              </Switch>
            </div>
          </Router>
        </UserState>
      </NoteState>
    </>
  );
}

export default App;
