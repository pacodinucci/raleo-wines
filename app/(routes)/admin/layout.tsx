"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

import Navbar from "../../../components/navbar";
import { Sidebar } from "../../../components/sidebar";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex w-1/6 flex-col inset-y-0">
        <Sidebar />
      </div>

      {/* Overlay and Sidebar for smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar} // Close sidebar when clicking outside
        >
          <motion.div
            initial={{ x: "100%" }} // Start off-screen (right)
            animate={{ x: "0%" }} // Slide in
            exit={{ x: "100%" }} // Slide out
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-3/4 bg-gray-800 z-50 shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click inside sidebar from closing it
          >
            <Sidebar />
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="md:px-4 pt-10 relative">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
