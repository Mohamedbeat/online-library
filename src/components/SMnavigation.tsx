"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navbarItems } from "@/utils/NavbarItems";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { getSession, logout } from "@/utils/Lib";
import { useRouter } from "next/navigation";

function SMnavigation() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<any | null>();
  useEffect(() => {
    const getSessionFunc = async () => {
      const res = await getSession();
      setSession(res);
      console.log(res);
    };
    getSessionFunc();
  }, []);

  const logOutFunc = async () => {
    await logout();
    setMenuOpen(false);
    setSession(null);
  };
  return (
    <div>
      <div className="px-1 cursor-pointer hover:bg-slate-200 rounded-md transition-all duration-200">
        <Menu onClick={() => setMenuOpen(!menuOpen)} />
      </div>
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center flex-col bg-white">
          <div
            className="absolute top-2 right-0 cursor-pointer px-1  hover:bg-slate-200 rounded-md transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            <X />
          </div>
          <NavigationMenu>
            <NavigationMenuList className=" flex-col">
              {session && (
                <NavigationMenuItem className=" py-2 border-b-[2px] border-slate-200 w-full text-center">
                  {session?.payload?.name}
                </NavigationMenuItem>
              )}
              {navbarItems.map((item) => {
                return (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} onClick={() => setMenuOpen(false)}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}

              {session && (
                <>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${session.payload.id}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Profile
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem onClick={logOutFunc}>
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() +
                        " cursor-pointer text-red-700"
                      }
                    >
                      Logout
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
              {!session && (
                <NavigationMenuItem onClick={() => router.push("/login")}>
                  <NavigationMenuLink
                    className={
                      navigationMenuTriggerStyle() + " cursor-pointer "
                    }
                  >
                    Login
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
}

export default SMnavigation;
