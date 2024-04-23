
// ----------------------------------------------------------------------

import { useCallback, useEffect, useState } from "react";
import { getPreferences, removePreferences, setPreferences } from "./use-preferences";


const ContactKey = "contacts"


type TContact = {
    name?: string;
    address?: string;
}


export function useContacts() {

    const [state, setState] = useState<TContact[]>([]);

    const initState = async () => {
        const restored = await getPreferences(ContactKey);
        if (restored) {
            setState(restored);
        }
    }

    useEffect(() => {
        initState()
    }, []);


    const addContact =
        async (newContact: any) => {
            console.log({ state, newContact })
            await setPreferences(ContactKey, [...state, newContact])
            setState(prev => [...prev, newContact]);
        };

    const removeAllContact = async () => {
        await removePreferences(ContactKey);
    };

    const removeContact = async (removeName: string) => {
        const filterData = state.filter(data => data.name != removeName)
        await setPreferences(ContactKey, [...filterData])
        setState(filterData);
    };

    return {
        state,
        addContact,
        removeAllContact,
        removeContact
    };
}