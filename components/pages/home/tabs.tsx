import { Route, Redirect } from 'react-router-dom';
import {
  IonTabs,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRippleEffect,
  IonRouterOutlet,
} from '@ionic/react';
import { EndPoints } from 'components/router/config';
import Settings from './settings';
import Contacts from './contacts';
import Activity from './activity';
import Swap from './swap';


const Tabs = () => (
  <IonTabs className='tabs-bottom'>
    <IonRouterOutlet>
      <Redirect exact path={EndPoints.home.base} to={EndPoints.home.swap} />
      <Route exact path={EndPoints.home.swap} render={() => <Swap />} />
      <Route exact path={EndPoints.home.activity} render={() => <Activity />} />
      <Route exact path={EndPoints.home.setting} render={() => <Settings />} />
      <Route exact path={EndPoints.home.contact} render={() => <Contacts />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom" className="h-[60px]">
      <IonTabButton tab="tab1" href={EndPoints.home.swap}>
        <span
          className="text-white w-8 h-8 bg-[#ACACAC] hover:bg-[#f73636] home"
        />
        <IonLabel className="font-bold mt-1">Home</IonLabel>
        <IonRippleEffect className="opacity-50" />
      </IonTabButton>
      <IonTabButton tab="tab2" href={EndPoints.home.activity}>
        <span
          className="text-white w-8 h-8 bg-[#ACACAC] hover:bg-[#f73636] activity"
        />
        <IonLabel className="font-bold mt-1">Activity</IonLabel>
        <IonRippleEffect className="opacity-50" />
      </IonTabButton>
      <IonTabButton tab="tab3" href={EndPoints.home.contact}>
        <span
          className="text-white w-8 h-8 bg-[#ACACAC] hover:bg-[#f73636] contact"
        />
        <IonLabel className="font-bold mt-1">Contacts</IonLabel>
        <IonRippleEffect className="opacity-50" />
      </IonTabButton>
    </IonTabBar>
  </IonTabs >
);

export default Tabs;
