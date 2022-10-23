import React from 'react';
import CashModule from './CashModule';
import { useGafpriCashRegister } from './useGafpriCashRegister';
import Loading from '../loading';
import { Error } from '../abstracts/Error';


export default function CashRegister({cr, users, currentUser, source, accounting}) {
  const {
    states,
    actions,
  } = useGafpriCashRegister({cr, users, currentUser, source});

  if(states.isInit){
    return (
      <div className='gs-container gs-container-cash-register'>
        <Error
              error = {states.error}
          />
        <CashModule 
          cr={cr}
          users={users}
          mainStates={states}
          mainActions={actions}
          accounting={accounting}
        />
      </div>
    )
  } else if(states.isFetching){
    return (
      <div className='gs-container gs-container-cash-register'>
        <Loading />
      </div>
    )
  }

  
}
