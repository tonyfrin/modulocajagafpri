import React from 'react';
import { validationInput, validationSelect, removeClass, addClass } from '../../Helpers/Validations';




function useGafpriAddUser(mainActions) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const {
    validName,
    validLastName,
    validNif,
    validNifType,
    validCompany,
    validAddress,
    validAddress2,
    validCity,
    validState,
    validPostCode,
    validEmail,
    validPhone,
    registerButtonActivated,
  } = state;
  

/**
 * Set Actions
 *
 * 
 */

    const setValidationNif = (newData) => dispatch({
        type: actionTypes.validNif,
        payload: newData,
    });

    const setValidationNifType = (newData) => dispatch({
        type: actionTypes.validNifType,
        payload: newData,
    });

    const setValidationCity = (newData) => dispatch({
        type: actionTypes.validCity,
        payload: newData,
    });

    const setValidationState = (newData) => dispatch({
        type: actionTypes.validState,
        payload: newData,
    });

    const setValidationName = (newData) => dispatch({
        type: actionTypes.validName,
        payload: newData,
    });

    const setValidationLastName = (newData) => dispatch({
        type: actionTypes.validLastName,
        payload: newData,
    });

    const setValidationCompany = (newData) => dispatch({
        type: actionTypes.validCompany,
        payload: newData,
    });

    const setValidationAddress = (newData) => dispatch({
        type: actionTypes.validAddress,
        payload: newData,
    });

    const setValidationAddress2 = (newData) => dispatch({
        type: actionTypes.validAddress2,
        payload: newData,
    });

    const setValidationPostCode = (newData) => dispatch({
        type: actionTypes.validPostCode,
        payload: newData,
    });

    const setValidationEmail = (newData) => dispatch({
        type: actionTypes.validEmail,
        payload: newData,
    });

    const setValidationPhone = (newData) => dispatch({
        type: actionTypes.validPhone,
        payload: newData,
    });

    const setRegisterButtonActivated = (newData) => dispatch({
        type: actionTypes.registerButtonActivated,
        payload: newData,
    });


/**
 * Validation Actions
 *
 * 
 */  

    const changeName = (newData) => {
        mainActions.setName(newData);
        validationName(newData);
        validationRegisterButton();
    };

    const changeLastName = (newData) => {
        mainActions.setLastName(newData);
        validationLastName(newData);
        validationRegisterButton();
    }

    const changeCompany = (newData) => {
        mainActions.setCompany(newData);
        validationCompany(newData);
        validationRegisterButton();
    }

    const changeNifType = (newData) => {
        mainActions.setNifType(newData);
        validationNifType(newData);
        validationRegisterButton();
    }

    const changeNif = (newData) => {
        mainActions.setNif(newData);
        validationNif(newData);
        validationRegisterButton();
    }

    const changeAddress = (newData) => {
        mainActions.setAddress(newData);
        validationAdress(newData);
        validationRegisterButton();
    }

    const changeAddress2 = (newData) => {
        mainActions.setAddress2(newData);
        validationAdress2(newData);
        validationRegisterButton();
    }

    const changeCity = (newData) =>{
        mainActions.setCity(newData);
        validationCity(newData);
        validationRegisterButton();
    }
    
    const changeState = (newData) => {
        mainActions.setStateCountry(newData);
        mainActions.setCity('');
    };

    const changeCountry = (newData) => {
        changeState('');
        mainActions.setCountry(newData);
    }

    const changePostCode = (newData) => {
        mainActions.setPostCode(newData);
        validationPostCode(newData);
        validationRegisterButton();
    }

    const changeEmail = (newData) => {
        mainActions.setEmail(newData);
        validationEmail(newData);
        validationRegisterButton();
    }

    const changePhone = (newData) => {
        mainActions.setPhone(newData);
        validationPhone(newData);
        validationRegisterButton();
    }
   
/**
 * Validation Actions
 *
 * 
 */    
    const validationNifType = (nifType) => {
        let validNifType = validationSelect(nifType, 'userNifType', 'gs-input-alert');
        setValidationNifType(validNifType);
    }

    const validationNif = (nif) => {
        let validNif = validationInput(nif, /^[0-9]{6,10}$/, 'userNif', 'gs-input-alert', true);
        setValidationNif(validNif);
    }

    const validationCity = (city) => {
        let validCity = validationInput(city, /^[a-zA-Z]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\-.\s]+$/, 'userCity', 'gs-input-alert', true);
        setValidationCity(validCity);
    }

    const validationState = (stateCountry) => {
       let validState = validationSelect(stateCountry, 'userState', 'gs-input-alert');
       setValidationState(validState);

    }

    const validationName = (name) => {
        let validName = validationInput(name, /^[a-zA-Z]+[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_.\s]+$/, 'userName', 'gs-input-alert', true);
        setValidationName(validName);
    }

    const validationLastName = (lastName) => {
        let validLastName = validationInput(lastName, /^[a-zA-Z]+[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_.\s]+$/, 'userLastName', 'gs-input-alert');
        setValidationLastName(validLastName);
    }

    const validationCompany = (company) => {
        let validCompany = validationInput(company, /^[a-zA-Z]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\-.\s]+$/, 'userCompany', 'gs-input-alert');
        setValidationCompany(validCompany);
    }

    const validationAdress = (address) => {
        let validAddress = validationInput(address, /^[a-zA-Z0-9]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_#()\-.\s]+$/, 'userAddress', 'gs-input-alert');
        setValidationAddress(validAddress);
    }

    const validationAdress2 = (address2) => {
        let validAddress2 = validationInput(address2, /^[a-zA-Z0-9]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_#()\-.\s]+$/, 'userAddress2', 'gs-input-alert');
        setValidationAddress2(validAddress2);
    }

    const validationPostCode = (postCode) => {
        let validPostCode = validationInput(postCode, /^[a-zA-Z0-9]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_#()\-.\s]+$/, 'userPostCode', 'gs-input-alert');
        setValidationPostCode(validPostCode);
    }

    const validationEmail = (email) => {
        let validEmail = validationInput(email, /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/, 'userEmail', 'gs-input-alert');
        setValidationEmail(validEmail);
    }

    const validationPhone = (phone) => {
        let validPhone = validationInput(phone, /^[0-9]{10,20}/, 'userPhone', 'gs-input-alert');
        setValidationPhone(validPhone);
    }

    const validationRegisterButton = () => {
        if(
            validName &&
            validLastName &&
            validNif &&
            validNifType &&
            validCompany &&
            validAddress &&
            validAddress2 &&
            validCity &&
            validState &&
            validPostCode &&
            validEmail &&
            validPhone
        ){
            removeClass('userRegister', 'gs-disabled');
            setRegisterButtonActivated(true);
        } else{
            addClass('userRegister', 'gs-disabled');
            setRegisterButtonActivated(false);
        }
    }

    function addUser(){
        validationRegisterButton();
        if(registerButtonActivated){
            mainActions.addUser();
        }
    }

    



/**
 * Export Status and Actions
 *
 * 
 */

    const states = {
        validName,
        validLastName,
        validNif,
        validNifType,
        validCompany,
        validAddress,
        validAddress2,
        validCity,
        validState,
        validPostCode,
        validEmail,
        validPhone,
        registerButtonActivated,
    }

    const actions = {
        changeName,
        changeLastName,
        changeCompany,
        changeNifType,
        changeNif,
        changeAddress,
        changeAddress2,
        changeCity,
        changeState,
        changeCountry,
        changePostCode,
        changeEmail,
        changePhone,
        
        validationName,
        validationLastName,
        validationCompany,
        validationNifType,
        validationNif,
        validationAdress,
        validationAdress2,
        validationCity,
        validationState,
        validationPostCode,
        validationEmail,
        validationPhone,
        validationRegisterButton,
        setRegisterButtonActivated,

        addUser,
    }

    return {
        states,
        actions,
    };

}

const initialState = () => ({
    validName: false,
    validLastName: false,
    validNif: true,
    validNifType: true,
    validCompany: false,
    validAddress: false,
    validAddress2: false,
    validCity: false,
    validState: false,
    validPostCode: false,
    validEmail: false,
    validPhone: false,
    registerButtonActivated: false,
});

const actionTypes = {
    validNif: 'VALID_NIF',
    validNifType: 'VALID_NIF_TYPE',
    validCity: 'VALID_CITY',
    validName: 'VALID_NAME',
    validLastName: 'VALID_LAST_NAME',
    validCompany: 'VALID_COMPANY',
    validAddress: 'VALID_ADDRESS',
    validAddress2: 'VALID_ADDRESS_2',
    validPostCode: 'VALID_POST_CODE',
    validEmail: 'VALID_EMAIL',
    validPhone: 'VALID_PHONE',
    registerButtonActivated: 'REGISTER_BUTTON_ACTIVED',
    validState: 'VALID_STATE',
};

const reducerObject = (state, payload) => ({
    [actionTypes.validNif]: {
        ...state,
        validNif: payload,
    },
    [actionTypes.validNifType]: {
        ...state,
        validNifType: payload,
    },
    [actionTypes.validCity]: {
        ...state,
        validCity: payload,
    },
    [actionTypes.validName]: {
        ...state,
        validName: payload,
    },
    [actionTypes.validLastName]: {
        ...state,
        validLastName: payload,
    },
    [actionTypes.validCompany]: {
        ...state,
        validCompany: payload,
    },
    [actionTypes.validAddress]: {
        ...state,
        validAddress: payload,
    },
    [actionTypes.validAddress2]: {
        ...state,
        validAddress2: payload,
    },
    [actionTypes.validPostCode]: {
        ...state,
        validPostCode: payload,
    },
    [actionTypes.validEmail]: {
        ...state,
        validEmail: payload,
    },
    [actionTypes.validPhone]: {
        ...state,
        validPhone: payload,
    },
    [actionTypes.registerButtonActivated]: {
        ...state,
        registerButtonActivated: payload,
    },
    [actionTypes.validState]: {
        ...state,
        validState: payload,
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};

export { useGafpriAddUser };