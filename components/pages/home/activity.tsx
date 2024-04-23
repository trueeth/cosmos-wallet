import { IonPage, IonContent, IonCard } from '@ionic/react';
import Header from './header';
import { useState } from 'react';
import { TActivity } from 'components/constant/types';

const Activity = () => {
  const [activites, setActivities] = useState<TActivity[]>([])
  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding" fullscreen>
        <div className="flex flex-col items-center justify-center h-full backdrop-blur-sm swap-page">
          <IonCard className="flex w-full flex-col items-center p-4 rounded-xl justify-evenly min-h-[90%]">
            {activites.length === 0 && (
              <div>
                You don't have any activites
              </div>
            )}
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default Activity;
