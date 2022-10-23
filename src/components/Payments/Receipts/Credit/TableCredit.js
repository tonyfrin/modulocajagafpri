import React from "react";
import { Button4 } from "../../../abstracts/Button/Button";
import { ListItem1 } from "../../../abstracts/List/List";
import { gsThousandsFormat } from "../../../abstracts/Helpers/helpers";
import { Table5, Table3 } from "../../../abstracts/Table";
import { ActiveCreditsPrint } from "./ActiveCreditsPrint";



const TableCredit = ({ mainState, mainActions, credits, liabilitie}) => {
    const isLiabilities = liabilitie || false;
    let newUserCredits;
    if(isLiabilities){
        newUserCredits = credits.getUsersLiabilitiesInfo();
    } else{
        newUserCredits = credits.getUsersCreditsInfo();
    }

    const usersCredits = newUserCredits;
    const [userPrint, setUserPrint] = React.useState(0);
    const [selectCreditsPrint, setSelectCreditsPrint] = React.useState('');
    const [ListCredit, setListCredit] = React.useState('');
   
    const CreditsList = ({items}) => {
        return (
        <>
            {items &&
            items.map((credit) => {
                
                return(
                <>
                    <ListItem1 
                        item1={credit.nif !== '' ? `${credit.nifType}-${credit.nif}` : `${credit.email}`}
                        item2={`${credit.name}`}
                        item3={`Saldo: $ ${gsThousandsFormat(credit.balance)}`}
                        item4={<Button4 color='#07b2e7' Title='Ver' Function={() => setUserPrint(credit.userId)}/>}
                    />
                    {`${userPrint}` === `${credit.userId}` ? 
                        <ActiveCreditsPrint 
                            userId={credit.userId}
                            selectCredits={selectCredits}
                            setUserPrint={setUserPrint}
                            mainActions={mainActions}
                            mainState={mainState}
                            liabilitie={liabilitie}
                        /> : 
                        null
                    }
                </>
            )})}
        </>
        );
    }

    function header () {
        return(
            <>
                <tr>
                    <th>Credito #</th>
                    <th>{isLiabilities ? 'Concepto' : 'Pedido(s) #'}</th>
                    <th>Pago</th>
                    <th>Acciones</th>
                </tr>
            </>
        )
    }

    function Items({items}) {
        return (
        <>
            {items &&
            items.map((credit, index) => {
                let newOrder;
                if(! isLiabilities){
                    newOrder = credits.getCreditInfo(credit.id, 'orderIds');
                }
                const orders = newOrder;
                
                return (
                <tr key={credit.id}>
                   
                        <td className='gs-col-3'>{credit.id}</td>
                        <td className='gs-col-4'>{isLiabilities ? credit.details :
                            orders.map((order)=>(
                                    ` ${order}`
                                ))
                            }
                        </td>
                        <td className='gs-col-3'>{gsThousandsFormat(credit.amount)}</td>
                        <td className='gs-col-1'>
                            <Button4
                                Title='X'
                                color='#c12429'
                                GsKey={`button-${credit.id}`}
                                Function={() => removeSelectCredits(index)}
                            />
                        </td>

                </tr>
            )})}
        </>
        );
    }

    function selectCredits (userId){
        const validation = mainActions.payButtonValidation(userId);
        if(validation){
            mainActions.changeSelectCredits(userId);
            setUserPrint(0);
        }
    }

    function removeSelectCredits(index){
        const newCredits = mainState.selectCredits.filter(function(item, arr) {
            return arr !== index
        });
        mainActions.setSelectCredits(newCredits);
    }

    React.useEffect(() => {
        if(mainState.selectCredits.length > 0){
            setSelectCreditsPrint(() => (
                <Table5 
                    Items={mainState.selectCredits}
                    Header={header}
                    ItemList={Items}
                    SubTitle='Créditos Seleccionados'
                /> 
            ));
        } else{
            setSelectCreditsPrint('');
        }
        mainActions.nextButtonPayment();
    }, [mainState.selectCredits.length]); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
            setListCredit(() => (
                <Table3 
                    Items={usersCredits}
                    ItemList={CreditsList}
                />
            ));
            mainActions.nextButtonPayment();
    }, [userPrint]); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            {selectCreditsPrint}
            {ListCredit}
        </>
    )

}

export { TableCredit };