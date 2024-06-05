import React, { useState, useEffect } from "react";
import { addCar, updateCar } from "../carInventoryApi.js";

const CarForm = ({ car, onSave, showSaveButton = true, onChange }) => {
  // Initialise the formData state with the car object or an empty object if car is not provided.
  const [formData, setFormData] = useState(car || {});

  // Use the useEffect hook to update formData whenever the car prop changes.
  useEffect(() => {
    setFormData(car || {});
  }, [car]);

  const handleChange = (e) => {
    const updatedData = {
      // Create an updated data object by copying the current formData and updating the changed field.
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior.
    e.preventDefault();
    if (car) {
      await updateCar(car._id, formData);
    } else {
      await addCar(formData);
    }
    onSave();
    setFormData({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="model"
        value={formData.model || ""}
        onChange={handleChange}
        placeholder="Model"
      />
      <input
        name="make"
        value={formData.make || ""}
        onChange={handleChange}
        placeholder="Make"
      />
      <input
        name="colour"
        value={formData.colour || ""}
        onChange={handleChange}
        placeholder="Colour"
      />
      <input
        name="registration"
        value={formData.registration || ""}
        onChange={handleChange}
        placeholder="Registration"
      />
      <input
        name="owner"
        value={formData.owner || ""}
        onChange={handleChange}
        placeholder="Owner"
      />
      <input
        name="address"
        value={formData.address || ""}
        onChange={handleChange}
        placeholder="Address"
      />
      {showSaveButton && <button type="submit">Save</button>}
    </form>
  );
};

export default CarForm;
