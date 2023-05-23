import React from 'react'

function TickOrCross({ bool, msg }) {
    return (
        <>

            {
                bool ? 
                <>
                    <span style={{color:'green'}}> ✔️ </span>
                   <span style={{color:'grey'}}> {msg +'\n'} </span>
                </>
                    : 
                    <>
                        <span style={{color:'red',fontSize:'1rem'}}> X </span>
                       <span style={{color:'black'}}>{msg + '\n'}</span> 
                    </>
            }
        </>

    );
}
export default TickOrCross;