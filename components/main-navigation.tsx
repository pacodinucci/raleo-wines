import { mainNavigationOptions } from "@/lib/constants";
import { montserrat } from "@/lib/fonts";
import { useRouter } from "next/navigation";
import React from "react";

const MainNavigation = () => {
  const router = useRouter();
  return (
    <div>
      <ul className="flex gap-x-8">
        {mainNavigationOptions.map((option, index) => (
          <li
            key={index}
            className={`${montserrat.className} text-neutral-700 uppercase text-sm tracking-wide cursor-pointer`}
            onClick={() => router.push(option.link)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainNavigation;
