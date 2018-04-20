import React from 'react';
import {Switch, Route} from 'react-router'
import Dashboard from "../containers/dashboard/dashboard";
import Setup from "../containers/setup/setup";
import Asset from "../containers/asset/asset";


const RouterView = () => (
	<Switch>
		<Route path="/" exact component={Dashboard} />
		<Route path="/setup" component={Setup} />
		<Route path="/assets" component={Asset} />
	</Switch>
);

export default RouterView;