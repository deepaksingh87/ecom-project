import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProduct, saveProduct } from "../action/ProductAction";
// import { detailsUser } from "../action/UserAction";

function ProductsScreen(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  // const productList=useSelector(state=>state.productList)
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;


  const [modelVisible,setModalVisible]=useState(false)
  const [id,setId]=useState('')

  const productSave = useSelector((state) => state.productSave);
  const productDelete = useSelector((state) => state.productDelete);

  const { loading:loadingSave, success:successSave, error:errorSave } = productSave;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if(successSave){
      setModalVisible(false)
    }
     dispatch(listProduct())
    return () => {};
  },[successSave,successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct(name,price,image,brand,category,description,countInStock));
  };
  const deleteHandler=(product)=>{
    dispatch(deleteProduct(product._id))
  }
  const openModel=(product)=>{
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  }
  return (

    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="primary createproduct" onClick={()=>openModel({})}>create product</button>
        {console.log("list ot the products are=",products)}
      </div>
      {modelVisible && (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Creating Product Item</h2>
          </li>
          <li>
            {loadingSave&& <h1>Loading....</h1>}
            {successSave && <h1>data send successfully</h1>}
            {errorSave && (
              <div>
                <h3>{errorSave}</h3>
              </div>
            )}
          </li>
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          {/* -------------------------------- */}

          <li>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              name="image"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="countInStock">InStock:</label>
            <input
              type="text"
              name="countInStock"
              id="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </li>
          {/* -------------------------------- */}

          <li>
            <button type="submit" className="button primary">
              {id?"update":"create"}
            </button>
            <button type="submit" className="button secondary" onClick={()=>setModalVisible(false)}>
              back
            </button>
          </li>
          
        </ul>
      </form>
    </div>
)}
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product=>(
              <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <button onClick={()=>openModel(product)} className="button-edit primary">edit</button>
                <button className="button-delete secondary" onClick={()=>deleteHandler(product)}>delete</button>
              </td>
              </tr>
          ))}
          
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsScreen;
