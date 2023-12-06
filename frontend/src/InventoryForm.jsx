//The InventoryForm React component renders a dynamic form for adding or editing inventory items, integrating 
//form validation and toggleable edit mode. It utilizes the react-hook-form library for state management and validation.
// Import necessary dependencies
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Define the InventoryForm component
export default function InventoryForm({ formData, handleOnChange, handleOnSubmit, toggleEdit }) {
  // Destructure data from formData
  const { id } = formData;
  // Destructure methods and state from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: id
      ? formData
      : {
          id: "Default",
          productName: "Default",
          brand: "Default",
          quantity: "Default",
          image: "Default",
          price: "Default",
        },
  });

  // Reset the form when toggleEdit changes
  useEffect(() => reset(formData), [toggleEdit]);

  // Render the form
  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            {...register("productName", { required: "Please enter a valid product name" })}
            id="productName"
            onChange={handleOnChange}
            value={formData.productName}
          />
          <span>{errors.productName?.message}</span>
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            {...register("brand", { required: "Please enter a valid brand" })}
            id="brand"
            onChange={handleOnChange}
            value={formData.brand}
          />
          <span>{errors.brand?.message}</span>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            {...register("quantity", { required: "Please enter a valid quantity" })}
            id="quantity"
            onChange={handleOnChange}
            value={formData.quantity}
          />
          <span>{errors.quantity?.message}</span>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            {...register("image", { required: "Please enter a valid image" })}
            id="image"
            onChange={handleOnChange}
            value={formData.image}
          />
          <span>{errors.image?.message}</span>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            {...register("price", { required: "Please enter a valid price" })}
            id="price"
            onChange={handleOnChange}
            value={formData.price}
          />
          <span>{errors.price?.message}</span>
        </div>
        <button>
          {toggleEdit ? `Edit ${formData.productName}` : "Add to Inventory"}
        </button>
      </form>
    </div>
  );
}
