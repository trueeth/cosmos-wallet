import { IonCol, IonRow, IonGrid, IonInput, IonButton } from '@ionic/react';
import React, { useMemo, useEffect } from 'react';
import { useForm } from "react-hook-form";
import utxolib, { HDSigner } from '@bitgo/utxo-lib'
import { mnemonicToSeed } from 'bip39'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { keyRingStore } from 'components/store/key-ring';
import { Dialog } from '@capacitor/dialog';

interface IProps {
    handleNext: () => void;
    mnemonic: string[];
}

type TState = {
    verifyWord1: string;
    verifyWord2: string;
    password: string;
    name: string;
    confirmPassword: string;
}

const defaultValues: TState = {
    verifyWord1: "",
    verifyWord2: "",
    name: "",
    password: "",
    confirmPassword: ""
}

const SignUpSchema = Yup.object().shape({
    verifyWord1: Yup.string().required('Word is required'),
    verifyWord2: Yup.string().required('Word is required'),
    name: Yup.string().required('Name is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

function VerifyPhrase(props: IProps) {

    const { mnemonic, handleNext } = props
    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(SignUpSchema),
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

    const verifyingWords = useMemo(() => {
        const one = Math.floor(Math.random() * 12);
        const two = (() => {
            let r = Math.floor(Math.random() * 12);
            while (r === one) {
                r = Math.floor(Math.random() * 12);
            }
            return r;
        })()

        const result = [
            { index: one, word: mnemonic[one] },
            { index: two, word: mnemonic[two] },
        ].sort((word1, word2) => word1.index < word2.index ? -1 : 1)
        return result;
    }, [mnemonic])

    const handleNewMnemonicKey = handleSubmit(async (data) => {
        try {
            if (data.verifyWord1 !== verifyingWords[0].word) {
                setError("verifyWord1", { message: "Invalid word" })
                return;
            }
            if (data.verifyWord2 !== verifyingWords[1].word) {
                setError("verifyWord2", { message: "Invalid word" })
                return;
            }
            await createMnemonicKey()
            Dialog.alert({
                title: "Success",
                message: "Creating Mnemonic is success"
            })
            handleNext()
        } catch (error) {
            console.error(error)
            Dialog.alert({
                title: "Error",
                message: "Creating Mnemonic is Failed."
            })
            reset()
        }
    })


    const createMnemonicKey = async () => {
        // const vaultId = await keyRingStore.createMnemonicKeyRing(
        //     mnemonic.join(" "), {
        //     account: 0,
        //     change: 0,
        //     addressIndex: 0
        // }, "nft", "fortitude211"
        // )



        // const candidateAddresses: {
        //     chainId: string;
        //     bech32Addresses: {
        //         coinType: number;
        //         address: string;
        //     }[];
        // }[] = [];


        // const resAddress = await keyRingStore.computeNotFinalizedKeyAddresses(
        //     vaultId,
        // );

        // candidateAddresses.push({
        //     chainId: 'clore',
        //     bech32Addresses: resAddress.map((res) => ({
        //         coinType: res.coinType,
        //         address: res.bech32Address,
        //     })),
        // });

        const seed = await mnemonicToSeed(mnemonic.join(" "))
        console.log({ seed })

    }

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
        <div className="flex flex-col items-stretch h-full">
            <IonGrid className="p-0 m-0">
                <IonRow >
                    <IonCol className="px-0">
                        <IonInput
                            fill="outline"
                            label={`#${verifyingWords[0].index + 1}`}
                            labelPlacement="stacked"
                            value={getValues().verifyWord1}
                            onIonInput={(e: Event) => setValue('verifyWord1', (e.target as HTMLInputElement).value)}
                        />
                        {showError("verifyWord1")}
                    </IonCol>
                    <IonCol className='px-0 ml-4'>
                        <IonInput
                            fill="outline"
                            label={`#${verifyingWords[1].index + 1}`}
                            labelPlacement="stacked"
                            value={getValues().verifyWord2}
                            onIonInput={(e: Event) => setValue('verifyWord2', (e.target as HTMLInputElement).value)}
                        />
                        {showError("verifyWord2")}
                    </IonCol>
                </IonRow>
            </IonGrid>
            <div className='my-4'>
                <IonInput
                    fill="outline"
                    label="Wallet Name"
                    labelPlacement="floating"
                    placeholder="e.g. Trading, NFT Vault, Investment"
                    value={getValues().name}
                    onIonInput={(e: Event) => setValue('name', (e.target as HTMLInputElement).value)}
                />
                {showError("name")}
            </div>
            <div>
                <IonInput
                    fill="outline"
                    label="Create CLORE password"
                    labelPlacement="floating"
                    placeholder="***"
                    value={getValues().password}
                    onIonInput={(e: Event) => setValue('password', (e.target as HTMLInputElement).value)}
                    type='password'
                />
                {showError("password")}
            </div>
            <div className='my-4'>
                <IonInput
                    fill="outline"
                    label="Confirm CLORE password"
                    labelPlacement="floating"
                    type='password'
                    placeholder="***"
                    value={getValues().confirmPassword}
                    onIonInput={(e: Event) => setValue('confirmPassword', (e.target as HTMLInputElement).value)}
                />
                {showError("confirmPassword")}
            </div>
            <IonButton onClick={handleNewMnemonicKey} >Next</IonButton>
        </div>
    );
}

export default VerifyPhrase;
