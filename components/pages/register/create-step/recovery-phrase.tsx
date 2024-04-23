import { IonChip, IonIcon, IonButton, IonRippleEffect, useIonToast } from '@ionic/react';
import React from 'react';
import { Clipboard } from "@capacitor/clipboard";
import { warning, documentsOutline } from 'ionicons/icons';

interface IProps {
  mnemonic: string[];
  handleNext: () => void;
}
function RecoveryPhrase(props: IProps) {

  const { mnemonic, handleNext } = props

  const [present] = useIonToast();

  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'Copied to clipboard',
      duration: 1500,
      position: position,
    });
  };

  const writeToClipboard = async () => {
    await presentToast('top')
    await Clipboard.write({
      string: mnemonic.join(" ")
    });
  };


  return (
    <div className="w-full flex flex-col items-stretch">
      <div className='mt-4'>
        {Array.from({ length: 12 }).map((_, j) => (
          <IonChip key={j}>
            {j + 1}.&nbsp;{mnemonic[j]}
          </IonChip>
        ))}
      </div>

      <div className='flex justify-center items-center'>
        <div className=' flex justify-center items-center my-4 text-[#f73636]'>
          <span className='text-lg text-white font-bold'>Copy to clipboard</span>
          <div className="flex justify-center items-center border-[#f73636] text-base ml-2 ion-button hover:cursor-pointer hover:scale-110 transition active:scale-90"
            onClick={writeToClipboard} >
            <IonIcon
              icon={documentsOutline}
              className="mr-1 text-lg min-w-7"
            />
            <IonRippleEffect className="opacity-50" />
          </div>
        </div>
      </div>
      <div className="text-gray-100 flex flex-col gap-1">
        <span className="text-[#f73636] text-sm md:text-base font-bold flex items-start">
          <IonIcon
            icon={warning}
            className="mr-1 text-lg pt-[2px] min-w-7"
          />
          <span className="flex-shrink">
            DO NOT share your recovery phrase with ANYONE.
          </span>
        </span>
        <span className="ml-2 font-thin">
          Anyone with your recovery phrase can have full control over your
          assets. Please stay vigilant against phishing attacks at all times.
        </span>
      </div>
      <IonButton className='my-4' onClick={handleNext} >Next</IonButton>
    </div>
  );
}

export default RecoveryPhrase;
