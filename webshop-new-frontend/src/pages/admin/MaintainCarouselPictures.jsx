import React, { useEffect, useRef, useState } from 'react';
import config from "../../data/config.json";


function MaintainCarouselPictures() {
  
  
  const idRef = useRef();
  const srcRef = useRef();
  const altRef = useRef();
  const headerRef = useRef();
  const dscRef = useRef();

  const [carousels, setCarousel] = useState([]);


  useEffect(() => {
    fetch(config.backendUrl + "/carousel")
      .then(res => res.json())
      .then(json => {
        setCarousel(json);
        console.log(json);
      });
  }, []);

  function add() {

    const newCarousel = {
      
      "src": srcRef.current.value,
      "alt": altRef.current.value,
      "header": headerRef.current.value,
      "description": dscRef.current.value,
    };

    fetch(config.backendUrl + "/carousel",
      {
        method: "POST",
        body: JSON.stringify(newCarousel),
        headers: { "Content-Type": "application/json" }
      })
      .then(res => res.json())
    //.then(json => setCarousel(json))

  }

  // useEffect(() => {

  //   fetch(config.backendUrl + "/carousel/" + id)
  //     .then(res => res.json())
  //     .then(json => setCarousel(json));
  // }, [id]);

  const edit = () => {
    const updateCarousel = {
      "id": idRef.current.value,
      "src": srcRef.current.value,
      "alt": altRef.current.value,
      "header": headerRef.current.value,
      "description": dscRef.current.value,
    }
    fetch(config.backendUrl + "/carousel", {
      method: "PUT",
      body: JSON.stringify(updateCarousel),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => setCarousel(json))
  }

  const deleteCarousel = (id) => {
    fetch(config.backendUrl + "/carousel/delete/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => setCarousel(data))
  }

  return (

    <div>
      <table>
        <thead>
          <tr>
            <th>Sources</th>
            <th>Alternative</th>
            <th>Header</th>
            <th>Description</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {carousels.map(carousel =>
            <tr key={carousel.id}>
              <td><input type='text' defaultValue={carousel.src} /></td>
              <td><input type='text' defaultValue={carousel.alt} /></td>
              <td><input type='text' defaultValue={carousel.header} /></td>
              <td><input type='text' defaultValue={carousel.description} /></td>
              <td>{carousel.id}</td>
              <td><button onClick={edit}>Edit</button></td>
              <td><button onClick={() => deleteCarousel(carousel.id)}>Delete</button></td>
            </tr>

          )}
        </tbody>
      </table>
      <div>
        <label>Sources</label> <br />
        <input ref={srcRef} type="text" /> <br />
        <label>Alternative</label> <br />
        <input ref={altRef} type="text" /> <br />
        <label>Header</label> <br />
        <input ref={headerRef} type="text" /> <br />
        <label>Description</label> <br />
        <input ref={dscRef} type="text" /> <br />
        <button onClick={add}>Add Carousel</button>
      </div>
    </div>
  )
}

export default MaintainCarouselPictures