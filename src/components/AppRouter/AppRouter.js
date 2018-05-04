import React from 'react';
import { Route } from  'react-router-dom';
import Routes from './routes';
import Aux from '../../hoc/Aux';

const appRouter = () => {
  let routes = Routes.map(route => {
    return <Route path={route.path} component={route.component.default} exact={route.exact === true} key={route.name}/>
  });

  return (
    <Aux>{ routes }</Aux>
  )
}

export default appRouter;
