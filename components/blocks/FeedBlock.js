import Image from "next/image";
import store from "@/lib/store/persistentStore";
import avatarService from "@/lib/services/avatar";
import BaseApi from "@/lib/api/_base.api";
import { useEffect, useState } from "react";
import globalState from "@/lib/store/globalState";
import { timeAgo } from "@/lib/services/globalService";
import PostCreate from "../forms/PostCreate";
import usePostStore from "@/lib/store/PostState";
import Link from "next/link";
import { useRouter } from "next/router";
export default function FeedBlock() {
  const profile = store((state) => state.profile);
  const posts = usePostStore((state) => state.posts);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <PostCreate />
      <div className="default-shadow bg-white mb-[15px] rounded-[5px] p-5">
        <div>
          <div className="flex gap-x-[15px]">
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
              className="select-none rounded-full px-[15px] py-[10px] flex items-center text-[#828282] hover:bg-[#ebebeb] cursor-pointer bg-[#F0F2F5] max-w-[calc(100% - 50px)] w-full"
              onClick={() => {
                globalState.setState({ postCreateModal: true });
              }}
            >
              {`What's on your mind?`}
            </div>
          </div>
        </div>
      </div>

      {posts.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              router.push(`/posts/${item?.id}`);
            }}
            className="default-shadow cursor-pointer bg-white mb-[15px] rounded-[5px] p-5"
          >
            <div className="flex items-center gap-x-[10px]">
              <div className="flex gap-x-[15px]">
                {/* <div className="w-[50px] h-[50px] bg-[#ddd] rounded-full" /> */}
                <Link href={`/user/${item?.user?.id}`}>
                  <div
                    className="cursor-pointer text-[#333] inline-block rounded-full w-[50px] h-[50px] flex items-center justify-center p-[5px]"
                    style={{
                      backgroundColor: avatarService.findColor(
                        item?.user?.avatar_color
                      ),
                    }}
                  >
                    {avatarService.findAvatar(item?.user?.avatar)}
                  </div>
                </Link>
                <div>
                  <div className="">{item?.user?.name}</div>
                  <div className="text-[12px]">{timeAgo(item?.created_at)}</div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="font-bold">{item?.title}</div>
              {item?.content}
            </div>
          </div>
        );
      })}
    </>
  );
}
