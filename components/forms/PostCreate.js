import globalState from "@/lib/store/globalState";
import postStore from "@/lib/store/post";
import { shallow } from "zustand/shallow";
import { toast } from "react-toastify";
import usePostStore from "@/lib/store/PostState";
export default function PostCreate() {
  const postCreateModal = globalState((state) => state.postCreateModal);
  const { posts, addPost } = usePostStore();

  const [
    postCreateForm,
    onChangeCreatePost,
    onCreatePost,
    postCreateError,
    submissionLoading,
  ] = postStore(
    (state) => [
      state.postCreateForm,
      state.onChangeCreatePost,
      state.onCreatePost,
      state.postCreateError,
      state.submissionLoading,
    ],
    shallow
  );

  const onPostCreateTrigger = async (e) => {
    e?.preventDefault();

    onCreatePost()
      .then((e) => {
        globalState.setState({ postCreateModal: false });
        toast.success("Post has been created.");
        addPost(e?.data?.data);
      })
      .catch(() => {});
  };

  return (
    <>
      {postCreateModal && (
        <div className="fixed p-[15px] z-[999] flex justify-center items-center top-0 left-0 w-full h-full">
          <span
            className="overlay bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"
            onClick={() => globalState.setState({ postCreateModal: false })}
          ></span>
          <div className="box-shadow max-w-[700px] mx-auto w-full p-5 relative z-[200] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between mb-5">
              <h1 className="font-bold text-[25px]">Add Post</h1>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() =>
                    globalState.setState({ postCreateModal: false })
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>

            <form className="" id="postCreate" onSubmit={onPostCreateTrigger}>
              <div className="form-item relative mb-5">
                <input
                  id="title"
                  type="text"
                  name="title"
                  autoComplete="off"
                  className={`form-control ${
                    postCreateForm.title.toString().length > 0 ? "active" : ""
                  } ${
                    postCreateError?.message?.toString().length > 0 ||
                    (postCreateError?.title && "!border-red-500")
                  }`}
                  value={postCreateForm.title}
                  onChange={(e) =>
                    onChangeCreatePost({ title: e?.target?.value })
                  }
                  onKeyDown={(e) =>
                    e?.key === "Enter" ? onPostCreateTrigger() : null
                  }
                />
                <label className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all">
                  Title
                </label>

                {postCreateError && postCreateError?.title && (
                  <>
                    {postCreateError?.title.map((item, index) => (
                      <span
                        key={index}
                        className="text-red-500 text-[13px] mt-[5px] block"
                      >
                        {item}
                      </span>
                    ))}
                  </>
                )}
              </div>

              <div className="form-item relative">
                <textarea
                  id="content"
                  name="content"
                  autoComplete="off"
                  className={`form-control min-h-[200px] ${
                    postCreateForm.content.toString().length > 0 ? "active" : ""
                  } ${
                    postCreateError?.message?.toString().length > 0 ||
                    (postCreateError?.content && "!border-red-500")
                  }`}
                  value={postCreateForm.content}
                  onChange={(e) =>
                    onChangeCreatePost({ content: e?.target?.value })
                  }
                  onKeyDown={(e) =>
                    e?.key === "Enter" ? onPostCreateTrigger() : null
                  }
                ></textarea>
                <label className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all">
                  Content
                </label>

                {postCreateError && postCreateError?.content && (
                  <>
                    {postCreateError?.content.map((item, index) => (
                      <span
                        key={index}
                        className="text-red-500 text-[13px] mt-[5px] block"
                      >
                        {item}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <div className="mt-5">
                <button className="flex items-center justify-center hover:bg-[#041272c9] text-center cursor-pointer text-[20px] font-bold rounded-[6px] bg-[#041272] py-[10px] text-white text-uppercase w-full  ">
                  {submissionLoading && (
                    <svg
                      className="animate-spin mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#333"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="#000"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {submissionLoading ? "Please wait..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
