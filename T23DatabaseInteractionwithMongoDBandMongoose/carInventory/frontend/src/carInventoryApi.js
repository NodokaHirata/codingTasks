// Get the URL for backend
const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:1234/carInventoryApi";

// Get all cars
export const fetchAllCars = async () => {
  try {
    const response = await fetch(`${API_URL}/`); // Correspond with the carInventoryRoutes.js
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    throw error;
  }
};

// Add a new car
export const addCar = async (car) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      // '/carInventoryApi/add'
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
    return response.json();
  } catch (error) {
    console.error("Failed to add a new car:", error);
    throw error;
  }
};

// Update a single car by ID
export const updateCar = async (id, car) => {
  try {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
    return response.json();
  } catch (error) {
    console.error("Failed to update a car:", error);
    throw error;
  }
};

// Update multiple cars
export const updateMultipleCars = async (cars) => {
  const response = await fetch(`${API_URL}/multiple`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cars),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Network response was not ok: ${errorDetails}`);
  }

  const jsonResponse = await response.json();

  return jsonResponse;
};

// Delete a car by ID
export const deleteCar = async (id) => {
  try {
    await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to delete a car:", error);
    throw error;
  }
};

// Get cars older than x years
export const fetchOldCars = async (years) => {
  const response = await fetch(`${API_URL}/findCarByYear/${years}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
