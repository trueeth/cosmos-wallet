import {
  IonHeader,
  IonToolbar,
  useIonRouter,
  IonRippleEffect,
} from '@ionic/react';
import Image from 'next/image';
import LogSvg from 'public/logo.svg';
import SettingSvg from 'public/icons/home/setting.svg';
import CloseSvg from 'public/icons/home/close.svg';

const Header = () => {
  const router = useIonRouter();

  const handleRouter = () => {
    if (router.routeInfo.pathname === '/settings') {
      router.goBack();
    } else {
      router.push('/settings');
    }
  };

  const handleLogo = async (e: any) => {
    router.push('/swap');
  };

  return (
    <IonHeader>
      <IonToolbar className="px-2">
        <div
          className="flex items-center justify-center px-3 cursor-pointer"
          slot="start"
          onClick={handleLogo}
        >
          <Image
            priority
            src={LogSvg}
            alt="logo"
            className="mr-2 w-[20px] h-[20px]"
          />
          <span className="text-[#e22733] text-2xl font-bold">CLORE.WALLET</span>
        </div>
        <div
          onClick={handleRouter}
          slot="end"
          className="flex justify-center items-center cursor-pointer w-10 h-10 ion-activatable relative text-[#ff5555]"
        >
          {router.routeInfo.pathname === '/settings' ? (
            <Image
              src={CloseSvg}
              alt="logotitle"
              priority
              width={24}
            />
          ) : (
            <Image
              src={SettingSvg}
              alt="logotitle"
              priority
              width={24}
            />
          )}
          <IonRippleEffect className="opacity-50" />
        </div>
      </IonToolbar>
    </IonHeader>
  );
};
export default Header;
