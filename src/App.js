import { createContext, useState } from "react";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./AuthProvider";

let userContext = createContext();

function App() {
  let [user, setUser] = useState(null);

  // react-router-dom 
  console.log(user);

  return (
    <>
      <Router>
        <AuthProvider>

          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Login handleUser={setUser} />
            </Route>
          </Switch>

        </AuthProvider>
      </Router>
    </>
  );
}

export { userContext };

export default App;