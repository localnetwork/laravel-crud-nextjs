import store from "@/lib/store/persistentStore";
import Image from "next/image";
import Link from "next/link";
import { profileouter } from "next/router";
import AUTHAPI from "@/lib/api/auth/request";
import avatarService from "@/lib/services/avatar";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Header() {
  const profile = store((state) => state.profile);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await AUTHAPI.logout();

      console.log(res);
    } catch {
      console.error("Error", error);
    }
  };

  if (profile) {
    return (
      <header>
        <div className="max-w-[1140px] mx-auto px-4 py-4 flex justify-between items-center">
          <div className="">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
              <h1 className="text-xl font-bold ml-2">Cordova Public College</h1>
            </Link>
          </div>
          <div className="relative">
            <div className="flex items-center gap-x-[5px]">
              {profile.avatar ? (
                <>
                  <div
                    className="cursor-pointer text-[#333] inline-block rounded-full w-[50px] h-[50px] flex items-center justify-center p-[5px]"
                    style={{
                      backgroundColor: avatarService.findColor(
                        profile?.avatar_color
                      ),
                    }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {avatarService.findAvatar(profile?.avatar)}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-[#1ed760] text-black p-[15px] rounded-full w-[50px] h-[50px] flex items-center justify-center">
                    {profile?.name[0]}
                  </div>
                </>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-3 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="select-none overflow-hidden absolute right-0  text-[#121212] text-[#333] rounded-[5px] bg-white border border-gray-200 mt-3  w-48 shadow-lg z-10">
                <div className=" p-2 mb-[50px] capitalize">{profile.name}</div>

                <div className="border-b border-gray-200" />
                <div
                  className="cursor-pointer hover:bg-[#f3f3f3] p-2 "
                  onClick={() => {
                    router.push("/profile");
                    setIsDropdownOpen(false);
                  }}
                >
                  Profile
                </div>
                <div
                  className="cursor-pointer hover:bg-[#f3f3f3] p-2"
                  onClick={logoutHandler}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}
