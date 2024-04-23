import { IonPage, IonContent, IonCard, IonList, IonListHeader, IonLabel, IonButton, IonItem, IonIcon, IonRippleEffect, IonPopover, IonInput, IonAlert, IonModal } from '@ionic/react';
import Header from './header';
import { useEffect, useRef, useState } from 'react';
import { documentsOutline, ellipsisVerticalCircleOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import { Clipboard } from "@capacitor/clipboard";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getPreferences, setPreferences, usePreferences } from 'components/hooks/use-preferences';
import { Dialog } from '@capacitor/dialog';
import { useContacts } from 'components/hooks/use-contact';


type TContact = {
  name?: string;
  address?: string;
}

const defaultValues = {
  name: "",
  address: "",
}

const AddContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
});

const Contacts = () => {

  const [contacts, setContacts] = useState<TContact[]>([])
  const [selectContact, setSelectContact] = useState<TContact>({})
  const [showAddPop, setShowAddPop] = useState(false);
  const [popEvent, setPopEvent] = useState<MouseEvent>();

  const { state: contactData, removeContact, addContact } = useContacts()

  const writeToClipboard = async (clipboard: string) => {
    await Clipboard.write({
      string: clipboard
    });
  };


  const handleEditAccount = async () => {
    try {
      setSelectContact({})
      setShowAddPop(false)
    } catch (error) {
      console.log(error)
      setSelectContact({})
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await removeContact(selectContact.name!)
      setSelectContact({})
      setShowAddPop(false)
    } catch (error) {
      console.log(error)
      setSelectContact({})
    }
  }

  const presentPopover = (e: React.MouseEvent, selectAcount: TContact) => {
    setSelectContact({})
    setSelectContact(selectAcount)
    setPopEvent(e.nativeEvent);
    setShowAddPop(true)
  }

  useEffect(() => {
    setContacts(contactData)
  }, [contactData])
  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding" fullscreen>
        <div className="flex flex-col items-center justify-center h-full backdrop-blur-sm swap-page">
          <IonCard className="flex w-full flex-col items-center p-4 rounded-xl justify-evenly min-h-[90%]">
            <IonList className='w-[90%] h-[90%] flex flex-col justify-between'>
              <div className='max-h-[70%] overflow-y-scroll'>
                {contacts.length > 0 && contacts.map((contact, index) => (
                  <IonItem className='w-full' key={index}>
                    <div className='flex justify-between w-full'>
                      <div className='flex flex-col'>
                        <span className='text-lg'>{contact.name}</span>
                        <div className='flex font-thin'>
                          <span className='text-sm'>{contact.address}</span>
                          <div className="flex justify-center items-center border-[#f73636] text-base ml-2 ion-button hover:cursor-pointer hover:scale-110 transition active:scale-90"
                            onClick={() => writeToClipboard(contact.address!)} >
                            <IonIcon
                              icon={documentsOutline}
                              className="mr-1 text-lg min-w-7"
                            />
                            <IonRippleEffect className="opacity-50" />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center border-[#f73636] text-base ml-2 ion-button hover:cursor-pointer hover:scale-110 transition active:scale-90"
                        onClick={(e) => presentPopover(e, contact)} >
                        <IonIcon
                          icon={ellipsisVerticalOutline}
                          className="mr-1 text-lg min-w-7"
                        />
                        <IonRippleEffect className="opacity-50" />
                      </div>
                    </div>
                  </IonItem>
                ))}
              </div>
              <IonListHeader className='flex justify-center w-full'>
                <div className='flex justify-center w-full'>
                  <IonButton className='h-[2rem]' id="open-modal" expand="block">
                    <span className='text-xs'>Add Contact</span>
                  </IonButton>
                </div>
              </IonListHeader>
            </IonList>
          </IonCard>
        </div>
      </IonContent>
      <IonPopover
        isOpen={showAddPop}
        event={popEvent}
        onDidDismiss={() => setShowAddPop(false)}
      >
        <IonList>
          <IonItem button onClick={handleEditAccount}>
            <div>Edit</div>
          </IonItem>
          <IonItem button onClick={handleDeleteAccount}>
            <div>Delete</div>
          </IonItem>
        </IonList>
      </IonPopover>

      <AddContactModal contacts={contacts} addContact={addContact} />

    </IonPage>
  )
};



interface IModalProps {
  contacts: TContact[];
  addContact: (newContact: any) => Promise<void>;
}

const AddContactModal = (props: IModalProps) => {

  const [showModal, setShowModal] = useState(false);

  const modal = useRef<HTMLIonModalElement>(null);
  const { contacts: contactData, addContact } = props

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(AddContactSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
    clearErrors,
    setError,
    formState: { errors }
  } = methods;

  const handleNewAccount = handleSubmit(async (data) => {
    try {
      const duplicateContact = contactData.filter((contacts) => contacts.name === data.name)
      if (duplicateContact.length > 1) {
        setError("name", {
          message: "Duplicate name"
        })
        return;
      }
      addContact(data)
      setShowModal(false)
      reset()
    } catch (error) {
      console.error(error)
      Dialog.alert({
        title: "Error",
        message: "Creating contact is Failed."
      })
    }
  })

  const showError = (_fieldName: string) => {
    const error = (errors as any)[_fieldName];
    return error ? (
      <div className='text-red-700 font-bold text-xs'>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };

  useEffect(() => {
    reset()
    clearErrors()
  }, [clearErrors, reset])


  return (
    <IonModal ref={modal} isOpen={showModal} trigger="open-modal" initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75]}>
      <IonContent className="ion-padding">
        <div className='flex flex-col py-5 px-2'>
          <span className='text-xl w-full text-center mb-4'>
            New Contact
          </span>
          <div className='flex flex-col my-3'>
            <IonInput
              fill="outline"
              label='Name'
              labelPlacement="floating"
              value={getValues().name}
              onIonInput={(e: Event) => setValue('name', (e.target as HTMLInputElement).value)}
            />
            {showError("name")}
          </div>
          <div>
            <IonInput
              fill="outline"
              label="Address"
              labelPlacement="floating"
              placeholder="***"
              value={getValues().address}
              onIonInput={(e: Event) => setValue('address', (e.target as HTMLInputElement).value)}
            />
            {showError("address")}
          </div>
          <IonButton onClick={handleNewAccount} className='mt-5' >Add Contact</IonButton>

        </div>
      </IonContent>
    </IonModal>
  )
}

export default Contacts;