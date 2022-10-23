import React from 'react';
import { Button3 } from '../Button/Button';


const Step1 = (props) => (
        <>
            <div className='gs-row gs-row-step-1'>
                <div className='gs-col-6 gs-col-step-1-title'>
                    <span className='gs-globo'>{props.step}</span><span className='gs-globo-title'>{props.title}</span>
                </div>
                <div className='gs-col-6 gs-col-step-1-buttons'>
                    <Button3
                        Title={props.titleReturn}
                        color='#c12429'
                        Function={props.functionReturn}
                    />
                    {props.titleNext &&
                        <Button3
                            Title={props.titleNext}
                            color='#07b2e7'
                            Function={props.functionNext}
                            GsId={props.gsIdButtonNext}
                        />
                    }
                </div>
            </div> 
        </>
)
export { Step1 };