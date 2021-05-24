import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Chat from "./pages/main/Chat/Chat";
import Counter from "./pages/main/Counter/CounterFunctional";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute
            restricted={true}
            path="/login"
            exact
            component={Login}
          />
          <PrivateRoute path="/chat" exact component={Chat} />
          <PrivateRoute path="/counter" exact component={Counter} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
