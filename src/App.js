import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Chat from "./pages/main/Chat/Chat";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} path="/login" exact component={Login} />
        <PrivateRoute path="/chat" exact component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
