import store from "@/lib/store/persistentStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import AUTHAPI from "@/lib/api/auth/request";
export default function Header() {
  const profile = store((state) => state.profile);
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
          <div className="flex items-center gap-x-[15px]">
            <Link href="/">Dashboard</Link>
            <Link href="/profile">Profile</Link>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        </div>
      </header>
    );
  }
}
