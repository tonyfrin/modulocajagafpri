import React from 'react';

const Cash1 = (props) => {
    
    return (
    <>
        <table className='gs-col-10 gs-table-cash'>
            <thead>
                <th>Billetes</th><th>Cantidad</th><th>Sub-Total</th>
            </thead>
            <tbody id='table-cash'>
                <props.ItemList 
                    items={props.items}
                />
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <th>Total:</th>
                    <th id='table-cash-total'>$ 0.00</th>
                </tr>
            </tfoot>
        </table>
    </>
)}

export {Cash1}