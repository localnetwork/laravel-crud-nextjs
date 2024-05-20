import Link from "next/link";
import avatarService from "@/lib/services/avatar";
import store from "@/lib/store/persistentStore";
export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/users/${id}`);
  const data = await res.json();
  const user = data.user;

  return { props: { user } };
}

export default function Page({ user }) {
  const profile = store((state) => state.profile);
  return (
    <>
      <div className="max-w-[1140px] mx-auto py-4 ">
        {user ? (
          <>
            <div
              className="opacity-[.3] h-[250px] relative overflow-hidden rounded-t-[15px]"
              style={{
                background: avatarService.findColor(user.avatar_color),
              }}
            ></div>
            <div className="flex items-center justify-between mt-[-50px] z-[1] relative px-[50px]">
              <div className="flex items-end">
                <span
                  className=" avatar block w-[100px] h-[100px] rounded-full p-3 border-[7px] border-[#F0F2F5]"
                  style={{
                    background: avatarService.findColor(user.avatar_color),
                  }}
                >
                  {avatarService.findAvatar(user.avatar)}
                </span>
                <h1 className="text-[20px] pl-[15px]">{user.name} </h1>
              </div>

              {profile && profile.id === user.id && (
                <div className="pt-[70px]">
                  <Link
                    href="/profile/edit"
                    className=" text-white py-3 px-5 flex items-center gap-x-[5px] min-w-[100px] text-center rounded-[5px] hover:bg-[#041272c9] bg-[#041272]"
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
                    Edit User Profile
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="opacity-[.3] h-[250px] w-[calc(100%+100px)] relative mt-[-50px] mx-[-50px] bg-[#000]"></div>
            <div className="flex items-center justify-between mt-[-50px] z-[1] relative">
              <div className="flex items-end">
                <span className="bg-[#000] block w-[100px] h-[100px] rounded-full p-3 border-[7px] border-[#F0F2F5]"></span>
                <h1 className="text-[20px] pl-[15px]">
                  <div className="bg-black h-[30px] w-[100px]"></div>
                  <span className="text-[#666] text-[14px]"></span>
                </h1>
              </div>

              <div className="pt-[70px]">
                <Link
                  href="/profile/edit"
                  className="bg-[#1ed760] p-5 text-black py-3 px-5 block min-w-[100px] text-center rounded-[5px] hover:bg-[#0a923a]"
                >
                  <span className="bg-[#046b28] h-[30px] block w-[115px]"></span>
                </Link>
              </div>
            </div>
          </>
        )}

        <div className="">Hello</div>
      </div>
    </>
  );
}
