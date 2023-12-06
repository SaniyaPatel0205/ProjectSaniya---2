// Import necessary components and libraries
import InventoryCard from "./InventoryCard";
import CartList from "./CartList";

import { useState, useEffect } from "react";
import axios from "axios";
import InventoryForm from "./InventoryForm";

// Define the main component for the Groceries App
export default function GroceriesApp() {
  // Define an empty product for form initialization
  const emptyProduct = {
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",
  };

  // State variables
  const [cartList, setCartList] = useState([]); // State for the shopping cart
  const [products, setProducts] = useState([]); // State for the list of products
  const [formData, setFormData] = useState(emptyProduct); // State for form data
  const [responseData, setResponseData] = useState(""); // State for response data from server
  const [toggleEdit, setToggleEdit] = useState(false); // State for toggle between add and edit mode

  // useEffect to fetch products when responseData changes
  useEffect(() => {
    handleGetProducts();
  }, [responseData]);

  // Function to fetch products from the server
  const handleGetProducts = async () => {
    await axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
    });
  };

  // Function to handle the submission of a product (add or edit)
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    toggleEdit ? handleProductEdit(formData) : handlePostProduct(formData);
    setFormData(emptyProduct);
  };

  // Function to handle the addition of a product to the cart
  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      console.log(cartList);
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };

  // Function to empty the shopping cart
  const handleEmptyCart = () => {
    setCartList([]);
  };

  // Function to remove an item from the shopping cart
  const handleRemoveItem = (id) => {
    setCartList((prevList) => {
      return prevList.filter((i) => i.id !== id);
    });
  };

  // Function to handle form field changes
  const handleOnChange = (evt) => {
    const fieldName = evt.target.name;
    const fieldValue = evt.target.value;
    setFormData((prevData) => {
      return {
        ...prevData,
        id: crypto.randomUUID(),
        [fieldName]: fieldValue,
      };
    });
  };

  //POST PRODUCT
const handlePostProduct = async (product) => {
  const postProduct = {
    id: product.id,
    productName: product.productName,
    brand: product.brand,
    quantity: product.quantity,
    image: product.image,
    price: product.price
  };
  await axios.
  post("http://localhost:3000/addProduct", postProduct)
  .then((response) => setResponseData(<p>{response.data}</p>));
};

  // Function to handle the deletion of a product
  const handleProductDelete = async (product) => {
    const id = product._id;
    axios
      .delete(`http://localhost:3000/product/${id}`)
      .then((response) => setResponseData(<p>{response.data}</p>));
  };

  // Function to handle the editing of a product
  const handleProductEdit = async (product) => {
    const id = product._id;
    const editData = {
      id: product.id,
      productName: product.productName,
      brand: product.brand,
      quantity: product.quantity,
      image: product.image,
      price: product.price,
    };
    await axios
      .patch(`http://localhost:3000/product/${id}`, editData)
      .then((response) => setResponseData(<p>{response.data}</p>))
      .then(setToggleEdit(false));
  };

  // Function to toggle between edit and add mode
  const handleToggleEdit = (product) => {
    setFormData(product);
    setToggleEdit(true);
  };

  // Render the main component
  return (
    <>
      <h1>Groceries App</h1>
      <InventoryForm
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        handleOnChange={handleOnChange}
        handleToggleEdit={handleToggleEdit}
        toggleEdit={toggleEdit}
      />
      {responseData}
      <div className="GroceriesApp-Container">
        <InventoryCard
          list={products}
          onClick={handleAddToCart}
          handleProductDelete={handleProductDelete}
          handleToggleEdit={handleToggleEdit}
        />
        <CartList
          cartList={cartList}
          onClickEmpty={handleEmptyCart}
          onClickRemove={handleRemoveItem}
        />
      </div>
    </>
  );
  }