'use client';

import {
  IonApp,
  IonNav,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { Style, StatusBar } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Tabs from 'components/pages/home/tabs';
import Register from 'components/pages/register/register';
import CreateStep from 'components/pages/register/create-step';
import Login from 'components/pages/register/login';
import Dashboard from 'components/pages/register/dashboard';
import { EndPoints } from './config';

setupIonicReact({});

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', async status => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch (error) {
      console.log(error)
    }
  });

const AppShell = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route
          path={EndPoints.register}
          render={() => <IonNav root={() => <Register />} />}
          exact
        />
        <Route
          path={EndPoints.login}
          render={() => <IonNav root={() => <Login />} />}
          exact
        />
        <Route
          path={EndPoints.create.new}
          render={() => <IonNav root={() => <CreateStep />} />}
          exact
        />
        <Tabs />
        <Route path="/" render={() => <IonNav root={() => <Dashboard />} />} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default AppShell;
