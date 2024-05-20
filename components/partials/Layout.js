import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-[100vh]">
        <Header />
        <main className="grow">{children}</main>

        <Footer />
      </div>

      <ToastContainer />
    </>
  );
}
