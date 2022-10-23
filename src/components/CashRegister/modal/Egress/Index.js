import React from 'react';
import { Form1 } from '../../../abstracts/Form';
import { Table2 } from '../../../abstracts/Table';
import { Button4 } from '../../../abstracts/Button/Button';
import { EgressModule } from './EgressModule';


function Egress({mainStates, mainActions, closeModal, users, cr, accounting}) {

    function BackToInit(){
        mainActions.setEgressUser([]);
        mainActions.onEgressInit();
        closeModal();
    }

    function BackToInitEgress(){
        mainActions.setEgressUser([]);
        mainActions.onEgressInit();
    }

    function ItemsUsers({items}) {
        return (
        <>
            {items &&
            items.map((user) => (
                <tr key={user.id}>
                   
                        <td className='gs-col-5'>{user.nifType}-{user.nif}</td>
                        <td className='gs-col-5'>{user.name}</td>
                        <td className='gs-col-2'>
                            <Button4
                                Title='Seleccionar'
                                color='#07b2e7'
                                Function={() => mainActions.userSelect(user)}
                            />
                        </td>
                </tr>
            ))}
        </>
        );
    }

    function headerUsers () {
        return(
            <>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                </tr>
            </>
        )
    }

    if(mainStates.isEgressInit){
        return(
            <>
                
                    <Form1
                        title='Egreso'
                        SubTitle='Buscar Cliente'

                        typeInputUp='number'
                        PlaceInputUp = 'Buscar por Rif o Cédula de identidad'
                        FunctionInputUp={mainActions.changeUserNif}
                        
                        typeInputDown='text'
                        PlaceInputDown = 'Buscar por Nombre'
                        FunctionInputDown={mainActions.changeUserName}
            
                        thirdInput={true}
                        typeInputThird='email'
                        PlaceInputThird='Buscar por Email'
                        FunctionInputThird={mainActions.changeUserEmail}

                        GsButton={true}
                        ButtonTitle='Regresar'
                        GsColor='#c12429'
                        ButtonFunction={BackToInit}
                    />
                
            </>
        )
    } else if(mainStates.isEgressSelectUser){
        return(
            <>
                    <Table2
                        Title='Egreso'
                        SubTitle='Seleccionar Proveedor'
                        PlaceholderSearch='Buscar por Nombre'
                        Items={mainStates.userSearch}
                        TitleButtonReturn='Regresar'
                        FunctionReturn={mainActions.onEgressInit}
                        FuctionSearch={mainActions.changeUserName}
                        ItemList = {ItemsUsers}
                        Header = {headerUsers}
                    />
            </>
        )
    } else if(mainStates.isEgress){
        return(
            <>
                <EgressModule 
                    mainStates={mainStates}
                    mainActions={mainActions} 
                    closeModal={BackToInitEgress} 
                    users={users} 
                    cr={cr}
                    accounting={accounting}
                />
            </>
        )
        
    }
};

export {Egress};
