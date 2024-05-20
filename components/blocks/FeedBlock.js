import Image from "next/image";
import store from "@/lib/store/persistentStore";
import avatarService from "@/lib/services/avatar";
import BaseApi from "@/lib/api/_base.api";
import { useEffect, useState } from "react";
import globalState from "@/lib/store/globalState";
import { timeAgo } from "@/lib/services/globalService";
import PostCreate from "../forms/PostCreate";
export default function FeedBlock() {
  const profile = store((state) => state.profile);

  const [isLoading, setIsLoading] = useState(false);

  const posts = globalState((state) => state.posts);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await BaseApi.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/posts"
        );

        if (res.status == 200) {
          globalState.setState({ posts: res.data.data });
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PostCreate />
      <div class="default-shadow bg-white mb-[15px] rounded-[5px] p-5">
        <div>
          <div class="flex gap-x-[15px]">
            <div>
              <div
                className="cursor-pointer text-[#333] inline-block rounded-full w-[50px] h-[50px] flex items-center justify-center p-[5px]"
                style={{
                  backgroundColor: avatarService.findColor(
                    profile?.avatar_color
                  ),
                }}
              >
                {avatarService.findAvatar(profile?.avatar)}
              </div>
            </div>
            <div
              class="select-none rounded-full px-[15px] py-[10px] flex items-center text-[#828282] hover:bg-[#ebebeb] cursor-pointer bg-[#F0F2F5] max-w-[calc(100% - 50px)] w-full"
              onClick={() => {
                globalState.setState({ postCreate: true });
              }}
            >
              {`What's on your mind?`}
            </div>
          </div>
        </div>
      </div>

      {posts.map((item, index) => (
        <div
          key={index}
          className="default-shadow bg-white mb-[15px] rounded-[5px] p-5"
        >
          <div className="flex items-center gap-x-[10px]">
            <div className="flex gap-x-[15px]">
              {/* <div className="w-[50px] h-[50px] bg-[#ddd] rounded-full" /> */}
              <div
                className="cursor-pointer text-[#333] inline-block rounded-full w-[50px] h-[50px] flex items-center justify-center p-[5px]"
                style={{
                  backgroundColor: avatarService.findColor(
                    item?.user.avatar_color
                  ),
                }}
              >
                {avatarService.findAvatar(item?.user.avatar)}
              </div>
              <div>
                <div className="">{item?.user.name}</div>
                <div className="text-[12px]">{timeAgo(item.created_at)}</div>
              </div>
            </div>
          </div>
          <div className="mt-3">{item?.content}</div>
        </div>
      ))}
    </>
  );
}
