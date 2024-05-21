import Link from "next/link";

export default function Announcements() {
  return (
    <div className="default-shadow bg-white mb-[15px] rounded-[5px] p-5">
      <div className="flex items-center gap-x-[5px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        <h2 className="font-bold text-black">Announcements</h2>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <div className="mt-3">
            <div className="text-[12px]">18 minutes ago</div>
            <div>
              Power Outage Report Looc locatha near lynlyn shop Purok gumamela
              Time received 6:24 pm Status: MECO team is on the way
            </div>
          </div>

          <div className="h-[1px] w-full bg-[#ddd] mt-3" />
        </div>
      ))}

      <div className="mt-3">
        <Link href="/announcements" className="underline text-[#041272]">
          View All
        </Link>
      </div>
    </div>
  );
}
