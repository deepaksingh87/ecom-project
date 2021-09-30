import React,{useEffect,useState} from 'react'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../action/ProductAction';


export default function HomeScreen() {

  const productList=useSelector(state=>state.productList);
  const {products,loading,error}=productList;
  const productDispatch=useDispatch();

  useEffect(() => {
    productDispatch(listProduct());
    return () => {
      
    }
  }, [])
    return loading?<div>Loading...</div>:
    error?<div>{error}</div>:
        <div>
            <ul className="products">
              
            {products.map((product) => (
            <li>
                  <div className="product">
                      <Link to={"products/"+product._id}>
                    <img className="product-image" src={product.image} alt="" />
                    </Link>
                    <div className="product-name">
                      <Link to={"/products/"+product._id}>{product.name.toUpperCase()}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">&#8377;{product.price}</div>
                    <div className="product-rating">
                      {product.rating} Stars ({product.numReviews})
                    </div>
                  </div>
                </li>
            ))}
            </ul>
        </div>
}
