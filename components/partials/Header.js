import store from "@/lib/store/persistentStore";
import Link from "next/link";

export default function Header() {
  const profile = store((state) => state.profile);
  if (profile) {
    return (
      <header>
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/logout">Logout</Link>
      </header>
    );
  }
}
