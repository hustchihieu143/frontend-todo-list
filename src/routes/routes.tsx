import Dashboard from "../pages/Dashboard";

import { routeConstants } from "../constants";

const routers = {
    dashboard: {
        exact: true,
        path: routeConstants.DASHBOARD,
        component: Dashboard,
    },
};
export default routers;
