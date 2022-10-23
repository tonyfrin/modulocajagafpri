import React from "react";
import { gsThousandsFormat, gsIsIncludes } from "../../../abstracts/Helpers/helpers";
import { Table4 } from "../../../abstracts/Table";


    
function ActiveCreditsPrint({userId, selectCredits, setUserPrint, mainActions, mainState, liabilitie}){
    const[creditsPrint, setCreditsPrint] = React.useState('')
    const activeCredits = mainActions.filterActiveCredits(userId);
    const isLiabilities = liabilitie || false;

    React.useEffect(() => {
            setCreditsPrint(() => (
                <Table4 
                    Items={activeCredits} 
                    ItemId={userId}
                    Header={header} 
                    ItemList={Items}
                    TitleButton1='Pagar'
                    color1='#439b57'
                    gsClassButton1='gs-disabled'
                    gsIdButton1='pay-button'
                    FunctionButton1={() => selectCredits(userId)}
                    TitleButton2='Cerrar'
                    color2='#c12429'
                    FunctionButton2={() => setUserPrint(0)}
                />
            ));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function inputAddPayCredits(creditId, userId){
        const input = document.getElementById(`gs-container-box-abono-${creditId}`);
        const checkbox = document.getElementById(`gs-checkbox-abono-${creditId}`);

        if(checkbox.checked){
            var element = document.createElement("input");
            element.classList.add('gs-box-abono');
            element.setAttribute("id", `gs-box-abono-${creditId}`);
            element.setAttribute("type", 'number');
            input.append(element);
            const check = document.getElementById(`gs-checkbox-${creditId}`);
            if(check.checked){
                check.checked = false;
            }
            const inputAbono = document.getElementById(`gs-box-abono-${creditId}`);
            inputAbono.addEventListener('keyup', () => {
                mainActions.payButtonValidation(userId);
            });
        } else{
            const box = document.getElementById(`gs-box-abono-${creditId}`);
            box.remove();
        }
        mainActions.payButtonValidation(userId);
    }

    function removeFirstCheck(creditId, userId){
        const check = document.getElementById(`gs-checkbox-abono-${creditId}`);
        if(check.checked){
            check.checked = false;
            const box = document.getElementById(`gs-box-abono-${creditId}`);
            box.remove();
        }
        mainActions.payButtonValidation(userId);
    }

    function Items({items}) {
        return (
            <>
                {items &&
                items.map((credit) => { 
                    if(! gsIsIncludes(mainState.selectCredits, credit.id, 'id')){
                        return (
                            <tr key={credit.id}>
                            
                                    <td className='gs-col-3'>{credit.id}</td>
                                    <td className='gs-col-3'>{isLiabilities ? credit.details :
                                        credit.orderIds.map((order)=>(
                                            ` ${order}`
                                        ))
                                    }</td>
                                    <td className='gs-col-2'>$ {gsThousandsFormat(credit.balance)}</td>
                                    <td className="gs-col-2"><input type='checkbox' id={`gs-checkbox-${credit.id}`} value={credit.balance} onChange={() => removeFirstCheck(credit.id, credit.userId)}/></td>
                                    <td className="gs-row gs-row-box-abono" id={`gs-container-box-abono-${credit.id}`}><input type='checkbox' id={`gs-checkbox-abono-${credit.id}`} onChange={() => inputAddPayCredits(credit.id, credit.userId)}/></td>
                            </tr> 
                        )
                    } else{
                        return null;
                    }
                })}
            </>
        );
    }

    function header () {
        return(
            <>
                <tr>
                    <th>Credito #</th>
                    <th>Pedido(s) #</th>
                    <th>Saldo</th>
                    <th>Pagar Todo</th>
                    <th>Abono</th>
                </tr>
            </>
        )
    }

    return( 
    <>
       {creditsPrint}
    </>
    )
}

    

export { ActiveCreditsPrint };