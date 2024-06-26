import { create } from "zustand"; // Importing create function from Zustand

// Using the create function to create a Zustand store
export default create(() => ({
  ready: false, // Initial state object with a property 'ready' initialized to false
}));
