import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/new" component={New} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
