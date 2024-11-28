"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  Plus,
  Settings,
  ShoppingBag,
  Package,
  User,
  LayoutDashboard,
  FileBox,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
      pro: false,
    },
    {
      icon: LayoutDashboard,
      href: "/admin",
      label: "Dashboard",
      pro: false,
    },
    {
      icon: ShoppingBag,
      href: "/admin/products",
      label: "Productos",
      pro: true,
    },
    {
      icon: Package,
      href: "/admin/orders",
      label: "Ordenes",
      pro: false,
    },
    {
      icon: User,
      href: "/admin/customers",
      label: "Clientes",
      pro: false,
    },
    {
      icon: FileBox,
      href: "/admin/stock",
      label: "Stock",
      pro: false,
    },
  ];

  const onNavigate = (url: string, pro: boolean) => {
    // TODO: Chaeck if pro

    return router.push(url);
  };

  return (
    <div className="space-y-4 w-full flex flex-col h-full text-primary bg-[#E8E1D0]">
      <div className="pt-6 flex justify-center">
        <Image
          src="/logorojo.png"
          alt="logo al este"
          width={100}
          height={100}
        />
      </div>
      <div className="py-3 flex flex-1">
        <div className="space-y-2 w-full">
          {routes.map((route) => (
            <div
              key={route.href}
              className={cn(
                "text-muted-foreground w-full text-xs group flex p-3 justify-start font-medium cursor-pointer hover:text-white hover:bg-primary/10 transition",
                pathname === route.href && "bg-primary/10 text-white"
              )}
              onClick={() => onNavigate(route.href, route.pro)}
            >
              <div className="flex gap-x-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
