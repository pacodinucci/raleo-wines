import { poppins } from "@/lib/fonts";
import Image from "next/image";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {/* <h1 className={`${poppins.className} text-3xl font-semibold`}>🔐 Auth</h1> */}
      <Image src="/logorojo.png" alt="logo h almacen" width={150} height={0} />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
