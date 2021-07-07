import React, { useEffect } from "react";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { Route, Switch } from "react-router-dom";
import routers from "./routes/routes";

const browserHistory = createBrowserHistory();

const App: React.FC<any> = () => {
    return (
        <Router history={browserHistory}>
            <React.Suspense fallback={<div>....Loading</div>}>
                <Switch>
                    {Object.keys(routers).map((key) => {
                        //@ts-ignore
                        const route = routers[key];
                        return <Route key={route.path} {...route} />;
                    })}
                </Switch>
            </React.Suspense>
        </Router>
    );
};

export default App;
