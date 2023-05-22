import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Home from '../pages/Home';
import Pix from '../pages/Pix';
import Text from '../pages/Text';
import User from '../pages/User';
import Exclusion from '../pages/Exclusion';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} isClosed={false} />
      <MyRoute exact path="/pix" component={Pix} isClosed={false} />
      <MyRoute exact path="/text" component={Text} isClosed={false} />
      <MyRoute exact path="/user/" component={User} isClosed />
      <MyRoute exact path="/exclusion/" component={Exclusion} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
