"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { SearchInput } from "../components/ui/search-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Image from "next/image";
import { FiUser, FiSettings } from "react-icons/fi";
import { PiSignOutBold } from "react-icons/pi";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const user = session.data?.user;

  console.log(user);

  const handleSignOut = async () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="flex justify-between items-center py-2 px-4 bg-slate-50 text-white relative">
      {/* Search bar */}
      <div className="w-full flex items-center gap-x-2">
        <Search className="text-slate-500" />
        <SearchInput
          placeholder="Buscar productos, ordenes, etc..."
          className="w-full bg-transparent border-none outline-none text-slate-500 focus:ring-0 focus:border-transparent focus:outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex gap-x-4 items-center relative px-4">
        <Bell className="text-slate-700" size={20} />
        {user && (
          <Popover>
            <PopoverTrigger className="text-neutral-700">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.image || "/avatar.jpg"}
                  alt={user.name || "Usuario genérico"}
                />
                <AvatarFallback>{user.name?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandList>
                  <div className="flex items-center py-2">
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage
                        src={user.image || "/avatar.jpg"}
                        alt={user.name || "Usuario genérico"}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                      <p className="px-2 font-semibold text-sm">{user.name}</p>
                      <p
                        className="px-2 text-xs truncate overflow-hidden whitespace-nowrap"
                        style={{ maxWidth: "150px" }}
                      >
                        {user.email || "Correo no disponible"}
                      </p>
                    </div>
                  </div>
                  <CommandSeparator />
                  <CommandGroup heading="Opciones">
                    <CommandItem className="flex gap-2 items-center">
                      <FiUser />
                      <p>Perfil</p>
                    </CommandItem>
                    <CommandItem className="flex gap-2 items-center">
                      <FiSettings />
                      <p>Configuración</p>
                    </CommandItem>
                    <CommandItem className="flex gap-2 items-center">
                      <PiSignOutBold />
                      <p onClick={handleSignOut}>Cerrar Sesión</p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
