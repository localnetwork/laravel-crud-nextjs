import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import store from "@/lib/store/persistentStore";
import { useRouter } from "next/router";
import globalState from "@/lib/store/globalState";
export default function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const profile = store((state) => state.profile);
  const ready = globalState((state) => state.ready);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        formData
      );
      if (res.status == 200) {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        store.setState({ profile: res.data.user });
        router.push("/");
      }
    } catch (error) {
      if (error?.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      if (error?.response?.data?.message) {
        setErrors(error.response.data);
      }
      setIsLoading(false);
    }
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

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="form-item mb-[15px]">
            <input
              id="email"
              className={`form-control ${
                errors?.message?.toString().length > 0 ||
                (errors?.email && "!border-red-500")
              }`}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors?.message?.toString().length > 0 && (
              <span className="text-red-500 text-[13px] mt-[5px] block">
                {errors?.message?.toString()}
              </span>
            )}
            {errors && errors?.email && (
              <>
                {errors?.email.map((item, index) => (
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
              className={`form-control ${
                errors?.message?.toString().length > 0 ||
                (errors?.password && "!border-red-500")
              }`}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors?.message?.toString().length > 0 && (
              <span className="text-red-500 text-[13px] mt-[5px] block">
                {errors?.message?.toString()}
              </span>
            )}
            {errors && errors?.password && (
              <>
                {errors?.password.map((item, index) => (
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

              {isLoading ? "Please Wait..." : "Log in"}
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
