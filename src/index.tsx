// Copyright (c) 2018-present Amal Express, Inc. All Rights Reserved.

import React, { Suspense } from "react";
import PropTypes from 'prop-types';
import { Router } from "react-router-dom";

import {
  BrowserHistory,
  HashHistory,
  State,
  To,
  Update,
  createBrowserHistory,
} from 'history';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "app/store";
import Root from "app/App";
import AuthProvider from "contexts/Firebase/AuthProvider"
import LogRocket from "logrocket";

if (process.env.NODE_ENV !== "development") {
  //eslint-disable-line no-process-env
}

if (process.env.NODE_ENV === "production") {
  LogRocket.init("amal-express/amx-webapp");
}

export function HistoryRouter({ children, history }: HistoryRouterProps) {
  let [state, dispatch] = React.useReducer(
      (_: Update, action: Update) => action,
      {
        action: history.action,
        location: history.location
      }
  );

  React.useLayoutEffect(() => history.listen(dispatch), [history]);

  return (
      <Router
          children={children}
          action={state.action}
          location={state.location}
          navigator={history}
      />
  );
}

export interface HistoryRouterProps {
  children?: React.ReactNode;
  history: BrowserHistory;
}

if (process.env.NODE_ENV === "development") {
  HistoryRouter.displayName = 'HistoryRouter';
  HistoryRouter.propTypes = {
    children: PropTypes.node,
    history: PropTypes.object
  };
}


let history =  createBrowserHistory({ window });

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={null}>
        <AuthProvider>
          <HistoryRouter history={history}>
            <Root history={history} />
          </HistoryRouter>
        </AuthProvider>
      </Suspense>
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render);
}
