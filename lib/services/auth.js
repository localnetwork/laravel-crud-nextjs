import { parseCookies, setCookie } from "nookies";
import store from "../store/persistentStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";

const useAuth = () => {
  const cookies = parseCookies();
  const token = cookies[TOKEN];
  const profile = store((state) => state.profile);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const ready = store((state) => state.ready);

  useEffect(() => {
    if (!token) {
      store.setState({ profile: null });
      setCookie(null, TOKEN, "", { maxAge: 0 });
      router.push("/login");
    }
  }, [router, token]);
};

export default useAuth;
