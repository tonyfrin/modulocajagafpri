import React from 'react';
import { Title1, Title2 } from '../abstracts/Title/Title';
import { Table1 } from '../abstracts/Table';
import Select from 'react-select';
import { gsThousandsFormat } from '../abstracts/Helpers/helpers';
import dayjs from 'dayjs';
import { currencySymbol } from '../abstracts/constants/currencySymbol';

export default function Balances({accounting, bankTransactions}) {
    const [bank, setBank] = React.useState('');
    const [bankSelect, setBankSelect] = React.useState('');
    const [transactions, setTransactions] = React.useState();



    React.useEffect(() => {
        setBankSelect(() => (
            <div className="gs-row gs-row-pay-method-electronics">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Banco:</h4>
                </div>
                <div className="gs-col-6">
                    <Select 
                        options={bankValue}
                        onChange={(event) => setBank(event.value)}
                    />
                </div>
            </div>
        ));
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      React.useEffect(() => {
        if(bank !== ''){
            let newTransactions = []
            let total = 0;
            const items = bankTransactions.getTransfersBankByCode(bank);
            items.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
            items.map((trans) => {
                total = trans.mode === 'credit' ? total + trans.amount : total - trans.amount;
                return null;
            });
            
            items.map((trans) => {
                newTransactions.push({
                    id: trans.id,
                    dateCreated: trans.dateCreated,
                    description: trans.description,
                    amount: trans.amount,
                    total: total,
                    mode: trans.mode,
                });
                total = trans.mode === 'credit' ? total - trans.amount : total + trans.amount;
                return null;
            });
            setTransactions(newTransactions);
        }
        
      }, [bank]); // eslint-disable-line react-hooks/exhaustive-deps


    const bankValue = [];
        accounting.accounting.banks.map((bank) => {
        bankValue.push({
            label: bank.name,
            value: bank.code,
        });
        return null;
    })

    function header () {
        return(
            <>
                <tr>
                    <th>Fecha Registro</th>
                    <th>#</th>
                    <th>Descripción</th>
                    <th>Crédito</th>
                    <th>Débito</th>
                    <th>Saldo</th>
                </tr>
            </>
        )
    }

    function Items({items}) {
        const bankId = accounting.getBankIdByCode(bank);
        const currency = currencySymbol[accounting.getBankInfoById(bankId, 'currency')];

        return (
        <>
            {items &&
            items.map((item) => {
                return (
                    <tr key={item.id}>
                            <td className='gs-col-2'>{dayjs(item.dateCreated).format("DD - MM - YYYY")}</td>
                            <td className='gs-col-1'>{item.id}</td>
                            <td className='gs-col-3'>{item.description}</td>
                            {item.mode === 'credit' ?
                                <td className='gs-col-2'>{`${currency} ${gsThousandsFormat(item.amount)}`}</td> :
                                <td className='gs-col-2'>-</td>
                            }
                            {item.mode === 'debit' ?
                                <td className='gs-col-2'>{`${currency} ${gsThousandsFormat(item.amount)}`}</td> :
                                <td className='gs-col-2'>-</td>
                            }
                            <td className='gs-col-2'>{`${currency} ${gsThousandsFormat(item.total)}`}</td>
                    </tr>
            )})}
        </>
        );
    }

   


  return (
    <>
        <div className='gs-container gs-container-bank-balances'>
            <Title1 
                title='Modulo de Bancos'
            />
            <Title2 
                title='Estados de cuenta'
            />
            {bankSelect}
            {transactions && 
                <Table1 
                    Items={transactions}
                    Header={header}
                    ItemList={Items}
                />
            }
        </div>
        
    </>
  )
}
