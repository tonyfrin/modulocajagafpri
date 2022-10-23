import React from 'react';
import Select from 'react-select';
import { Title1, Title2 } from '../../Title/Title';
import { Button3 } from '../../Button/Button';
import { Input1 } from '../../Input';
import { useGafpriAddUser } from './useGafpriAddUser';
import { StatesCountries } from '../../constants/States';
import { Cities } from '../../constants/Cities';
import { Country } from '../../constants/Countries';
import { removeClass, addClass } from '../../Helpers/Validations';
import { Error } from '../../Error';


const FormAddUser = ({title, SubTitle, mainState, mainActions}) => {
    const {
        states,
        actions,
    } = useGafpriAddUser(mainActions);
    const [InputCity, setInputCity] = React.useState('');
    const [InputState, setInputState] = React.useState('');
    const [ContainerNif, setContainerNif] = React.useState('');
    const [InputCountry, setInputCountry] = React.useState('');


    React.useEffect(() => {
        setInputCountry(() => (
            <div className='gs-col-12 gs-col-input-form-1'>
                <Select className='gs-select-form-1' defaultValue={mainState.country} options={optionsCountry} onChange={(event) => actions.changeCountry({value: event.value, label: event.label})} />
            </div>
        ))
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        const newValueCity = [];
        if(mainState.country.value === 'VE' && mainState.stateCountry !== null){
            if(Array.isArray(Cities[0][mainState.country.value][0][mainState.stateCountry.value])){
                Cities[0][mainState.country.value][0][mainState.stateCountry.value].forEach(function(item) {
                    Object.keys(item).forEach(function(key) {
                        newValueCity.push({ value: item[key], label: item[key] })
                    });
                });
                setInputCity(() => (
                    <div className='gs-col-12 gs-col-input-form-1'>
                        <Select id='userCity' className='gs-select-form-1'  options={newValueCity} onChange={event => actions.changeCity(event.value)}/>
                    </div>
                ));
            }else{
                setInputCity(() => (
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                                GsType={'text'}
                                GsFunction={event => actions.changeCity(event.target.value)}
                                GsPlaceholder={'Ciudad'}
                                defaultValue={mainState.city}
                                GsId='userCity'
                            />
                        </div>
                ));
            }
        } else{
            setInputCity(() => (
                <div className='gs-col-11 gs-col-input-form-1'>
                    <Input1 
                        GsType={'text'}
                        GsFunction={event => actions.changeCity(event.target.value)}
                        GsPlaceholder={'Ciudad'}
                        defaultValue={mainState.city}
                        GsId='userCity'
                    />
                </div>
            ));
        }

        const newValueState = [];
        if(Array.isArray(StatesCountries[0][mainState.country.value])){
            if(StatesCountries[0][mainState.country.value].length > 0){
                StatesCountries[0][mainState.country.value].forEach(function(item) {
                    Object.keys(item).forEach(function(key) {
                        newValueState.push({ value: key, label: item[key] })
                    });
                });
                setInputState(() => (
                    <div className='gs-col-12 gs-col-input-form-1'>
                        <Select id='userState' className='gs-select-form-1' value={mainState.stateCountry} options={newValueState} onChange={(event) => actions.changeState({value: event.value, label: event.label})}/>
                    </div>
                ));
                
            }else{
                setInputState(() => (
                    <div className='gs-col-11 gs-col-input-form-1'>
                        <Input1 
                            GsType={'text'}
                            GsFunction={event => mainActions.setStateCountry({value: event.target.value, label: event.target.value})}
                            GsPlaceholder={'Estado'}
                            defaultValue={mainState.stateCountry.value}
                            GsId='userState'
                        />
                    </div>
                ));
                
            }
        } else{
            setInputState(() => (
                    <div className='gs-col-11 gs-col-input-form-1'>
                       <Input1 
                            GsType={'text'}
                            GsFunction={event => mainActions.setStateCountry({value: event.target.value, label: event.target.value})}
                            GsPlaceholder={'Estado'}
                            defaultValue={mainState.stateCountry.value}
                            GsId='userState'
                        />
                    </div>
            ));
        }

        if(mainState.country.value === 'VE'){
            setContainerNif(() => (
                <div className='gs-row'>
                    <div className='gs-col-2 gs-col-input-form-1'>
                        <Select 
                            id='userNifType' 
                            className='gs-select-form-1' 
                            defaultValue={mainState.nifType} 
                            options={optionsNifType} 
                            onChange={(event) => actions.changeNifType({value: event.value, label: event.label})}
                        />
                    </div>
                    <div className='gs-col-9 gs-col-input-form-1'>
                        <Input1 
                        GsType='text'
                        GsFunction={event => actions.changeNif(event.target.value)}
                        GsPlaceholder='Rif o CI numérico'
                        defaultValue={mainState.nif}
                        GsId='userNif'
                        />
                    </div>
                </div>
            ));
        } else{
            setContainerNif('');
        }

        actions.validationName(mainState.name);
        actions.validationLastName(mainState.lastName);
        actions.validationCompany(mainState.company);
        actions.validationAdress(mainState.address);
        actions.validationAdress2(mainState.address2);
        actions.validationPostCode(mainState.postCode);
        actions.validationEmail(mainState.email);
        actions.validationPhone(mainState.phone);
        validationRegisterButton();

    }, [mainState.country, mainState.stateCountry]); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if(InputCity !== ''){
            actions.validationCity(mainState.city);
        } 

        if(InputState !== ''){
            actions.validationState(mainState.stateCountry);
        }
        
        if(ContainerNif !== ''){
            actions.validationNifType(mainState.nifType);
            actions.validationNif(mainState.nif);
        }
    }, [InputState, InputCity, ContainerNif]); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        validationRegisterButton();
    }, [mainState.name, mainState.lastName, mainState.company, mainState.address, mainState.address2, mainState.nif, mainState.nifType, mainState.city, mainState.stateCountry, mainState.country, mainState.postCode, mainState.email, mainState.phone, InputCity, InputState, ContainerNif, states.validName, states.validLastName, states.validNif, states.validNifType, states.validCompany, states.validAddress, states.validAddress2, states.validCity, states.validState, states.validPostCode, states.validEmail, states.validPhone, ]); // eslint-disable-line react-hooks/exhaustive-deps

    const validationRegisterButton = () => {
        if(
            states.validLastName &&
            states.validNif &&
            states.validName &&
            states.validNifType &&
            states.validCompany &&
            states.validAddress &&
            states.validAddress2 &&
            states.validCity &&
            states.validState &&
            states.validPostCode &&
            states.validEmail &&
            states.validPhone
        ){
            removeClass('userRegister', 'gs-disabled');
            actions.setRegisterButtonActivated(true);
        } else{
            addClass('userRegister', 'gs-disabled');
            actions.setRegisterButtonActivated(false);
        }
    }

    const optionsCountry = [];
    Country.forEach(function(item) {
        Object.keys(item).forEach(function(key) {
            optionsCountry.push({ value: key, label: item[key] })
        });
    });

    const optionsNifType = [
        {value: 'J', label: 'J'},
        {value: 'V', label: 'V'},
        {value: 'G', label: 'G'},
    ];
    
        return(
            <>
                <div className='gs-container'>
                    <Error
                        error = {mainState.errorAddUsers}
                    />
                </div>
                <div className='gs-box-form-1'>
                        <Title1 title={title} />
                        <Title2 title={SubTitle}/>
                    <div className='gs-row'>
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                            GsType='text'
                            GsFunction={event => actions.changeName(event.target.value)}
                            GsPlaceholder='Nombre'
                            defaultValue={mainState.name}
                            GsId='userName'
                            />
                        </div>
                    </div>
                    <div className='gs-row'>
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                                GsType='text'
                                GsFunction={event => actions.changeLastName(event.target.value)}
                                GsPlaceholder='Apellido'
                                defaultValue={mainState.lastName}
                                GsId={'userLastName'}
                            />
                        </div>
                    </div>
                    <div className='gs-row'>
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                            GsType='text'
                            GsFunction={event => actions.changeCompany(event.target.value)}
                            GsPlaceholder='Empresa'
                            defaultValue={mainState.company}
                            GsId='userCompany'
                            />
                        </div>
                    </div>
                    {ContainerNif}
                    <div className='gs-row'>
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                            GsType='text'
                            GsFunction={event => actions.changeAddress(event.target.value)}
                            GsPlaceholder='Dirección'
                            defaultValue={mainState.address}
                            GsId='userAddress'
                            />
                        </div>
                    </div>
                    <div className='gs-row'>
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                            GsType='text'
                            GsFunction={event => actions.changeAddress2(event.target.value)}
                            GsPlaceholder='Dirección 2'
                            defaultValue={mainState.address2}
                            GsId='userAddress2'
                            />
                        </div>
                    </div>
                    <div className='gs-row'>
                        {InputCity}
                    </div>
                    <div className='gs-row'> 
                        {InputState}
                    </div>
                    <div className='gs-row'>
                        {InputCountry}
                    </div>
                    <div className='gs-row'>
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                            GsType='text'
                            GsFunction={(event) => actions.changePostCode(event.target.value)}
                            GsPlaceholder='Código Postal'
                            defaultValue={mainState.postCode}
                            GsId='userPostCode'
                            />
                        </div>
                    </div>
                    <div className='gs-row'>
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                            GsType='email'
                            GsFunction={(event) => actions.changeEmail(event.target.value)}
                            GsPlaceholder='Email'
                            defaultValue={mainState.email}
                            GsId='userEmail'
                            />
                        </div>
                    </div>
                    <div className='gs-row'>
                        <div className='gs-col-11 gs-col-input-form-1'>
                            <Input1 
                            GsType='phone'
                            GsFunction={(event) => actions.changePhone(event.target.value)}
                            GsPlaceholder='Teléfono'
                            defaultValue={mainState.phone}
                            GsId='userPhone'
                            />
                        </div>
                    </div>
                    <div className='gs-row gs-row-buttons-form-add-user'>
                        <Button3 key='button-1'
                        Title='Registrar'
                        color='#07b2e7'
                        Function={actions.addUser}
                        GsId='userRegister'
                        />
                        
                        <Button3 key='button-2'
                        Title='Regresar'
                        color='#c12429'
                        Function={mainActions.onInit}
                        />
                    </div>
                </div>
            </>
        ); 
}

export { FormAddUser };