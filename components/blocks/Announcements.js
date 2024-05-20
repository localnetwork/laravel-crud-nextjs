import Link from "next/link";

export default function Announcements() {
  return (
    <div className="default-shadow bg-white mb-[15px] rounded-[5px] p-5">
      <h2 className="font-bold text-black">Announcements</h2>
      {Array.from({ length: 5 }).map((_, index) => (
        <>
          <div key={index} className="mt-3">
            <div className="text-[12px]">18 minutes ago</div>
            <div>
              Power Outage Report Looc locatha near lynlyn shop Purok gumamela
              Time received 6:24 pm Status: MECO team is on the way
            </div>
          </div>

          <div className="h-[1px] w-full bg-[#ddd] mt-3" />
        </>
      ))}

      <div className="mt-3">
        <Link href="/announcements" className="underline text-[#041272]">
          View All
        </Link>
      </div>
    </div>
  );
}
