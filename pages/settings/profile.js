import AccountSettingsMenu from "@/components/menus/AccountSettingsMenu";
import BaseApi from "@/lib/api/_base.api";
import useAuth from "@/lib/services/auth";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import avatarColors from "@/lib/static-data/avatar-colors";
import store from "@/lib/store/persistentStore";
import USERAPI from "@/lib/api/user/request";
import avatars from "@/lib/static-data/avatars";
import { toast } from "react-toastify";
import avatarService from "@/lib/services/avatar";
export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const ress = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user", {
    headers: {
      Authorization: `Bearer ${cookies[TOKEN]}`,
    },
  });

  const userData = await ress.json();
  return { props: { userData } };
}

export default function Page({ userData }) {
  useEffect(() => {
    store.setState({ profile: userData });
  }, []);

  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [updateForm, setUpdateForm] = useState({
    name: userData?.name || "",
    avatar: userData?.avatar || "",
    avatar_color: userData?.avatar_color || "",
  });

  const onUpdateTrigger = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      const response = await USERAPI.updateProfile(updateForm);
      console.log(response);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setIsLoading(false);
        store.setState({ profile: response.data.user });
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

  useAuth();
  return (
    <main className="mx-auto max-w-[1140px] py-[50px]">
      <div className="box-shadow rounded-[5px] p-5">
        <h1 className="font-bold text-[25px] mb-5">Profile Settings</h1>
        <div className="flex flex-wrap mx-[-15px]">
          <AccountSettingsMenu />
          <div className="px-[15px] max-w-[75%] w-full">
            <h2 className="text-[#000] text-[20px] font-bold md:mt-[-30px] mb-[20px]">
              Avatar Preview
            </h2>

            <div className="avatar-preview">
              {updateForm.avatar !== "" && updateForm.avatar_color !== "" ? (
                <div
                  className="text-[#333] inline-block rounded-full w-[100px] h-[100px] flex items-center justify-center mb-[30px] p-[15px]"
                  style={{
                    backgroundColor: avatarService.findColor(
                      updateForm.avatar_color
                    ),
                  }}
                >
                  {avatarService.findAvatar(updateForm.avatar)}
                </div>
              ) : (
                <div className="text-[#7a7a7a]">{`There are no selections yet.`}</div>
              )}
            </div>
            <form onSubmit={onUpdateTrigger}>
              <div className="form-item mb-3 relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`form-control ${
                    updateForm.name.toString().length > 0 ? "active" : ""
                  } ${errors?.name && "active !border-red-500"}`}
                  value={updateForm?.name}
                  onChange={(e) => onChangeUpdate({ name: e?.target?.value })}
                  onKeyDown={(e) =>
                    e?.key === "Enter" ? onUpdateTrigger() : null
                  }
                />
                <label
                  htmlFor="name"
                  className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all"
                >
                  Name
                </label>

                {errors && errors?.name && (
                  <>
                    {errors?.name.map((item, index) => (
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

              <h2 className="text-[#000] text-[20px] font-bold mb-[30px]">
                Pick an avatar
              </h2>
              <div
                className={`form-group avatar-selections flex flex-wrap mb-[10px] ${
                  updateForm.avatar === "" ? "has-avatar-selections" : ""
                }`}
              >
                {avatars.map((item, index) => (
                  <div
                    className="avatar-item mb-[15px] w-full max-w-[33.33%] xs:max-w-[25%] sm:max-w-[20%] md:max-w-[16.66%] px-[5px] w-full"
                    key={index}
                  >
                    <input
                      type="radio"
                      id={`avatar-${item.id}`}
                      name="avatar"
                      value={item.id}
                      onChange={(e) =>
                        onChangeUpdate({ avatar: e?.target?.value })
                      }
                      onKeyDown={(e) =>
                        e?.key === "Enter" ? onUpdateTrigger() : null
                      }
                      checked={updateForm.avatar === item.id ? true : false}
                      className="hidden"
                    />
                    <label
                      className="cursor-pointer"
                      htmlFor={`avatar-${item.id}`}
                    >
                      {item.icon}
                    </label>
                  </div>
                ))}
              </div>

              <h2 className="text-[#000] text-[20px] font-bold mb-[30px]">
                Pick a color
              </h2>
              <div
                className={`form-group avatar-color-selections  flex gap-x-[15px] flex-wrap mb-[10px] ${
                  updateForm?.avatar_color !== ""
                    ? "has-avatar-color-selections"
                    : ""
                }`}
              >
                {avatarColors.map((item, index) => (
                  <div
                    className="avatar-color-item mb-[15px] max-w-[50px] w-full"
                    key={index}
                  >
                    <input
                      type="radio"
                      id={`color-${item.id}`}
                      name="color"
                      value={item.id}
                      onChange={(e) =>
                        onChangeUpdate({ avatar_color: e?.target?.value })
                      }
                      onKeyDown={(e) =>
                        e?.key === "Enter" ? onUpdateTrigger() : null
                      }
                      checked={
                        updateForm?.avatar_color === item.id ? true : false
                      }
                      className="hidden"
                    />
                    <label
                      className={`cursor-pointer h-[50px] w-[50px] block rounded-full relative ${
                        updateForm?.avatar_color === item.id
                          ? "border-[2px] border-black"
                          : ""
                      }`}
                      htmlFor={`color-${item.id}`}
                      style={{ backgroundColor: item.hex }}
                    ></label>
                  </div>
                ))}
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
      </div>
    </main>
  );
}
