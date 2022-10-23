import React from 'react';
import { useGafpriTransactions } from '../useGafpriTransactions';
import { Form1 } from '../../Form';
import { Table2 } from '../../Table';
import { Button4 } from '../../Button/Button';
import { Error } from '../../Error';
import { ExpensesModule } from './ExpensesModule';



function Expenses({mainActions, mainStates, close, users, accounting, route, source, currentUser, onInit, expensesModule, expensesTransactions}) {
    const {
        states,
        actions,
    } = useGafpriTransactions({users, route, mainActions, source, currentUser, onInit, expensesTransactions});

    function BackToInit(){
        actions.setSelectUser([]);
        actions.onIsUser();
        close();
    }

    function BackToInitUser(){
        actions.setUserSearch([]);
        actions.setSelectUser([]);
        actions.onIsUser();
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
                                Function={() => actions.userSelect(user)}
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

    if(states.isUser){
        return(
            <>  
                    <div className='gs-container'>
                        <Error
                            error = {mainStates.error}
                        />
                    </div>
                    <Form1
                        title='Egreso'
                        SubTitle='Buscar Cliente'

                        typeInputUp='number'
                        PlaceInputUp = 'Buscar por Rif o Cédula de identidad'
                        FunctionInputUp={actions.changeUserNif}
                        
                        typeInputDown='text'
                        PlaceInputDown = 'Buscar por Nombre'
                        FunctionInputDown={actions.changeUserName}
            
                        thirdInput={true}
                        typeInputThird='email'
                        PlaceInputThird='Buscar por Email'
                        FunctionInputThird={actions.changeUserEmail}

                        GsButton={true}
                        ButtonTitle='Regresar'
                        GsColor='#c12429'
                        ButtonFunction={BackToInit}
                    />
                
            </>
        )
    } else if(states.isSelectUser){
        return(
            <>
                    <Table2
                        Title='Egreso'
                        SubTitle='Seleccionar Proveedor'
                        PlaceholderSearch='Buscar por Nombre'
                        Items={states.userSearch}
                        TitleButtonReturn='Regresar'
                        FunctionReturn={BackToInitUser}
                        FuctionSearch={actions.changeUserName}
                        ItemList = {ItemsUsers}
                        Header = {headerUsers}
                    />
            </>
        )
    } else if(states.isTransactions){
        return(
            <>
                <ExpensesModule 
                    mainStates={states}
                    mainActions={actions} 
                    accounting={accounting}
                    expensesModule={expensesModule}
                />
            </>
        )
        
    }
};

export {Expenses};
