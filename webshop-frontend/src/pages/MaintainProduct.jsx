import style from '../Table.module.css';
import React, { useState, useEffect } from 'react'
import { json } from 'react-router-dom';

function MaintainProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/product")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const deleteProduct = (id) => {
    fetch(`http://localhost:8080/product/delete/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => setProducts(data))
  };
  const increaseStock = (id) => {

    fetch(`http://localhost:8080/increase-stock/${id}`, { method: "PATCH" })
      .then(res => res.json())
      .then(data => setProducts(data))
  };
  const decreaseStock = (id) => {

    fetch(`http://localhost:8080/decrease-stock/${id}`, { method: "PATCH" })
      .then(res => res.json())
      .then(data => setProducts(data));
  }



  return (
    <div>
      <table className={style.layout}>
        <tr>
          <th>Nimetus</th>
          <th>Kirjeldus</th>
          <th>Hind</th>
          <th></th>
          <th>Kogus</th>
          <th>Redigeeri</th>
        </tr>
        <tbody className={style.td}>
          {products.map(product =>
            <tr key={product.id}>
              <td className={style.td}>{product.name}</td>
              <td className={style.td}>{product.description}</td>
              <td className={style.td}>{product.price}$</td>
              <td>
                <img src={product.image} alt='' className={style.custom__size} />
              </td>
              <td className={style.td}>{product.stock}</td>

              <td className={style.td}>
                <button onClick={() => deleteProduct(product.id)}>Kustuta</button>
                <button onClick={() => increaseStock(product.id)}>Suurenda</button>
                <button onClick={() => decreaseStock(product.id)}>Vähenda</button>
              </td>

            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default MaintainProduct