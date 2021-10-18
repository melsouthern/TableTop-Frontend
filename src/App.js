import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ReviewsByCategory from "./components/ReviewsByCategory";
import IndividualReview from "./components/IndividualReview";
import IncorrectPath from "./components/IncorrectPath";

function App() {
  return (
    <section>
      <Header />
      <Switch>
        <Route exact path="/reviews">
          <Homepage />
        </Route>
        <Route exact path="/reviews/:category">
          <ReviewsByCategory />
        </Route>
        <Route exact path="/reviews/:category/:review_id">
          <IndividualReview />
        </Route>
        <IncorrectPath />
      </Switch>
    </section>
  );
}

export default App;
