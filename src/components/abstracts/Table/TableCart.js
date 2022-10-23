import React from 'react';

const TableCart = ({ CartList }) => {

   
    
    return (
    <>
        <div className='gs-box-table-cart'>
            <table className='gs-table-cart'>
                <thead className='gs-thead-table-cart'>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Costo</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>{CartList}</tbody>
            </table>
        </div>
    </>
)}

export { TableCart };