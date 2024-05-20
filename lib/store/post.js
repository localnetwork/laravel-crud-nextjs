import { create } from "zustand";
import { devtools } from "zustand/middleware";
import AUTHAPI from "@/lib/api/auth/request";
import persistentStore from "@/lib/store/persistentStore";
import { deserialize } from "@/lib/services/globalService";
import POSTAPI from "../api/posts/requests";

let storeHandler = (set, get) => ({
  postCreateForm: {
    title: "",
    content: "",
  },
  postCreateError: "",
  submissionLoading: false,

  onChangeCreatePost: (data) => {
    set(() => ({
      postCreateForm: { ...get().postCreateForm, ...data },
    }));
  },

  onCreatePost: async () => {
    const createFormData = get().postCreateForm;
    let payload = {};

    payload = {
      ...createFormData,
    };

    set(() => ({ submissionLoading: true, postCreateError: "" }));
    return await POSTAPI.create(payload)
      .then((response) => {
        // Reset form
        set(() => ({
          postCreateForm: {
            title: "",
            content: "",
          },
        }));
        set(() => ({
          submissionLoading: false,
        }));

        return response;
      })
      .catch((err) => {
        set(() => ({
          submissionLoading: false,
          postCreateError: err?.data?.errors,
        }));
        throw err;
      });
  },
});

storeHandler = devtools(storeHandler);
const postStore = create(storeHandler);

export default postStore;
