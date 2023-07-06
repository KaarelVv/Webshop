import React, {  useState } from 'react'
import config from "../../data/config.json";
//import { json, useParams } from 'react-router-dom';
// import { calcSum } from "./../../pages/global/Cart";


//({ sum })
function Payment(props) {
  

  // const { sum, products } = props;

  const [link, setLink] = useState();

  

function pay() {
    

    console.log(props.products);
      
    
    fetch(config.backendUrl + "/payment", {
      method: "POST",
      body: JSON.stringify(props.products),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      },
    })
      .then(response => response.json())
      .then(data => window.location.href= data.link);
  
  }

  return (
    <div>
    <button onClick={pay}>MAKSMA</button>
    {link && (
      <a href={link.link} target="_blank" rel="noopener noreferrer">
        Payment Link
      </a>
    )}
  </div>
  )
}

export default Payment