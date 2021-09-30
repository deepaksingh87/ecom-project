import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../action/ProductAction";
function ProductScreen(props) {
  const [qty,setQty]=useState(1)
  const productDetails=useSelector(state=>state.productDetails);
  const {product,loading,error}=productDetails;
  const dispatch=useDispatch();
     useEffect(()=>{
        dispatch(detailsProduct(props.match.params.id));
        return ()=>{

        }
     },[])

     const handleAddToCart=()=>{
         props.history.push("/cart/"+props.match.params.id+"?qty="+qty)
     }

  return loading?<div><h1>Loading.....</h1></div>:
  error?<div><h1>{error.message}</h1></div>:
    <div >
      <div className="back-to-result">
        <Link to="/">Back To Result</Link>
      </div>
      <div className="details">
        <div className="details-image">
            <img src={product.image} alt="product"/>
        </div>
        <div className="details-info">
            <ul>
                <li>
              <h4>{product.name}</h4>
                </li>
                <li>
                    {product.rating} Stars ({product.numReviews} Reviews)
                </li>
                <li>
                    <b>&#8377;{product.price}</b>
                </li>
                <div>
                    {product.description}
                </div>
            </ul>
        </div>
        <div className="details-action">
            <ul>
                <li>
                    price:${product.price*qty}
                </li>
                <li>
                    status:{product.countInStock>0?"Product In Stock":"unavailable"}
                </li>
                <li>
                    Qty:<select value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map(x=><option value={x+1} key={x+1}>{x+1}</option>)}
                    </select>
                </li>
                <li>
                   {product.countInStock>0 && <button className="button primary" onClick={handleAddToCart}>Add to Cart</button>}
                </li>
            </ul>
        </div>
      </div>
    </div>
}

export default ProductScreen;
