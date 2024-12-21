"use client";

import { useState } from "react";
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
  Receipt,
  ChevronRight,
  Clipboard,
  ClipboardList,
  Wine,
  Box,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false); // Estado para Productos

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
      href: null,
      label: "Productos", // Ahora es un menú desplegable
      pro: true,
      submenu: [
        {
          href: "/admin/products",
          label: "Vinos",
          icon: Wine,
        },
        {
          href: "/admin/boxes",
          label: "Cajas",
          icon: Box,
        },
      ],
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
      icon: Receipt,
      href: null,
      label: "Reportes",
      pro: false,
      submenu: [
        {
          href: "/admin/reports/packingbill",
          label: "Remitos",
          icon: Clipboard,
        },
        {
          href: "/admin/reports/bills",
          label: "Facturas",
          icon: ClipboardList,
        },
      ],
    },
    {
      icon: FileBox,
      href: "/admin/stock",
      label: "Stock",
      pro: false,
    },
  ];

  const onNavigate = (url: string, pro: boolean) => {
    // TODO: Check if pro
    if (url) {
      return router.push(url);
    }
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
            <div key={route.label}>
              <div
                className={cn(
                  "text-muted-foreground w-full text-xs group flex p-3 justify-between font-medium cursor-pointer hover:text-white hover:bg-primary/10 transition",
                  pathname === route.href && "bg-primary/10 text-white"
                )}
                onClick={() =>
                  route.submenu
                    ? route.label === "Reportes"
                      ? setIsReportsOpen((prev) => !prev)
                      : setIsProductsOpen((prev) => !prev)
                    : onNavigate(route.href, route.pro)
                }
              >
                <div className="flex gap-x-2 items-center flex-1">
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </div>
                {route.submenu && (
                  <motion.div
                    initial={{
                      rotate:
                        route.label === "Reportes"
                          ? isReportsOpen
                            ? 0
                            : 90
                          : isProductsOpen
                          ? 0
                          : 90,
                    }}
                    animate={{
                      rotate:
                        route.label === "Reportes"
                          ? isReportsOpen
                            ? 90
                            : 0
                          : isProductsOpen
                          ? 90
                          : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                )}
              </div>

              {/* Submenu para Reportes y Productos */}
              <AnimatePresence>
                {route.submenu &&
                  ((route.label === "Reportes" && isReportsOpen) ||
                    (route.label === "Productos" && isProductsOpen)) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {route.submenu.map((submenu) => (
                        <div
                          key={submenu.href}
                          className={cn(
                            "text-muted-foreground w-full text-xs group flex mx-5 p-3 pl-8 justify-start font-medium cursor-pointer bg-white/20 border-l border-neutral-300 hover:text-white hover:bg-primary/10 transition",
                            pathname === submenu.href &&
                              "bg-primary/10 text-white"
                          )}
                          onClick={() => onNavigate(submenu.href, route.pro)}
                        >
                          <submenu.icon className="h-4 w-4 mr-2" />
                          {submenu.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
