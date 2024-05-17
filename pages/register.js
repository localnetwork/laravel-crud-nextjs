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
export default function Register() {
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
          <div className="form-item mb-[15px]">
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              className={`form-control ${
                registrationError?.message?.toString().length > 0 ||
                (registrationError?.name && "!border-red-500")
              }`}
              value={registerForm.name}
              onChange={(e) => onChangeRegister({ name: e?.target?.value })}
              onKeyDown={(e) =>
                e?.key === "Enter" ? onRegisterTrigger() : null
              }
              placeholder="Name"
            />

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
          <div className="form-item mb-[15px]">
            <input
              id="email"
              className={`form-control ${
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
              placeholder="Email"
            />

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
          <div className="form-item mb-[15px]">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className={`form-control ${
                registrationError?.message?.toString().length > 0 ||
                (registrationError?.password && "!border-red-500")
              }`}
              value={registerForm.password}
              onChange={(e) => onChangeRegister({ password: e?.target?.value })}
              onKeyDown={(e) =>
                e?.key === "Enter" ? onRegisterTrigger() : null
              }
              placeholder="Password"
            />

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

          <div className="form-item mb-[15px]">
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              autoComplete="off"
              className={`form-control ${
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
              placeholder="Confirm Password"
            />

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
    </div>
  );
}
