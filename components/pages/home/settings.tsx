import {
  IonItem,
  IonPage,
  IonLabel,
  IonButton,
  IonContent,
  IonCheckbox,
  IonTextarea,
  IonAccordion,
  useIonRouter,
  IonAccordionGroup,
} from '@ionic/react';
import Image from 'next/image'
import { useState } from 'react';
import ThreeDotSvg from 'public/icons/home/three-dot.svg'
import FaqSvg from 'public/icons/home/faq.svg'
import LockSvg from 'public/icons/home/lock.svg'
import NetworkSvg from 'public/icons/home/network.svg'
import { vaultService } from 'components/store/key-ring';
import { Dialog } from '@capacitor/dialog';
import { EndPoints } from 'components/router/config';
import Header from './header';

const Settings = () => {
  const [network, setNetwork] = useState<string>('mainnet');
  const [lock, setLock] = useState<number>(0);

  const router = useIonRouter()
  const handleLogOut = async () => {
    try {
      await vaultService.lock()
      router.push(EndPoints.login)
    } catch (error) {
      console.log(error)
      Dialog.alert({
        title: "Error",
        message: "Log out is failed"
      })
    }
  }
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonAccordionGroup expand="inset">
          <IonAccordion value="first">
            <IonItem slot="header" className="text-[15px]">

              <Image
                src={NetworkSvg}
                alt="logotitle"
                priority
                width={24}
                style={{ filter: 'invert(92%) saturate(10000%) hue-rotate(203deg)' }}
              />
              <IonLabel>Network</IonLabel>
              <div className="flex justify-end capitalize opacity-50 mr-2">
                {network}
              </div>
            </IonItem>
            <div className="ion-padding" slot="content">
              <div className="flex p-2 cursor-pointer justify-between">
                <div className="title px-2">Mainnet</div>
                <input
                  className="transform scale-125"
                  type="radio"
                  name="radio"
                  value="mainnet"
                  defaultChecked={network === 'mainnet'}
                  onChange={e => {
                    setNetwork(e.target.value);
                  }}
                />
              </div>
              <div className="flex p-2 cursor-pointer justify-between">
                <div className="title px-2">Testnet</div>
                <input
                  className="transform scale-125"
                  type="radio"
                  name="radio"
                  value="testnet"
                  defaultChecked={network === 'testnet'}
                  onChange={e => setNetwork(e.target.value)}
                />
              </div>
            </div>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" className="text-[15px]">
              <Image
                src={LockSvg}
                alt="logotitle"
                priority
                width={24}
                style={{ filter: 'invert(92%) saturate(10000%) hue-rotate(203deg)' }}
              />
              <IonLabel>Auto-lock</IonLabel>
              <div className="flex justify-end capitalize opacity-50  mr-2">
                {lock === 0 ? 'Not set up' : `${lock} hour`}
              </div>
            </IonItem>
            <div className="ion-padding" slot="content">
              <IonCheckbox labelPlacement="end">
                Auto-lock after I am inactive for
              </IonCheckbox>
              <div>
                <IonTextarea maxlength={10} rows={1} />
              </div>
            </div>
          </IonAccordion>
          <IonAccordion value="third">
            <IonItem slot="header" className="text-[15px]">
              <Image
                src={FaqSvg}
                alt="logotitle"
                priority
                width={24}
                style={{ filter: 'invert(92%) saturate(10000%) hue-rotate(203deg)' }}
              />
              <IonLabel>FAQ</IonLabel>
            </IonItem>
            <div />
          </IonAccordion>
          <IonAccordion value="four">
            <IonItem slot="header" className="text-[15px]">
              <Image
                src={ThreeDotSvg}
                alt="logotitle"
                priority
                width={24}
                style={{ filter: 'invert(92%) saturate(10000%) hue-rotate(203deg)' }}
              />
              <IonLabel>More Options</IonLabel>
            </IonItem>

            <div className="ion-padding" slot="content">
              <IonButton className="w-full" onClick={handleLogOut}>
                Log out
              </IonButton>
            </div>

          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
