import React from "react";
import { Form2, Form3 } from "../../../abstracts/Form";
import { Modal } from "../../../Modal";
import { gsThousandsFormat } from "../../../abstracts/Helpers/helpers";
import { Table5 } from "../../../abstracts/Table";
import { Button4, Button3 } from "../../../abstracts/Button/Button";
import { Cash } from "./Modal/Cash";
import { Electronics } from "./Modal/Electronics";
import { Check } from "./Modal/Check";
import { PaymentMethod1 } from "./Modal/PaymentMethod1";
import { PaymentMethod2 } from "./Modal/PaymentMethod2";
import { Error } from "../../../abstracts/Error";
import { ElectronicsTurned } from "./Modal/ElectronicsTurned";
import { Title2 } from "../../../abstracts/Title/Title";
import { Input1 } from "../../../abstracts/Input";


const Payment = ({ mainStates, mainActions, accounting, users, egress }) => {
    const [isModal, setIsModal] = React.useState(false);
    const [section, setSection] = React.useState('');
    const isEgress = egress || false;


    function openModel(name){
        setIsModal(! isModal);
        setSection(name);
    }

    function closeModal(){
        setIsModal(! isModal);
        setSection('');
    }

    function header () {
        return(
            <>
                <tr>
                    <th>Metodo de pago</th>
                    <th>Monto</th>
                    <th>Acción</th>
                </tr>
            </>
        )
    }

    function ItemsPayments({items}) {
        let total = 0;
        return (
        <>
            {items &&
            items.map((payment, index) => {
                total += parseFloat(payment.total);

                return (
                <tr key={`payment-${index}`}>
                   
                        <td className='gs-col-3'>{payment.name}</td>
                        <td className='gs-col-3'>{`$ ${gsThousandsFormat(payment.total)}`}</td>
                        <td className='gs-col-1'>
                            <Button4
                                Title='X'
                                color='#c12429'
                                GsKey={`button-payment-${index}`}
                                Function={() => mainActions.removeItemSelectPayment(index)}
                            />
                        </td>

                </tr>
            )})}
            <tr><th>Total pago:</th><th>{`$ ${gsThousandsFormat(total)}`}</th><th></th></tr>
        </>
        );
    }

    function ItemsTurned({items}) {
        let total = 0;
        return (
        <>
            {items &&
            items.map((payment, index) => {
                total += payment.total;

                return (
                <tr key={`payment-${index}`}>
                   
                        <td className='gs-col-3'>{payment.name}</td>
                        <td className='gs-col-3'>{`$ ${gsThousandsFormat(payment.total)}`}</td>
                        <td className='gs-col-1'>
                            <Button4
                                Title='X'
                                color='#c12429'
                                GsKey={`button-payment-${index}`}
                                Function={() => mainActions.removeItemSelectTurned(index)}
                            />
                        </td>

                </tr>
            )})}
            <tr><th>Total vuelto:</th><th>{`$ ${gsThousandsFormat(total)}`}</th><th></th></tr>
        </>
        );
    }

    React.useEffect(() => {
        mainActions.headerPaymentInfo();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps 

    return(
        <>
            <Error 
                error={mainStates.error}
            />
            <div className="gs-row gs-row-header-payment-module">
                    <Form2 
                        items={mainStates.paymentInfo}
                    />
                    {parseFloat(mainStates.totalOrder).toFixed(2) > (parseFloat(mainStates.totalSelectPayments).toFixed(2) - parseFloat(mainStates.totalSelectTurned).toFixed(2)) &&
                        <Form3 
                            items={mainStates.paymentMethodInfo}
                            SubTitle='Agregar Pagos'
                            function={openModel}
                            countCredits={mainStates.selectCredits.length}
                        />
                    }

                    {(parseFloat(mainStates.totalOrder).toFixed(2) < (parseFloat(mainStates.totalSelectPayments).toFixed(2) - parseFloat(mainStates.totalSelectTurned)).toFixed(2)) && ! isEgress && 
                        <Form3 
                            items={mainStates.turnedMethodInfo}
                            SubTitle='Agregar Vuelto'
                            function={openModel}
                        />
                    }

                    {(parseFloat(mainStates.totalOrder).toFixed(2) < (parseFloat(mainStates.totalSelectPayments).toFixed(2) - parseFloat(mainStates.totalSelectTurned)).toFixed(2)) && isEgress && 
                        <h3 className="center">El total y los pagos deben ser iguales</h3>
                    }

                    {parseFloat(mainStates.totalOrder).toFixed(2) === (parseFloat(mainStates.totalSelectPayments) - parseFloat(mainStates.totalSelectTurned)).toFixed(2) &&
                        <div className='gs-col-6 gs-button-add'>
                            <span className="gs-subtitle-payment"><Title2 title='Procesar Pago'/></span>
                            {isEgress && 
                                <div className="gs-col-6 gs-details-egress">
                                    <Input1 
                                        GsType='text' 
                                        GsFunction={(event) => mainActions.setDescription(event.target.value)}
                                        GsPlaceholder='Ingresa una Descripción'
                                        autoComplete='off'
                                    />
                                </div>
                            }
                            <div className="gs-button-payment">
                                <Button3 
                                    Title='Pagar'
                                    color='#07b2e7'
                                    Function={mainActions.addPayment}
                                />
                            </div>
                        </div>
                    }
                {isModal ? 
                    parseFloat(mainStates.totalOrder).toFixed(2) > (parseFloat(mainStates.totalSelectPayments).toFixed(2) - parseFloat(mainStates.totalSelectTurned)).toFixed(2) &&
                    <Modal>
                        {section === 'Efectivo' && <Cash addSelect={mainActions.addSelectPayment} closeModal={closeModal} title='Efectivo'/>}
                        {section === 'Zelle' && <Electronics mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Zelle' paymentMethod='zelle' accounting={accounting}/>}
                        {section === 'Transferencia' && <Electronics mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Transferencia' paymentMethod='transferencia' accounting={accounting}/>}
                        {section === 'Punto de venta' && <Electronics mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Punto de venta' paymentMethod='puntoDeVenta' accounting={accounting}/>}
                        {section === 'Pago Movil' && <Electronics mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Pago Movil' paymentMethod='pagoMovil' accounting={accounting}/>}
                        {section === 'Cheque' && <Check mainActions={mainActions} closeModal={closeModal} />}
                        {section === 'Descuento' && <PaymentMethod1 addSelect={mainActions.addSelectPayment} closeModal={closeModal} method='Descuento' paymentMethod='discount'/>}
                        {section === 'Manual' && <PaymentMethod1 addSelect={mainActions.addSelectPayment} closeModal={closeModal} method='Manual' paymentMethod='manual'/>}
                        {section === 'Crédito' && <PaymentMethod2 mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Crédito' paymentMethod='credit' users={users}/>}
                        {section === 'Comisión' && <PaymentMethod1 addSelect={mainActions.addSelectPayment} closeModal={closeModal} method='Comisión' paymentMethod='commission'/>}
                    </Modal> :
                null
                }
                {isModal ? 
                    parseFloat(mainStates.totalOrder).toFixed(2) < (parseFloat(mainStates.totalSelectPayments).toFixed(2) - parseFloat(mainStates.totalSelectTurned)).toFixed(2) &&
                    <Modal>
                        {section === 'Efectivo' && <Cash addSelect={mainActions.addSelectTurned} closeModal={closeModal} title='Vuelto Efectivo'/>}
                        {section === 'Zelle' && <ElectronicsTurned mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Zelle' paymentMethod='zelle' accounting={accounting}/>}
                        {section === 'Transferencia' && <ElectronicsTurned mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Transferencia' paymentMethod='transferencia' accounting={accounting}/>}
                        {section === 'Pago Movil' && <ElectronicsTurned mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Pago Movil' paymentMethod='pagoMovil' accounting={accounting}/>}
                        {section === 'Sobrante' && <PaymentMethod1 addSelect={mainActions.addSelectTurned} closeModal={closeModal} method='Sobrante' paymentMethod='discount'/>}
                        {section === 'Vuelto por Pagar' && <PaymentMethod2 mainStates={mainStates} mainActions={mainActions} closeModal={closeModal} method='Vuelto por Pagar' paymentMethod='turnedLiabilities' users={users}/>}
                    </Modal> :
                null
                }
            </div>
            <div className="gs-container-payment"> 
                <div className="gs-row">
                    <div className="gs-col-6 gs-col-payment">
                        <Table5
                            Items={mainStates.selectPayments}
                            Header={header}
                            ItemList={ItemsPayments}
                            SubTitle='Pagos Seleccionados'
                        />
                    </div>
                    {! isEgress && 
                        <div className="gs-col-6 gs-col-payment">
                            <Table5
                                Items={mainStates.selectTurned}
                                Header={header}
                                ItemList={ItemsTurned}
                                SubTitle='Vueltos Seleccionados'
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    )

}

export { Payment };