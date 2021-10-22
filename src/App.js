import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import ReviewsByCategory from "./components/ReviewsByCategory";
import IndividualReview from "./components/IndividualReview";
import IncorrectPath from "./components/IncorrectPath";
import { useState } from "react";
import { UserContext } from "./contexts/User";

function App() {
  const [user, setUser] = useState(null);

  return (
    <section>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/reviews/:category">
            <ReviewsByCategory />
          </Route>
          <Route exact path="/reviews/:category/:review_id">
            <IndividualReview />
          </Route>
          <Route>
            <Login exact path="/login" />
          </Route>
          <IncorrectPath />
        </Switch>
      </UserContext.Provider>
    </section>
  );
}

export default App;
