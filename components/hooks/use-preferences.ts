import { useState, useEffect, useCallback } from 'react';
import { Preferences } from '@capacitor/preferences';

// ----------------------------------------------------------------------

export function usePreferences(key: string, initialState: any) {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const restored = getPreferences(key);

        if (restored) {
            setState((prevValue: any) => ({
                ...prevValue,
                ...restored,
            }));
        }
    }, [key]);

    const updateState = useCallback(
        (updateValue: any) => {
            setState(async (prevValue: any) => {
                await setPreferences(key, {
                    ...prevValue,
                    ...updateValue,
                });

                return {
                    ...prevValue,
                    ...updateValue,
                };
            });
        },
        [key]
    );

    const update = useCallback(
        (name: string, updateValue: any) => {
            updateState({
                [name]: updateValue,
            });
        },
        [updateState]
    );

    const reset = useCallback(async () => {
        await removePreferences(key);
        setState(initialState);
    }, [initialState, key]);

    return {
        state,
        update,
        reset,
    };
}

// ----------------------------------------------------------------------

export const getPreferences = async (key: string) => {
    let value = null;

    try {
        const result = await Preferences.get({ key });
        if (result.value) {
            value = JSON.parse(result.value ?? "");
        }
    } catch (error) {
        console.error(error);
    }

    return value;
};

export const setPreferences = async (key: string, value: any) => {
    try {
        await Preferences.set({ key, value: JSON.stringify(value) });
    } catch (error) {
        console.error(error);
    }
};

export const removePreferences = async (key: string) => {
    try {
        await Preferences.remove({ key });
    } catch (error) {
        console.error(error);
    }
};
