import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import store from "@/lib/store/persistentStore";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import globalState from "@/lib/store/globalState";
import authStore from "@/lib/store/auth";
import { toast } from "react-toastify";
import avatarColors from "@/lib/static-data/avatar-colors";
import avatarService from "@/lib/services/avatar";
import avatars from "@/lib/static-data/avatars";
export default function Register() {
  const [showAvatar, setShowAvatar] = useState(false);
  const [
    registerForm,
    onChangeRegister,
    onRegister,
    registrationError,
    submissionLoading,
  ] = authStore(
    (state) => [
      state.registerForm,
      state.onChangeRegister,
      state.onRegister,
      state.registrationError,
      state.submissionLoading,
    ],
    shallow
  );

  const router = useRouter();
  const profile = store((state) => state.profile);
  const ready = globalState((state) => state.ready);

  const onRegisterTrigger = async (e) => {
    e?.preventDefault();

    onRegister()
      .then(() => {
        toast.success("Registration successful. Please login to continue.");
        router.replace("/login");
      })
      .catch(() => {});
  };

  if (profile) {
    router.push("/");
    return <div>Loading</div>;
  }

  return (
    <div className="gradient-black min-h-[100vh] flex items-center justify-center flex-col p-[15px] md:p-[32px]">
      <div className="mb-[15px]">
        <Image src="/images/logo.png" alt="Logo" width={100} height={150} />
      </div>
      <div className="box-shadow py-[30px] rounded-[8px] px-[20px] w-full max-w-[400px] mx-auto">
        <h1 className="pt-[15px] text-[18px] text-center mb-[30px] leading-[22px]">
          Create an account
        </h1>

        {registrationError?.message && (
          <p className="bg-[#ffeaea] py-[10px] px-[15px] text-red-500 border-red-100 border text-[13px] mb-[30px] text-center block">
            {registrationError?.message}
          </p>
        )}

        <form className="flex flex-col" onSubmit={onRegisterTrigger}>
          {(registrationError?.avatar || registrationError?.avatar_color) && (
            <p className="!text-red-500 text-center font-bold mb-[10px] text-[12px]">
              You must pick an avatar
            </p>
          )}
          {registerForm.avatar !== "" && registerForm.avatar_color !== "" ? (
            <div className="text-center flex justify-center flex-col items-center">
              <div
                className="text-[#333] cursor-pointer hover:opacity-[.5] inline-block rounded-full w-[100px] h-[100px] flex items-center justify-center mb-[30px] p-[15px]"
                style={{
                  backgroundColor: avatarService.findColor(
                    registerForm.avatar_color
                  ),
                }}
                onClick={() => {
                  setShowAvatar(true);
                  document
                    .querySelector("body")
                    .classList.add("overflow-hidden");
                }}
              >
                {avatarService.findAvatar(registerForm.avatar)}
              </div>
              <div
                onClick={() => {
                  setShowAvatar(true);
                  document
                    .querySelector("body")
                    .classList.add("overflow-hidden");
                }}
                className="text-[#041272] inline-flex gap-x-[5px] max-w-[200px] mb-[10px] cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
                Update selection
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setShowAvatar(true);
                document.querySelector("body").classList.add("overflow-hidden");
              }}
              className={`${
                registrationError.avatar || registrationError.avatar_color
                  ? "!border-red-500 !text-red-500"
                  : ""
              } text-[#041272] border border-dashed border-[#041272] rounded-[15px] p-[15px] text-center items-center justify-center inline-flex gap-x-[5px] mb-[30px] cursor-pointer ${
                typeof error === "string" && error.includes("Avatar")
                  ? "!text-red-500 !border-[1px] !border-red-500"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              Pick your avatar
            </div>
          )}

          <div className="bg-[#727272] h-[1px] mb-[30px]" />
          <div className="form-item relative mb-[15px]">
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              className={`form-control ${
                registerForm.name.toString().length > 0 ? "active" : ""
              } ${
                registrationError?.message?.toString().length > 0 ||
                (registrationError?.name && "!border-red-500")
              }`}
              value={registerForm.name}
              onChange={(e) => onChangeRegister({ name: e?.target?.value })}
              onKeyDown={(e) =>
                e?.key === "Enter" ? onRegisterTrigger() : null
              }
            />

            <label
              htmlFor="name"
              className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all"
            >
              Name
            </label>

            {registrationError && registrationError?.name && (
              <>
                {registrationError?.name.map((item, index) => (
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
          <div className="form-item relative mb-[15px]">
            <input
              id="email"
              className={`form-control ${
                registerForm.email.toString().length > 0 ? "active" : ""
              } ${
                registrationError?.message?.toString().length > 0 ||
                (registrationError?.email && "!border-red-500")
              }`}
              type="text"
              name="email"
              autoComplete="new-email"
              value={registerForm.email}
              onChange={(e) => onChangeRegister({ email: e?.target?.value })}
              onKeyDown={(e) =>
                e?.key === "Enter" ? onRegisterTrigger() : null
              }
            />
            <label
              htmlFor="email"
              className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all"
            >
              Email
            </label>

            {registrationError && registrationError?.email && (
              <>
                {registrationError?.email.map((item, index) => (
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
          <div className="form-item relative mb-[15px]">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className={`form-control ${
                registerForm.password.toString().length > 0 ? "active" : ""
              } ${
                registrationError?.message?.toString().length > 0 ||
                (registrationError?.password && "!border-red-500")
              }`}
              value={registerForm.password}
              onChange={(e) => onChangeRegister({ password: e?.target?.value })}
              onKeyDown={(e) =>
                e?.key === "Enter" ? onRegisterTrigger() : null
              }
            />
            <label
              htmlFor="password"
              className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all"
            >
              Password
            </label>

            {registrationError && registrationError?.password && (
              <>
                {registrationError?.password.map((item, index) => (
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

          <div className="form-item relative mb-[15px]">
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              autoComplete="off"
              className={`form-control ${
                registerForm.password_confirmation.toString().length > 0
                  ? "active"
                  : ""
              } ${
                registrationError?.message?.toString().length > 0 ||
                (registrationError?.password_confirmation && "!border-red-500")
              }`}
              value={registerForm.password_confirmation}
              onChange={(e) =>
                onChangeRegister({ password_confirmation: e?.target?.value })
              }
              onKeyDown={(e) =>
                e?.key === "Enter" ? onRegisterTrigger() : null
              }
            />
            <label
              htmlFor="password_confirmation"
              className="absolute cursor-pointer left-[10px] text-[#555] top-[13px] bg-white px-[5px] rounded-[2px] transition-all"
            >
              Confirm Password
            </label>

            {registrationError && registrationError?.password_confirmation && (
              <>
                {registrationError?.password_confirmation.map((item, index) => (
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
                submissionLoading ? "opacity-[.7] pointer-events-none" : ""
              }`}
            >
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

              {submissionLoading ? "Please Wait..." : "Register"}
            </button>
          </div>

          <div className="my-[32px] text-center">
            <span
              href="/forgot-password"
              className="underline cursor-pointer"
              onClick={() => {
                alert("Still work in progress.");
              }}
            >
              Forgot your password?
            </span>
          </div>

          <div className="border-t-[1px] border-[#727272] py-[32px] text-center">
            <span className="text-[#727272]">{"Already have an account?"}</span>{" "}
            <Link href="/login" className="underline hover:text-[#041272]">
              Login
            </Link>
          </div>
        </form>
      </div>

      {showAvatar && (
        <div className="avatar-popup flex p-[15px] items-center fixed top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full absolute overlay backdrop-blur-sm bg-black bg-opacity-50"></div>
          <div className="avatar-content shadow-md rounded-[15px] bg-white max-h-[calc(100dvh-30px)] overflow-y-auto !pb-0 p-[15px] md:p-[50px] max-w-[700px] mx-auto relative z-[20]">
            <h2 className="text-[#000] text-[20px] font-bold md:mt-[-30px] mb-[20px]">
              Avatar Preview
            </h2>

            <div className="avatar-preview">
              {registerForm.avatar !== "" &&
              registerForm.avatar_color !== "" ? (
                <div
                  className="text-[#333] inline-block rounded-full w-[100px] h-[100px] flex items-center justify-center mb-[30px] p-[15px]"
                  style={{
                    backgroundColor: avatarService.findColor(
                      registerForm.avatar_color
                    ),
                  }}
                >
                  {avatarService.findAvatar(registerForm.avatar)}
                </div>
              ) : (
                <div className="text-[#7a7a7a]">{`There are no selections yet.`}</div>
              )}
            </div>

            <div className="my-[30px] h-[1px] bg-[#dbdbdb]" />
            <h2 className="text-[#000] text-[20px] font-bold mb-[30px]">
              Pick a color
            </h2>

            <div
              className={`form-group avatar-color-selections  flex gap-x-[15px] flex-wrap mb-[10px] ${
                registerForm.avatar_color !== ""
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
                      onChangeRegister({ avatar_color: e?.target?.value })
                    }
                    onKeyDown={(e) =>
                      e?.key === "Enter" ? onRegisterTrigger() : null
                    }
                    checked={
                      registerForm.avatar_color === item.id ? true : false
                    }
                    className="hidden"
                  />
                  <label
                    className={`cursor-pointer h-[50px] w-[50px] block rounded-full relative ${
                      registerForm.avatar_color === item.id
                        ? "border-[2px] border-black"
                        : ""
                    }`}
                    htmlFor={`color-${item.id}`}
                    style={{ backgroundColor: item.hex }}
                  ></label>
                </div>
              ))}
            </div>

            <div className="my-[30px] h-[1px] bg-[#dbdbdb]" />

            <h2 className="text-[#000] text-[20px] font-bold mb-[30px]">
              Pick your avatar
            </h2>
            <div
              className={`form-group avatar-selections flex flex-wrap mb-[10px] ${
                registerForm.avatar === "" ? "has-avatar-selections" : ""
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
                      onChangeRegister({ avatar: e?.target?.value })
                    }
                    onKeyDown={(e) =>
                      e?.key === "Enter" ? onRegisterTrigger() : null
                    }
                    checked={registerForm.avatar === item.id ? true : false}
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

            <div className="sticky bottom-0 bg-white py-[15px]">
              <div
                className="cursor-pointer select-none mt-[15px] flex items-center justify-center hover:bg-[#041272c9] hover:font-bold bg-[#041272] text-white rounded-[50px] py-[15px] text-[20px]"
                onClick={() => {
                  if (registerForm.avatar === "") {
                    toast.error("You must choose an avatar.", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }

                  if (registerForm.avatar_color === "") {
                    toast.error("You must pick a color.", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }

                  if (
                    registerForm.avatar !== "" &&
                    registerForm.avatar_color !== ""
                  ) {
                    setShowAvatar(false);
                    document
                      .querySelector("body")
                      .classList.remove("overflow-hidden");
                  }
                }}
              >
                Proceed
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
