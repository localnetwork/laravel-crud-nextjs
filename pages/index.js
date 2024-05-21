import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import store from "@/lib/store/persistentStore";
import globalState from "@/lib/store/globalState";
import RecentlyJoined from "@/components/blocks/RecentlyJoined";
import FeedBlock from "@/components/blocks/FeedBlock";
import Announcements from "@/components/blocks/Announcements";
import useAuth from "@/lib/services/auth";
export default function Home() {
  useAuth();
  const profile = store((state) => state.profile);

  useEffect(() => {
    globalState.setState({ ready: true });
  }, []);

  return (
    <div>
      <RecentlyJoined />
      <div className="max-w-[1140px] mx-auto px-4 py-4">
        <div className="flex gap-x-[15px]">
          <div className="max-w-[60%] w-full">
            <FeedBlock />
          </div>
          <div className="max-w-[40%] w-full">
            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );
}
