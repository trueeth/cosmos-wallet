import Image from 'next/image';
import { IonContent, useIonRouter } from '@ionic/react';

import LoadingGif from 'public/loading.gif'
import { useLayoutEffect } from 'react';
import { vaultService, keyRingStoreInit, vaultServiceInit } from 'components/store/key-ring';
import { EndPoints } from 'components/router/config';

const Dashboard = () => {

  const router = useIonRouter()

  const initRouter = async () => {
    await vaultServiceInit()
    await keyRingStoreInit()

    const isSigned = vaultService.isSignedUp

    if (isSigned) {
      router.push(EndPoints.login)
    } else {
      router.push(EndPoints.register)
    }
  }

  useLayoutEffect(() => {
    setTimeout(() => initRouter(), 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <IonContent fullscreen>

      <div className='flex justify-center items-center w-full h-full bg-[#030303]'>
        <Image
          src={LoadingGif}
          alt="logotitle"
          priority
          width={400}
        />
      </div>

    </IonContent>
  );
};

export default Dashboard;
