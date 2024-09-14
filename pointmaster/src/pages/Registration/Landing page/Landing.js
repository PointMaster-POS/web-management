import React from 'react'
import Component1 from './Component1'
import Component2 from './Component2'
import Component3 from './Component3'
import Component4 from './Component4'
import Component5 from './Component5'
import Component6 from './Component6'
import Component7 from './Component7'
import './landing.css'
import HeaderReg from '../../../components/Registration /HeaderReg'
import FooterReg from '../../../components/Registration /FooterReg'

export default function Landing() {
  return (
    <React.Fragment>
        <section>
            <div className='header'><HeaderReg/></div>
            <div className='Layout '>
                <div className='content1 centered'>
                    <Component1 />
                </div>
                <div className='content2 leftAlign'>
                    <Component2 />
                </div>
                <div className='content3 centered'>
                    <Component3 />
                </div>
                <div className='content4 centered'>
                    <Component4 />
                </div>
                <div className='content5 centered'>
                    <Component5 />
                </div>
                <div className='content6 '>
                    <Component6 />
                </div>
                <div className='content7 centered'>
                    <Component7 />
                </div>
            </div>  
            <div className='footer'><FooterReg/></div>  
        </section>
    </React.Fragment>

  )
}
