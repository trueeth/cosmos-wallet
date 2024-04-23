import {
  IonCard,
  IonTitle,
  IonHeader,
  IonButtons,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonCardTitle,
  IonBackButton,
  IonCardHeader,
  IonCardContent,
  IonRippleEffect,
} from '@ionic/react';

import { chevronBackOutline } from 'ionicons/icons';
import ExistWallet from './exist-wallet';
import CreateStep from './create-step';

const CreateMethod = () => (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBackOutline} text="" />
          </IonButtons>
          <IonTitle className="text-[20px]">Create New Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="h-full flex flex-col justify-center items-center bg-ani bg-bottom bg-no-repeat bg-contain">
          <IonCard className="p-2 rounded-lg">
            <IonCardHeader>
              <IonCardTitle className="text-lg">
                Use Recovery Phrase
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="flex flex-col">
              <p>Maximum control & high compatibility across all wallets</p>
              <IonNavLink
                routerDirection="forward"
                component={() => <CreateStep />}
                className="w-full my-4"
              >
                <div className="ion-activatable btn text-white bg-[#f73636]">
                  Create a new recovery phrase
                  <IonRippleEffect className="opacity-50" />
                </div>
              </IonNavLink>
              <IonNavLink
                routerDirection="forward"
                component={() => <ExistWallet />}
                className="w-full"
              >
                <div className="ion-activatable btn text-white border">
                  Import existing recovery phrase
                  <IonRippleEffect className="opacity-50" />
                </div>
              </IonNavLink>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </>
  );

export default CreateMethod;
