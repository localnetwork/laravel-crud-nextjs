import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
export default function RecentlyJoined() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <section>
      <div className="max-w-[1140px] mx-auto px-4 py-4">
        <h1 className="font-bold text-black">Recently Joined</h1>

        <Slider {...settings}>
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-x-[10px] mt-[20px]"
            >
              <div className="bg-[#1ed760] text-black p-[15px] rounded-full w-[50px] h-[50px] flex items-center justify-center">
                A
              </div>
              <div>
                <h2 className="text-lg font-bold">John Doe</h2>
                <p>Joined 2 days ago</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
