import {
  IonCard,
  IonIcon,
  IonToast,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonCardTitle,
  useIonRouter,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { chevronBackOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Keyboard } from 'swiper/modules';
import SwiperRef from 'swiper';
import { Mnemonic } from 'packages/crypto';
import { EndPoints } from 'components/router/config';
import RecoveryPhrase from './recovery-phrase';
import VerifyPhrase from './verify-phrase';
import SelectChain from './finish-account';
import 'swiper/css';
import 'swiper/css/keyboard';

const HeadingDatas = [
  { title: 'New Recovery Phrase' },
  {
    title: 'Verify Recovery Phrase',
    description:
      'Fill out the words according to their numbers to verify that you have stored your phrase safely.',
  },
  {
    title: 'Account Created!',
    description:
      'You created successfully Clore Wallet Account.',
  }
]

const CreateStep = () => {
  const [swiper, setSwiper] = useState<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [heading, setHeading] = useState<{
    title?: string;
    description?: string;
  }>(HeadingDatas[0]);
  const router = useIonRouter()


  const handleBack = () => {
    if (activeIndex) {
      if (swiper) swiper.slideTo(activeIndex - 1);
    } else {
      router.push(EndPoints.register)
    }
  };

  const handleNext = () => {
    if (swiper) swiper.slideTo(activeIndex + 1);
  };

  const onSlideChange = (s: SwiperRef) => {
    setHeading(HeadingDatas[activeIndex]);
    setActiveIndex(s.activeIndex);
  };

  useEffect(() => {
    const rng = (array: any) => Promise.resolve(crypto.getRandomValues(array));
    Mnemonic.generateSeed(rng, 128).then((str: string) => {
      setMnemonic(str.split(' '));
    });
  }, []);


  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" onClick={handleBack}>
            <IonIcon slot='end' icon={chevronBackOutline} size='medium' />
          </IonButtons>
          <IonTitle className="IonTitlex-0 text-[20px]">
            {activeIndex === 1 ? "Verify Your Recovery Phrase" : "Create New Wallet"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard className="rounded-lg">
          <IonCardHeader>
            <div>
              <IonCardSubtitle className="text-center">
                Step {activeIndex + 1}/3
              </IonCardSubtitle>
              <IonCardTitle className="text-[20px] text-center">
                {heading.title}
              </IonCardTitle>
              <p className="mt-2 text-justify normal-case">
                &nbsp;&nbsp;
                {heading.description}
              </p>
            </div>
          </IonCardHeader>
          <IonCardContent >
            <Swiper
              modules={[Keyboard, Zoom]}
              keyboard
              zoom
              autoHeight
              noSwiping
              allowTouchMove={false}
              onSwiper={s => {
                setSwiper(s);
              }}
              onSlideChange={onSlideChange}
            >
              <SwiperSlide>
                <RecoveryPhrase
                  mnemonic={mnemonic}
                  handleNext={handleNext}
                />
              </SwiperSlide>
              <SwiperSlide>
                <VerifyPhrase
                  mnemonic={mnemonic}
                  handleNext={handleNext}
                />
              </SwiperSlide>
              <SwiperSlide>
                <SelectChain />
              </SwiperSlide>
            </Swiper>

            <IonToast
              trigger="submit"
              message="Account was created successfully!"
              duration={3000}
            />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  );
};

export default CreateStep

