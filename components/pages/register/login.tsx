import Image from 'next/image';
import { IonInput, IonButton, IonContent, useIonRouter } from '@ionic/react';
import LogoSvg from 'public/logo.svg';
import LogoTitle from 'public/logo-title.svg'
import { useState, useEffect } from 'react';
import { keyRingStore, vaultService } from 'components/store/key-ring';
import { EndPoints } from 'components/router/config';

const Login = () => {

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const router = useIonRouter()
  const handleLogin = async () => {
    try {
      await vaultService.unlock(password)
      router.push(EndPoints.home.base)
    } catch (errors) {
      console.log(errors)
      if (password !== "")
        setError("Password is incorect")
      else setError("Password is required")
    }
  }

  const initializeStore = async () => {
    await vaultService.init();
    await keyRingStore.init()
  }
  useEffect(() => {
    initializeStore()
  }, [])

  return (
    <IonContent fullscreen class="ion-padding">
      <div className="w-full h-full flex flex-col justify-center items-center ion-padding relative">
        <div className="flex justify-center items-center  mb-8">
          <Image src={LogoSvg} alt="logo" priority width={90} />
          <Image
            src={LogoTitle}
            alt="logotitle"
            priority
            width={190}
            className='ml-4'
          />
        </div>

        <div className='bg-ani absolute bg-contain bg-center top-[70%] -z-10 h-[14rem] w-full' />


        <h1 className='text-white mb-10'>Welcome Back</h1>
        <div className='my-4 w-full'>
          <IonInput
            fill="outline"
            label="Password"
            labelPlacement="floating"
            placeholder="***"
            type='password'
            value={password}
            onIonChange={(e: Event) => setPassword((e.target as HTMLInputElement).value)}
          />
          {error ? (
            <div className='text-red-700 font-bold text-xs'>
              {error || "Field Is Required"}
            </div>
          ) : null}
        </div>

        <IonButton className="w-full" onClick={handleLogin}>
          Unlock
        </IonButton>

      </div>
    </IonContent>
  );
};

export default Login;
