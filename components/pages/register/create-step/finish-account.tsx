import { IonButton, useIonRouter } from '@ionic/react';
import React from 'react';
import Image from 'next/image';
import LogoSvg from 'public/logo.svg';
import { EndPoints } from 'components/router/config';

function FinishAccount() {

  const router = useIonRouter()
  const handleFinish = () => {
    router.push(EndPoints.home.base)
  };

  return (
    <div className="flex flex-col py-1">
      <div className='flex flex-col justify-center items-center'>
        <Image src={LogoSvg} alt="cosmos" sizes='190' className='my-12' />
        <h1>Welcome Clore Network</h1>
      </div>
      <IonButton onClick={handleFinish} id="submit" className='my-4'>
        Finish
      </IonButton>
    </div>
  );
}

export default FinishAccount;
