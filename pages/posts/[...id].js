import BaseApi from "@/lib/api/_base.api";
import POSTAPI from "@/lib/api/posts/requests";
import { timeAgo } from "@/lib/services/globalService";
import Link from "next/link";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useAuth from "@/lib/services/auth";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";
export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  // Fetch data from external API
  const { id } = context.query;
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/v1/posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${cookies[TOKEN]}`,
      },
    }
  );

  const userRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user", {
    headers: {
      Authorization: `Bearer ${cookies[TOKEN]}`,
    },
  });
  const userData = await userRes.json();

  const postData = await res.json();
  return { props: { postData, userData } };
}

export default function Page({ postData, userData }) {
  const router = useRouter();
  useAuth();
  const triggerDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        const response = await BaseApi.delete(
          process.env.NEXT_PUBLIC_API_URL +
            `/api/v1/posts/${postData?.data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        if (response.status === 200) {
          router.push("/");
          toast.success("Post deleted successfully.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting this post.");
      }
    }
  };
  return (
    <>
      {postData?.data ? (
        <div className="py-[50px] px-[15px]">
          <div className="max-w-[1140px] box-shadow rounded-[5px] mx-auto p-5">
            <div className="flex justify-end">
              {postData?.data?.user_id == userData.id && (
                <div className="flex items-center gap-x-[15px]">
                  <Link
                    className="text-white py-3 px-5 flex items-center gap-x-[5px] min-w-[100px] text-center rounded-[5px] hover:bg-[#041272c9] bg-[#041272]"
                    href={`/posts/${postData?.data?.id}/edit`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                    Edit this post
                  </Link>
                  <button
                    onClick={triggerDelete}
                    className="bg-red-500 text-white py-3 px-5 flex items-center gap-x-[5px] min-w-[100px] text-center rounded-[5px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
            <h1 className="font-bold text-black">{postData?.data?.title}</h1>
            <p className="text-gray-500 text-[14px]">
              {`Posted by:`} {postData?.data?.user?.name} |{" "}
              {timeAgo(postData?.data?.created_at)}
            </p>
            <p className="mt-[50px]">{postData?.data?.content}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[100vh] p-5">
          <div className="box-shadow p-5 rounded-[5px]">
            <h1 className="font-bold text-black">Post not found</h1>
          </div>
        </div>
      )}
    </>
  );
}
