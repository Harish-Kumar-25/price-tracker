import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Annoyed, ListFilter } from "lucide-react";
import { ModeToggle } from "./ToggleMode";

function Navbar() {
  const navList = [
    { name: "Home", src: "/" },
    { name: "About", src: "/about" },
    { name: "Contact", src: "/contact" },
  ];

  return (
    <header>
      <nav className="">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <ListFilter />
                  </MenubarTrigger>
                  <MenubarContent>
                    {navList.map((item) => (
                      <Link key={item.name} href={item.src}>
                        <MenubarItem className="  hover:text-white mt-2 rounded-md px-3 py-2 text-sm font-medium">
                          {item.name}
                        </MenubarItem>
                      </Link>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <div className=" flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
              <div className="flex flex-shrink-0  items-center">
                <Image
                  className="h-10 mr-3  w-auto"
                  src="/ghost.png"
                  alt="Yy"
                  width={20}
                  height={20}
                />
                <h1 className="text-transparent bg-clip-text bg-gradient-to-t from-[#fa6f6f]   to-[#e60707] font-extrabold text-2xl ">
                  Price Tracker
                </h1>
              </div>
              <div className="hidden items-center px-64 sm:ml-6 sm:block">
                <div className="flex  space-x-8">
                  {navList.map((item) => (
                    <Link
                      href={item.src}
                      key={item.name}
                      className=" hover:bg-primary hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
