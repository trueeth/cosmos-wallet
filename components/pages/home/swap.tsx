import {
  IonPage,
  IonCard,
  IonText,
  IonContent,
  IonRippleEffect,
  IonInput,
  useIonToast,
  IonIcon,
  IonButton,
  IonPopover,
  IonList,
  IonItem,
} from '@ionic/react';
import { Clipboard } from "@capacitor/clipboard";
import Header from './header';
import { documentsOutline } from 'ionicons/icons';

const Swap = () => {
  const value = 100;
  const [present] = useIonToast();

  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'Copied to clipboard',
      duration: 1500,
      position: position,
    });
  };

  const writeToClipboard = async (clipboard: string) => {
    await presentToast('top')
    await Clipboard.write({
      string: clipboard
    });
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding" fullscreen>
        <div className="flex flex-col items-center justify-center h-full backdrop-blur-sm swap-page">
          <IonCard className="flex w-full flex-col items-center p-4 rounded-xl h-4/6 justify-evenly">
            <div className="flex justify-center items-center w-2/3">
              <IonText>
                <IonInput placeholder='0' className='text-5xl text-center' >
                  <span slot='start'>$</span>
                </IonInput>
              </IonText>
            </div>
            <div className="flex w-full justify-between text-white">
              <div className="ion-activatable btn w-1/2">
                <IonButton id="popover-button" className='w-full' >
                  <span className='text-lg text-white'>
                    Actions
                  </span>
                </IonButton>
                <IonPopover trigger="popover-button" dismissOnSelect={true}>
                  <IonContent>
                    <IonList>
                      <IonItem button={true} detail={false}>
                        Sell
                      </IonItem>
                      <IonItem button={true} detail={false}>
                        Sign
                      </IonItem>
                      <IonItem button={true} detail={false}>
                        PoH
                      </IonItem>
                    </IonList>
                  </IonContent>
                </IonPopover>
              </div>
              <div className=' flex justify-center items-center my-4 text-[#f73636]'>
                <span className='text-lg text-white font-bold whitespace-nowrap ml-4'>Copy address</span>
                <div className="flex justify-center items-center border-[#f73636] text-base ml-2 ion-button hover:cursor-pointer hover:scale-110 transition active:scale-90"
                  onClick={() => writeToClipboard("address")} >
                  <IonIcon
                    icon={documentsOutline}
                    className="mr-1 text-lg min-w-7"
                  />
                  <IonRippleEffect className="opacity-50" />
                </div>
              </div>
            </div>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Swap;
