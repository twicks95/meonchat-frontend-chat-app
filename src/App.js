import "./App.css";
import "./fontawesome";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import Chat from "./pages/main/Chat/Chat";
import Home from "./pages/main/Home/Home";

import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const newSocket = io.connect("https://meonchat-app.herokuapp.com/", {
      path: "/socket.io",
    });
    newSocket.on("connect", () => {
      console.log("Connected to socket client!");
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <PublicRoute restricted={true} path="/" exact component={Home} />
            <PublicRoute
              restricted={true}
              path="/login"
              exact
              component={Login}
            />
            <PublicRoute
              restricted={true}
              path="/register"
              exact
              component={Register}
            />
            <PublicRoute
              restricted={true}
              path="/password/reset"
              exact
              component={ResetPassword}
            />
            <PrivateRoute socket={socket} path="/chat" exact component={Chat} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
