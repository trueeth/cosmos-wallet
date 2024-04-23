import {
  IonCard,
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
import Image from 'next/image';
import logoTitle from '../../../public/logo-title.svg';

const ExistWallet = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton icon={chevronBackOutline} text="" />
        </IonButtons>
        <div className="flex justify-center">
          <p className="px-0 mr-2 text-[20px]" slot="start">
            Welcome Back to
          </p>
          <Image
            src={logoTitle}
            alt="logotitle"
            priority
            width={90}
            slot="end"
          />
        </div>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <div className="h-full flex flex-col justify-center items-center">
        <IonCard className="p-2 rounded-lg">
          <IonCardHeader>
            <IonCardTitle className="text-lg">
              Recovery Phrase or Private Key
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="flex flex-col ">
            <p>
              Use an existing 12 word recovery phrase or private
              key. You can also import wallets from other wallet providers.
            </p>


            <IonNavLink
              routerDirection="forward"
              className="w-full mt-4"
            >
              <div className="ion-activatable btn bg-[#f73636]">
                Use recovery phrase or private key
                <IonRippleEffect className="opacity-50" />
              </div>
            </IonNavLink>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  </>
);

export default ExistWallet;
