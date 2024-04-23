import Image from 'next/image';
import { IonContent, IonNavLink, IonRippleEffect } from '@ionic/react';

import LogoSvg from '../../../public/logo.svg';
import logoTitle from '../../../public/logo-title.svg';
import CreateWallet from './create-wallet';
import ExistWallet from './exist-wallet';

const Register = () => (
    <IonContent fullscreen class="ion-padding">
        <div className="w-full h-full flex flex-col justify-center items-center ion-padding bg-ani bg-bottom bg-no-repeat bg-contain">
          <div className="flex justify-center items-center mb-[50px]">
            <Image src={LogoSvg} alt="logo" priority width={90} />
            <Image
              src={logoTitle}
              alt="logotitle"
              priority
              width={190}
              className='ml-6'
            />
          </div>

          <IonNavLink
            routerDirection="forward"
            component={() => <CreateWallet />}
            className="w-full mb-4"
          >
            <div className="ion-activatable btn bg-[#f73636]">
              Create a new wallet
              <IonRippleEffect className="opacity-50" />
            </div>
          </IonNavLink>
          <IonNavLink
            routerDirection="forward"
            component={() => <ExistWallet />}
            className="w-full"
          >
            <div className="ion-activatable btn bg-[#444444]">
              Import an existing wallet
              <IonRippleEffect className="opacity-50" />
            </div>
          </IonNavLink>
        </div>
      </IonContent>
  );

export default Register;
