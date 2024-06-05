import React, { useState, useEffect } from "react";
import {
  fetchAllCars,
  deleteCar,
  updateMultipleCars,
  fetchOldCars,
} from "../carInventoryApi.js";
import CarForm from "./carForm.js";

const Cars = () => {
  // State variables
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [selectedCars, setSelectedCars] = useState([]);
  const [formState, setFormState] = useState({});
  const [oldCars, setOldCars] = useState([]);
  const [error, setError] = useState(null);

  // Load all cars when the component mounts
  useEffect(() => {
    loadCars();
  }, []);

  // Fetch all cars from the API and set the state
  const loadCars = async () => {
    try {
      const data = await fetchAllCars();
      setCars(data);
    } catch (err) {
      setError("Failed to fetch cars");
    }
  };

  // Handle deleting a car by ID
  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      loadCars();
    } catch (err) {
      setError("Failed to delete car");
    }
  };

  // Set the car to be edited
  const handleEdit = (car) => {
    setEditingCar(car);
  };

  // Save the edited car and reload the cars list
  const handleSave = () => {
    setEditingCar(null);
    loadCars();
  };

  // Handle selecting and deselecting cars for batch update
  const handleSelect = (carId) => {
    setSelectedCars((prevSelected) => {
      // Check if the carId is already in the selectedCars array.
      if (prevSelected.includes(carId)) {
        // If the carId is already selected, remove it from the array.
        return prevSelected.filter((id) => id !== carId);
      } else {
        // If the carId is not selected, add it to the array.
        return [...prevSelected, carId];
      }
    });
    // create a new state object by copying the previous state and adding or updating
    // the form data for the car with the specified carId.
    setFormState((prevState) => ({
      ...prevState,
      [carId]: cars.find((car) => car._id === carId) || {}, // If the car is found, use it as the value for the carId key in the formState.
    }));
  };

  // Handle form data changes for a selected car
  const handleFormChange = (carId, updatedData) => {
    setFormState((prevState) => ({
      ...prevState, // Copy the previous state.
      [carId]: {
        ...prevState[carId], // Copy the previous data for this specific car.
        ...updatedData, // Merge the updated data for this car.
      },
    }));
  };

  // Handle updating multiple cars at once
  const handleMultipleUpdate = async () => {
    try {
      // Create an array of car objects to update using the form state.
      const carsToUpdate = selectedCars.map((carId) => ({
        ...formState[carId],
      }));
      const res = await updateMultipleCars(carsToUpdate);

      // Update the cars state directly instead of reloading
      setCars((prevCars) =>
        prevCars.map((car) =>
          selectedCars.includes(car._id)
            ? { ...car, ...formState[car._id] }
            : car
        )
      );
      // Reset the selection and form state after updating.
      setSelectedCars([]);
      setFormState({});
      setError(null);
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update cars");
    }
  };

  // Handle fetching cars older than a specified number of years
  const handleFetchOlderCars = async () => {
    try {
      const olderCars = await fetchOldCars(5);
      setOldCars(olderCars);
    } catch (err) {
      setError("Failed to fetch cars older than 5 years");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CarForm car={editingCar} onSave={handleSave} />
      <button onClick={handleFetchOlderCars}>
        Show Cars Older Than 5 Years
      </button>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <input
              type="checkbox"
              checked={selectedCars.includes(car._id)}
              onChange={() => handleSelect(car._id)}
            />
            {car.model} - {car.make} - {car.registration} - {car.owner} -{" "}
            {car.colour} - {car.address}
            <button onClick={() => handleEdit(car)}>Edit</button>
            <button onClick={() => handleDelete(car._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedCars.length > 0 && ( // if boxes are checked
        <div>
          <h3>Update Selected Cars</h3>
          {selectedCars.map((carId) => (
            <CarForm
              key={carId}
              car={formState[carId]}
              onSave={() => {}}
              showSaveButton={false}
              onChange={(updatedData) => handleFormChange(carId, updatedData)}
            />
          ))}
          <button onClick={handleMultipleUpdate}>Update Selected Cars</button>
        </div>
      )}
      {oldCars.length > 0 && ( // if old cars exist
        <div>
          <h3>Cars Older Than Five Years</h3>
          <ul>
            {oldCars.map((car) => (
              <li key={car._id}>
                {car.model} - {car.make} - {car.registration} - {car.owner}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cars;
