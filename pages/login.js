import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import store from "@/lib/store/persistentStore";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import globalState from "@/lib/store/globalState";
import authStore from "@/lib/store/auth";
export default function Login() {
  const [loginForm, onChangeLogin, onLogin, loginError, submissionLoading] =
    authStore(
      (state) => [
        state.loginForm,
        state.onChangeLogin,
        state.onLogin,
        state.loginError,
        state.submissionLoading,
      ],
      shallow
    );

  const router = useRouter();
  const profile = store((state) => state.profile);
  const ready = globalState((state) => state.ready);

  const onLoginTrigger = (e) => {
    e.preventDefault();

    try {
      const res = onLogin();
    } catch (err) {
      console.error("Error", err);
    }
    // onLogin()
    //   .then(() => {
    //     // window.location.href = route;
    //     console.log("then");
    //     router.push("/");
    //   })
    //   .catch(() => {});
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
          Login Portal
        </h1>

        {loginError?.message && (
          <p className="bg-[#ffeaea] py-[10px] px-[15px] text-red-500 border-red-100 border text-[13px] mb-[30px] text-center block">
            {loginError?.message}
          </p>
        )}

        <form className="flex flex-col" onSubmit={onLoginTrigger}>
          <div className="form-item mb-[15px]">
            <input
              id="email"
              className={`form-control ${
                loginError?.message?.toString().length > 0 ||
                (loginError?.email && "!border-red-500")
              }`}
              type="text"
              name="email"
              value={loginForm.email}
              onChange={(e) => onChangeLogin({ email: e?.target?.value })}
              onKeyDown={(e) => (e?.key === "Enter" ? onLoginTrigger() : null)}
              placeholder="Email"
            />

            {loginError && loginError?.email && (
              <>
                {loginError?.email.map((item, index) => (
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
              className={`form-control ${
                loginError?.message?.toString().length > 0 ||
                (loginError?.password && "!border-red-500")
              }`}
              value={loginForm.password}
              onChange={(e) => onChangeLogin({ password: e?.target?.value })}
              onKeyDown={(e) => (e?.key === "Enter" ? onLoginTrigger() : null)}
              placeholder="Password"
            />

            {loginError && loginError?.password && (
              <>
                {loginError?.password.map((item, index) => (
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

              {submissionLoading ? "Please Wait..." : "Log in"}
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
            <span className="text-[#727272]">{"Don't have an account?"}</span>{" "}
            <Link href="/register" className="underline hover:text-[#041272]">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
