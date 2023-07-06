import React, { useEffect, useState } from 'react'
import config from "../../data/config.json";
import { ToastContainer} from 'react-toastify';
import styles from "../../css/HomePage.module.css";  
import SortButtons from '../../components/home/SortButtons';
import Product from '../../components/home/Product';
import FilterButtons from '../../components/home/FilterButtons';
import { Spinner } from 'react-bootstrap';
import CarouselGallery from '../../components/home/CarouselGallery';
import Pagination from 'react-bootstrap/Pagination';

function HomePage() {
  const [products, setProducts] = useState([]); // products - lehekülje kaupa tooted(mis on väla näidatud)
  const [filteredProducts, setFilteredProducts] = useState([]); // filtreerib tooted kategooria põhiselt
  const [dbProducts, setDbProducts] = useState([]); //kõik tooted andmebaasist
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const productsInPage = 5;

  const pages = [];
  for (let number = 1; number <= Math.ceil(filteredProducts.length/productsInPage); number++) {
    pages.push(number);
  }


  useEffect(() => {
    // TODO: Backendi päring (tooted)
    fetch(config.backendUrl + "/categories")
      .then(res => res.json())
      .then(json => {
        setCategories(json);
      })
  }, []);
  
  useEffect(() => {
    // TODO: Backendi päring (kategooriad)
    fetch(config.backendUrl + "/public-products")
      .then(res => res.json())
      .then(json => {
        setProducts(json.slice(0,productsInPage) || []); //otseselt pole tühja arrayd vaja. Oleneb kas backend tagastab
        setFilteredProducts(json );
        setDbProducts(json);
        setLoading(false);
      })
  }, []);
                  // 1   2   3
  const changePage = (newPage) => {
    setActivePage(newPage);
    setProducts(filteredProducts.slice(productsInPage*newPage-productsInPage,productsInPage*newPage));
  }

  if (isLoading === true) {
    return <Spinner />
  }

  return (
    <div>
      <CarouselGallery/>
      
      <SortButtons 
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        setProducts={setProducts}
        page={activePage}
        />
      <br /><br />
      
      <div>Showing products: {products.length < productsInPage ? filteredProducts.length : products.length * activePage}/{filteredProducts.length}</div>
      
      <FilterButtons
        dbProducts={dbProducts}
        setFilteredProducts={setFilteredProducts}
        setProducts={setProducts}
        setActivePage={setActivePage}
        categories={categories}
      />
      
      <img className="ad" src={"http://picsum.photos/id/237/100/300"} alt="" />
      
      <Pagination>
        {pages.map(number => 
          <Pagination.Item onClick={() => changePage(number)} key={number} active={number === activePage}>
           {number}
         </Pagination.Item>
        )}
      </Pagination>
      
      <div className={styles.products}>
        {products.map(element => 
            <Product key={element.id} element={element} />
          )}
      </div>
      
      <ToastContainer position='bottom-center'></ToastContainer>
    
    </div>
  )
}

export default HomePage