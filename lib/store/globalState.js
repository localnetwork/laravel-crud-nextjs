import { useEffect } from "react"; // Importing useEffect from React (not used in this code)
import { create } from "zustand"; // Importing create function from Zustand

// Using the create function to create a Zustand store
export default create(() => ({
  ready: false, // Initial state object with a property 'ready' initialized to false
  postCreateModal: false,
  postEditModal: false,
  postDeleteModal: false,
  posts: [], // Initial state object with a property 'posts' initialized to an empty array
}));
