import React, {useEffect, useState} from 'react';
import { Title1, Title2 } from '../Title/Title';
import { Input1 } from '../Input';
import { Button3, Button4 } from '../Button/Button';
import ReactPaginate from 'react-paginate';


const Table1 = (propos) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;


  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(propos.Items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(propos.Items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, propos.Items]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % propos.Items.length;
        setItemOffset(newOffset);
    };
    
    return (
    <>
        <div className='gs-box-table-1'>
            <Title1 title={propos.Title} />
            <Title2 title={propos.SubTitle}/>
            <table className='gs-table-1'>
                <thead className='gs-thead-table-1'>
                    <propos.Header />
                </thead>
                <tbody>
                    <propos.ItemList 
                        items={currentItems}
                    />
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
            {
                propos.isInput ?  <div className='gs-col-11 gs-col-search-table-1'>
                    <Input1 
                        GsType='text'
                        GsPlaceholder={propos.Placeholder}
                        GsFunction={propos.FuctionInput}
                        defaultValue={propos.defaultValue}
                    />
                </div> : ''
            }
            {
                propos.isButton ? <div className='gs-row gs-row-buttons-table-1'>
                    <Button3
                    Title={propos.TitleButton}
                    color={propos.color}
                    Function={propos.FunctionButton}
                    />
                </div> : ''
            }
        </div>
    </>
)}

const Table2 = (propos) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;


  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(propos.Items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(propos.Items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, propos.Items]);

 

    

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % propos.Items.length;
        setItemOffset(newOffset);
    };
    
    return (
    <>
        <div className='gs-box-table-2'>
            <Title1 title={propos.Title} />
            <Title2 title={propos.SubTitle}/>
            <div className='gs-col-11 gs-col-search-table-2'>
                <Input1 
                    GsPlaceholder={propos.PlaceholderSearch}
                    GsFunction={propos.FuctionSearch}
                />
            </div>
            <table className='gs-table-2'>
                <thead className='gs-thead-table-2'>
                    <propos.Header />
                </thead>
                <tbody>
                    <propos.ItemList 
                        items={currentItems}
                    />
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
            <div className='gs-row gs-row-buttons-table-2'>
                <Button3
                Title={propos.TitleButtonReturn}
                color='#c12429'
                Function={propos.FunctionReturn}
                />
            </div>
        </div>
    </>
)}

const Table3 = (propos) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;


  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(propos.Items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(propos.Items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, propos.Items]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % propos.Items.length;
        setItemOffset(newOffset);
    };
    
    return (
    <>
            <table className='gs-table-3'>
                <tbody>
                    <propos.ItemList 
                        items={currentItems}
                    />
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
            {
                propos.isInput ?  <div className='gs-col-11 gs-col-search-table-1'>
                    <Input1 
                        GsType='text'
                        GsPlaceholder={propos.Placeholder}
                        GsFunction={propos.FuctionInput}
                        defaultValue={propos.defaultValue}
                    />
                </div> : ''
            }
            {
                propos.isButton ? <div className='gs-row gs-row-buttons-table-1'>
                    <Button3
                    Title={propos.TitleButton}
                    color={propos.color}
                    Function={propos.FunctionButton}
                    />
                </div> : ''
            }
    </>
)}

const Table4 = (propos) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;


  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(propos.Items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(propos.Items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, propos.Items]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % propos.Items.length;
        setItemOffset(newOffset);
    };
    
    return (
    <>
        
            <table className='gs-table-1'>
                <thead className='gs-thead-table-1'>
                    <propos.Header />
                </thead>
                <tbody id={propos.ItemId}>
                    <propos.ItemList 
                        items={currentItems}
                    />
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
                disabledClassName="disabled2"
                activeClassName="page-item active"
                activeLinkClassName="gs-pagination-item"
            />
            <div className='gs-row gs-row-buttons-table-4'>
                    <span class='gs-container-button-table-4'><Button4
                        Title={propos.TitleButton1}
                        color={propos.color1}
                        Function={propos.FunctionButton1}
                        gsClass={propos.gsClassButton1}
                        gsId={propos.gsIdButton1}
                    /></span>
                    <span class='gs-container-button-table-4'><Button4
                        Title={propos.TitleButton2}
                        color={propos.color2}
                        Function={propos.FunctionButton2}
                    /></span>
            </div>
    </>
)}

const Table5 = (propos) => {
    
    return (
    <>
        <div className='gs-box-table-1'>
            <Title1 title={propos.Title} />
            <Title2 title={propos.SubTitle}/>
            <table className='gs-table-1'>
                <thead className='gs-thead-table-1'>
                    <propos.Header />
                </thead>
                <tbody>
                    <propos.ItemList 
                        items={propos.Items}
                    />
                </tbody>
            </table>
            {
                propos.isInput ?  <div className='gs-col-11 gs-col-search-table-1'>
                    <Input1 
                        GsType='text'
                        GsPlaceholder={propos.Placeholder}
                        GsFunction={propos.FuctionInput}
                        defaultValue={propos.defaultValue}
                    />
                </div> : ''
            }
            {
                propos.isButton ? <div className='gs-row gs-row-buttons-table-1'>
                    <Button3
                    Title={propos.TitleButton}
                    color={propos.color}
                    Function={propos.FunctionButton}
                    />
                </div> : ''
            }
        </div>
    </>
)}

const Table6 = (propos) => {
    const buttonSmall = propos.buttonSmall || false;
    const isButton2 = propos.isButton2 || false;
    return (
    <>
        <div className={`gs-box-table-6 ${propos.classBox}`}>
            <div className={`container-box-table-6 ${propos.classContainer}`}>
                <Title1 title={propos.Title} />
                <Title2 title={propos.SubTitle}/>
                <table className={`gs-table-6 ${propos.classTable}`}>
                    <thead className={`gs-thead-table-6 ${propos.classThead}`}>
                        <propos.Header />
                    </thead>
                    <tbody>
                        <propos.ItemList 
                            items={propos.Items}
                        />
                    </tbody>
                </table>
                {
                    propos.isInput ?  <div className='gs-col-11 gs-col-search-table-1'>
                        <Input1 
                            GsType='text'
                            GsPlaceholder={propos.Placeholder}
                            GsFunction={propos.FuctionInput}
                            defaultValue={propos.defaultValue}
                        />
                    </div> : ''
                }
                {
                    propos.isButton ? <div className={`gs-row gs-row-buttons-table-6 ${propos.classRowButton}`}>
                        {buttonSmall ? 
                            <Button4
                                Title={propos.TitleButton}
                                color={propos.color}
                                Function={propos.FunctionButton}
                                GsKey={propos.KeyButton}
                            /> :
                            <Button3
                            Title={propos.TitleButton}
                            color={propos.color}
                            Function={propos.FunctionButton}
                            GsId={propos.KeyButton}
                            />
                        }
                        {isButton2 ? 
                            buttonSmall ? 
                                <Button4
                                Title={propos.TitleButton2}
                                color={propos.color2}
                                Function={propos.FunctionButton2}
                                    GsKey={propos.KeyButton2}
                                /> :
                                <Button3
                                Title={propos.TitleButton2}
                                color={propos.color2}
                                Function={propos.FunctionButton2}
                                GsId={propos.KeyButton2}
                                /> : null
                            }
                    </div> : ''
                }
            </div>
        </div>
    </>
)}

export { Table1, Table2, Table3, Table4, Table5, Table6 };