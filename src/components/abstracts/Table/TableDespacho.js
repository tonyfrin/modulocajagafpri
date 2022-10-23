import React, {useEffect, useState} from 'react';
import { Title2 } from '../Title/Title';
import { Button4 } from '../Button/Button';
import ReactPaginate from 'react-paginate';

const TableDespacho = (props) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;


  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.Items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.Items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, props.Items]);

 

    function Items({items}) {
        return (
        <>
            {items &&
            items.map((order) => (
                <tr key={order.id}>
                   
                        <td className='gs-col-2'>{order.id}</td>
                        <td className='gs-col-8'>{order.userName}</td>
                        <td className='gs-col-2'>
                            <Button4
                                Title={props.TitleButton}
                                color={props.GsColor}
                                Function={() => props.FunctionSelect(order.id)}
                            />
                        </td>
                   
                </tr>
            ))}
        </>
        );
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % props.Items.length;
        setItemOffset(newOffset);
    };
    
    return (
    <>
        <div className='gs-col-6 gs-col-despacho'>
            <Title2 title={props.Title}/>
            <table className='gs-table-despacho'>
                <thead className='gs-thead-table-despacho'>
                    <tr>
                        <th>Pedido</th>
                        <th>Clientes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <Items items={currentItems}/>
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel="< "
                renderOnZeroPageCount={null}
                containerClassName="gs-pagination"
                pageClassName="gs-pagination-item"
                previousClassName="gs-pagination-next-prev"
                previousLinkClassName="page-item"
                nextClassName="gs-pagination-next-prev"
                nextLinkClassName="page-item"
                disabledClassName="disabled"
                activeClassName="page-item active"
                activeLinkClassName="gs-pagination-item"
            />
        </div>
    </>
)}

export {TableDespacho};