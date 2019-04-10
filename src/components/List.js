import React from 'react';


const list = props  => {

    console.log('rendering the list');

    return(
        <ul>
        {props.items.map((item) => (
            <li key={item.id} onClick={props.onclick.bind(this, item.id)}>
                {/*use bind to pass the argument*/}
                {item.name}
            </li>
            ))}
        </ul>

)};


export default list;