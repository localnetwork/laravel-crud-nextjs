import create from "zustand";
import axios from "axios";
import { parseCookies } from "nookies";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";

const fetchPosts = async (setPosts) => {
  const cookies = parseCookies();
  const token = cookies[TOKEN];
  if (token) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts({ posts: response.data.data });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
};

const usePostStore = create((set) => {
  fetchPosts(set); // Fetch posts when the store is created

  return {
    posts: [],
    refreshPosts: () => fetchPosts(set),
    addPost: (newPost) => {
      // Ensure newPost is an object
      if (typeof newPost !== "object" || newPost === null) {
        newPost = { value: newPost };
      }
      set((state) => ({ posts: [newPost, ...state.posts] }));
    },
  };
});

export default usePostStore;
