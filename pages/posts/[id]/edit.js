import BaseApi from "@/lib/api/_base.api";
import POSTAPI from "@/lib/api/posts/requests";
import { timeAgo } from "@/lib/services/globalService";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import store from "@/lib/store/persistentStore";
import useAuth from "@/lib/services/auth";
export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  // Fetch data from external API
  const { id } = context.query;
  const userRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user", {
    headers: {
      Authorization: `Bearer ${cookies[TOKEN]}`,
    },
  });
  const userData = await userRes.json();

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/v1/posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${cookies[TOKEN]}`,
      },
    }
  );

  const postData = await res.json();
  if (postData.data.user_id != userData.id) {
    // return {
    //   redirect: {
    //     destination: "/",
    //     permanent: false,
    //   },
    // };
  }
  return { props: { postData, userData } };
}

export default function Page({ postData, userData }) {
  useAuth();
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [updateForm, setUpdateForm] = useState({
    title: postData?.data?.title || "",
    content: postData?.data?.content || "",
  });

  useEffect(() => {
    if (postData.data.user_id != userData.id) {
      toast.error("You are not authorized to edit this post.");
    }
  }, []);

  const onUpdateTrigger = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    console.log("submitted");
    try {
      const response = await BaseApi.put(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/posts/${postData?.data?.id}`,
        updateForm
      );

      if (response.status === 200) {
        toast.success("Post updated successfully.");
        setIsLoading(false);
        router.push(`/posts/${postData?.data?.id}`);
      }
    } catch (error) {
      if (error?.status === 401) {
        window.location.href = "/login";
      } else {
        setErrors(error?.data?.errors);
      }
      setIsLoading(false);
    }
  };

  const onChangeUpdate = (data) => {
    setUpdateForm({ ...updateForm, ...data });
  };
  if (postData.data.user_id != userData.id) {
    return (
      <div className="py-[50px] px-[15px]">
        <div className="max-w-[1140px] flex justify-center items-center flex-col gap-[15px] box-shadow rounded-[5px] mx-auto px-5 py-10">
          <svg
            version="1.1"
            width="100"
            height="100"
            x="0"
            y="0"
            viewBox="0 0 100 100"
          >
            <g>
              <path
                d="M50 98C23.533 98 2 76.467 2 50S23.533 2 50 2s48 21.533 48 48-21.533 48-48 48zm0-90C26.841 8 8 26.841 8 50s18.841 42 42 42 42-18.841 42-42S73.159 8 50 8zm22.342 62.684a3 3 0 0 0 1.342-4.025C73.404 66.1 66.663 53 50 53S26.596 66.1 26.316 66.658a2.994 2.994 0 0 0 1.332 4.012 3.008 3.008 0 0 0 4.028-1.315C31.893 68.932 37.13 59 50 59s18.107 9.932 18.316 10.342A2.995 2.995 0 0 0 71.003 71c.45 0 .908-.101 1.339-.316zM65 44c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm-30 0c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
                fill="#939393"
                opacity="1"
              ></path>
            </g>
          </svg>
          {`You don't have enough privileges to edit this post.`}
        </div>
      </div>
    );
  }
  return (
    <div className="py-[50px] px-[15px]">
      <div className="max-w-[1140px] box-shadow rounded-[5px] mx-auto p-5">
        <form onSubmit={onUpdateTrigger}>
          <div className="form-item mb-3 relative">
            <input
              type="text"
              name="title"
              id="title"
              className={`form-control ${
                updateForm.title.toString().length > 0 ? "active" : ""
              } ${errors?.title && "active !border-red-500"}`}
              value={updateForm?.title}
              onChange={(e) => onChangeUpdate({ title: e?.target?.value })}
              onKeyDown={(e) => (e?.key === "Enter" ? onUpdateTrigger() : null)}
            />
            <label
              htmlFor="name"
              className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all"
            >
              Title
            </label>

            {errors && errors?.title && (
              <>
                {errors?.title.map((item, index) => (
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

          <div className="form-item mb-3 relative">
            <textarea
              name="content"
              id="content"
              className={`form-control min-h-[250px] ${
                updateForm.content.toString().length > 0 ? "active" : ""
              } ${errors?.content && "active !border-red-500"}`}
              value={updateForm?.content}
              onChange={(e) => onChangeUpdate({ content: e?.target?.value })}
              onKeyDown={(e) => (e?.key === "Enter" ? onUpdateTrigger() : null)}
            />
            <label
              htmlFor="name"
              className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all"
            >
              Content
            </label>

            {errors && errors?.title && (
              <>
                {errors?.title.map((item, index) => (
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

          <div className="form-action mt-[15px]">
            <button
              className={`flex items-center justify-center hover:bg-[#041272c9] text-center cursor-pointer text-[20px] font-bold rounded-[6px] bg-[#041272] py-[10px] text-white text-uppercase w-full  ${
                isLoading ? "opacity-[.7] pointer-events-none" : ""
              }`}
            >
              {isLoading && (
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

              {isLoading ? "Please Wait..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
