export default function Footer() {
  return (
    <footer className="bg-white py-3 text-center mt-5 text-[#333] text-[12px]">
      <div className="max-w-[1140px] mx-auto">
        &copy; {new Date().getFullYear()} All Rights Reserved. Cordova Public
        College
      </div>
    </footer>
  );
}
