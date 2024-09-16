import React from 'react'

export default function Component5() {
  return (
    <div style={{ position: 'relative', paddingLeft: '275px', paddingRight: '100px', paddingTop: '150px'}}>
      <h1 style={{
        fontSize: '3rem',
        margin: '0',
        fontFamily:'sans-serif',  
        fontWeight: 'bold',
      }}>
        Heading
      </h1>
      <p style={{
        textAlign:'justify',
        wordSpacing: '1px',
        fontSize: '1.5rem',
        fontFamily: 'Arial, sans-serif',
        color: '#828282',
        marginTop: '10px',
      }}>
        This is a small description explaining the heading or providing additional information.I just needed to fill the space by some words to check how this happens.
      </p>
      <button style={{
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '20px',
      }}>
        Click Me
      </button>
    </div>
  )
}
