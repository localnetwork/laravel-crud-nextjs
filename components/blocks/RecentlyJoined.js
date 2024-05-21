// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import BaseApi from "@/lib/api/_base.api";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import avatarService from "@/lib/services/avatar";
import { useRouter } from "next/router";

export default function RecentlyJoined() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await BaseApi.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/users?limit=20&order=desc"
        );

        if (res.status === 200) {
          setUsers(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section>
      <div className="max-w-[1140px] mx-auto px-4 py-4">
        <h1 className="font-bold text-black my-5">Recently Joined</h1>

        <Swiper
          spaceBetween={10}
          slidesPerView={10}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          navigation={true}
          modules={[Navigation]}
        >
          {loading ? (
            <>
              {Array.from({ length: 11 }, (_, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center text-[12px] text-center cursor-pointer"
                >
                  <div className="animate-pulse rounded-full p-1 border-[#ddd] border w-[100px] h-[100px] flex ">
                    <div className=" w-full h-full bg-[#ddd] rounded-full" />
                  </div>
                  <div className="h-[18px] bg-[#ddd] animate-pulse mt-1 text-black max-w-[74px] text-ellipsis whitespace-nowrap overflow-x-hidden lowercase  mx-auto"></div>
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {users.map((user, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center text-[12px] text-center cursor-pointer"
                >
                  <div
                    className="rounded-full p-1 border-[#ddd] border w-[100px] h-[100px] flex"
                    onClick={() => {
                      router.push(`/user/${user.id}`);
                    }}
                  >
                    <div
                      className="avatar p-3 w-full h-full bg-[#ddd] rounded-full"
                      style={{
                        backgroundColor: avatarService.findColor(
                          user.avatar_color
                        ),
                      }}
                    >
                      {avatarService.findAvatar(user.avatar)}
                    </div>
                  </div>
                  <div className="mt-1 text-black max-w-[74px] text-ellipsis whitespace-nowrap overflow-x-hidden lowercase  mx-auto">
                    {user.name}
                  </div>
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </div>
    </section>
  );
}
