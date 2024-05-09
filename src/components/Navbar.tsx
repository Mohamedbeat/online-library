"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SMnavigation from "./SMnavigation";
import { navbarItems } from "@/utils/NavbarItems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getSession, logout } from "@/utils/Lib";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavBar() {
  const [session, setSession] = React.useState<{
    payload: { name: string; id: number };
  } | null>(null);
  const rouetr = useRouter();

  const logOutFunc = async () => {
    await logout();
    setSession(null);
    rouetr.refresh();
  };

  React.useEffect(() => {
    const getSessionFunc = async () => {
      const res = await getSession();
      setSession(res);
      console.log(res);
    };
    getSessionFunc();
  }, []);
  return (
    // <div className="w-full max-w-7xl xl:bg-blue-900  flex items-center justify-center ">
    <div className=" w-full md:fixed bg-white/40 md:backdrop-blur-sm flex items-center justify-center md:block ">
      <div className=" px-4 w-full md:px-0 md:w-full  flex items-center justify-center py-2  rounded-lg border-b-[2px] border-slate-200 ">
        <div className="w-full max-w-7xl   flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={"/"} className="hidden md:block">
                  Online Library
                </Link>
                <Link href={"/"} className="block md:hidden">
                  O.L
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={"/profile"} className="cursor-pointer">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Articls
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Categories
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
          <NavigationMenu className="hidden md:flex ">
            <NavigationMenuList className="w-full flex items-center justify-between">
              {navbarItems.map((item) => {
                return (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:block">
                <div className="hidden md:flex w-[30px] h-[30px] capitalize  items-center justify-center bg-blue-300 rounded-full">
                  {session?.payload?.name.charAt(0) || "U"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {session && (
                  <DropdownMenuLabel>
                    {session?.payload?.name}
                  </DropdownMenuLabel>
                )}
                <DropdownMenuSeparator />
                {session && (
                  <DropdownMenuItem
                    className="cursor-pointer "
                    onClick={() =>
                      rouetr.push(`/profile/${session.payload.id}`)
                    }
                  >
                    {/* <Link href={`profile/${session.payload.id}`}>Profile</Link> */}
                    Profile
                  </DropdownMenuItem>
                )}

                {session && (
                  <DropdownMenuItem
                    onClick={logOutFunc}
                    className="text-red-700 hover:text-white hover:bg-red-700 cursor-pointer"
                  >
                    Logout
                    {/* <Button variant={"destructive"}>Logout</Button> */}
                  </DropdownMenuItem>
                )}
                {!session && (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => rouetr.push("/login")}
                  >
                    Login
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="md:hidden">
              <SMnavigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// export default function NavBar() {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                     href="/"
//                   >
//                     {/* <Icons.logo className="h-6 w-6" /> */}
//                     <div className="mb-2 mt-4 text-lg font-medium">
//                       shadcn/ui
//                     </div>
//                     <p className="text-sm leading-tight text-muted-foreground">
//                       Beautifully designed components built with Radix UI and
//                       Tailwind CSS.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {components.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <Link href="/docs" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Documentation
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
