import React from 'react';

const ListItem1 = (props) => (
        <> 
            <div className='gs-row gs-list-item-1'>
                    <div className='gs-col-2 gs-col-list-item-1'>
                        {props.item1}
                    </div>
                    <div className='gs-col-6 gs-col-list-item-1'>
                        {props.item2}
                    </div>
                    <div className='gs-col-3 gs-col-list-item-1'>
                        {props.item3}
                    </div>
                    <div className='gs-col-1 gs-col-list-item-1'>
                        {props.item4}
                    </div>
            </div>
        </>
)

export { ListItem1 };
