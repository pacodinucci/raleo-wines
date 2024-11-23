import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E8E1D0] to-[#dfdcd4]">
      {children}
    </div>
  );
};

export default AuthLayout;
