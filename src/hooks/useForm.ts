import React from 'react';
import { SyntheticEvent, useEffect, useState } from 'react'


export const useForm = <T extends Type> ( initialForm: T, formValidator: Type = {} ) => {

    const [FormState, setFormState] = useState( initialForm );
    const [Validator, setValidator] = useState( formValidator );

    useEffect(() => {
      createValidators();
    }, [FormState]);

    const isFormValid = React.useMemo( () => {
        for( const value of Object.keys( Validator ) ) {
            if ( Validator[value] !== null ) return false;
        }
        return true
    }, [Validator] );

    const onInputChange = ({ target }: SyntheticEvent | {target: Object}) => {
        const { name, value } = target as HTMLInputElement | {name: '', value: ''};
        setFormState({
            ...FormState,
            [name]: value,
        });
    }

    const onReset = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues:Type = {};
        for( const campo of Object.keys( formValidator ) ) {
            const [ fn, msg  ] = formValidator[campo];
            formCheckedValues[`${campo}Valid`] = fn(FormState[campo]) ? null : msg;
        }
        setValidator( formCheckedValues );
    }

    return {
        ...FormState,
        FormState,
        setFormState,
        onInputChange,
        onReset,
        Validator,
        isFormValid
    }
}

interface Type {
    [ key: string ]: [(val: string) => boolean, string] |  any
}