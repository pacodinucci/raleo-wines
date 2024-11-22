"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

import Navbar from "../../../components/navbar";
import { Sidebar } from "../../../components/sidebar";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 h-screen bg-slate-900">
        <Image
          src="/logosinfondo.png"
          alt="logo halmacen"
          width={150}
          height={0}
        />
        <div className="text-white text-xl">
          <BarLoader color="#ffffff" />
        </div>{" "}
        {/* Aquí puedes agregar tu spinner de carga */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/6 flex-col inset-y-0">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        <main className="md:pl-10 md:pr-8 pt-10 relative">
          {/* <Toaster richColors /> */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
