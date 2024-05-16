import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import store from "@/lib/store/persistentStore";
import globalState from "@/lib/store/globalState";
export default function Home() {
  const router = useRouter();
  const ready = globalState((state) => state.ready);
  const profile = store((state) => state.profile);

  useEffect(() => {
    globalState.setState({ ready: true });
  }, []);

  if (!profile) {
    if (ready) {
      router.push("/login");
      return <div>Loading</div>;
    }
  }

  return <div>{/* <h1>Welcome {profile.name}</h1> */}</div>;
}
