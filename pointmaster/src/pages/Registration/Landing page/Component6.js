import React from 'react'
import './component6.css'

export default function Component6() {
  return (
    <div className="component6" style={{ position: 'relative', paddingLeft: '275px', paddingRight: '100px', paddingTop: '175px'}}>
      <h1 style={{
        fontSize: '3rem',
        margin: '0',
        fontFamily:'sans-serif',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        Features
      </h1>
      <div className="points-grid">
        <div className="point1">
          {/*<span className="icon">&#127760;</span> {/* Black globe symbol */}
          <h2 className='point-topic'>
            E-commerce Integration
          </h2>
          <p className='point-description'>E-commerce integration refers to the 
            seamless connection between your online store and various 
            e-commerce platforms and tools. This integration plays a crucial
             role in enhancing your business's efficiency, customer experience, 
             and overall success in the digital marketplace.</p>
        </div>
        <div className="point2">
          <h2 className='point-topic'>
            Loyalty Programs
          </h2>
          <p className='point-description'>Loyalty programs are essential tools
             for businesses looking to cultivate lasting customer relationships
              and drive repeat sales. By implementing customizable loyalty programs, 
              you can effectively incentivize customer loyalty and enhance their overall 
              experience with your brand.</p>
        </div>
        <div className="point3">
          <h2 className='point-topic'>
            Security
          </h2>
          <p className='point-description'>Keep your transactions and customer
             data safe with advanced security measures.Prioritizing security measures
              not only protects transactions and customer data but also strengthens
               customer trust, enhances compliance with regulations, and mitigates
                business risks. </p>
        </div>
        <div className="point4">
          <h2 className='point-topic'>
            Inventory Management
          </h2>
          <p className='point-description'>Inventory management involves tracking and
             organizing goods throughout the supply chain—from procurement to storage
              and distribution. By implementing robust inventory management systems,
               businesses can accurately monitor stock levels, track item movements, and
                optimize inventory turnover rates.</p>
        </div>
      </div>
    </div>

    
  )
}
