import Link from "next/link";

export default function AccountSettingsMenu() {
  const menuItems = [
    {
      name: "Profile Settings",
      href: "/settings/profile",
    },
    {
      name: "Account Settings",
      href: "/settings/account",
    },
    {
      name: "Password",
      href: "/settings/password",
    },
  ];
  return (
    <div className="max-w-[25%] w-full px-[15px]">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="block p-3 hover:bg-[#f0f0f0] rounded-[5px] transition-all"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
