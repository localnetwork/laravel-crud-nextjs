import AccountSettingsMenu from "@/components/menus/AccountSettingsMenu";
import BaseApi from "@/lib/api/_base.api";
import useAuth from "@/lib/services/auth";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";
import { parseCookies } from "nookies";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const ress = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user", {
    headers: {
      Authorization: `Bearer ${cookies[TOKEN]}`,
    },
  });

  const userData = await ress.json();
  return { props: { userData } };
}

export default function Page({ userData }) {
  useAuth();
  return (
    <main className="mx-auto max-w-[1140px] py-[50px]">
      <div className="box-shadow rounded-[5px] p-5">
        <h1 className="font-bold text-[25px] mb-5">Account Settings</h1>
        <div className="flex flex-wrap mx-[-15px]">
          <AccountSettingsMenu />
          <div className="px-[15px] max-w-[75%] w-full">
            <form>
              <div className="form-item mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    updateForm.name.toString().length > 0 ? "active" : ""
                  } ${errors?.name && "!border-red-500"}`}
                  value={userData.name}
                />
                <label className="form-label">Email</label>
              </div>
              <div className="form-item mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={userData.name}
                />
                <label className="form-label">Current Password</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
