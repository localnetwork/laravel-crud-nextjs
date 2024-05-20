import { parseCookies } from "nookies";
import create from "zustand";
import axios from "axios";

const fetchPosts = async (setPosts, token) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts?limit=10&order=desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Assuming response.data.data contains the array of posts
    setPosts(response.data.data);
  } catch (error) {
    // Handle error
  }
};

const usePostStore = create((set) => ({
  posts: [],
  addPost: (newPost) => {
    console.log("New Post:", newPost); // Logging the new post
    set((state) => ({ posts: [newPost, ...state.posts] }));

    console.log("posts", posts);
  },
}));

// Retrieve token cookie using nookies
const cookies = parseCookies();
const token = cookies.token || ""; // Default value if token cookie doesn't exist

// Use the setState function provided by Zustand to update the state
// Pass it to the fetchPosts function
fetchPosts(usePostStore.setState, token);

export default usePostStore;
