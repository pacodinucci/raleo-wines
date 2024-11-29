import { mainNavigationOptions } from "@/lib/constants";
import { montserrat } from "@/lib/fonts";
import { useRouter } from "next/navigation";
import React from "react";

interface MainNavigationProps {
  subscriptionInView: boolean;
}

const MainNavigation = ({ subscriptionInView }: MainNavigationProps) => {
  const router = useRouter();
  console.log(subscriptionInView);

  return (
    <div>
      <ul className="flex gap-x-8">
        {mainNavigationOptions.map((option, index) => (
          <li
            key={index}
            className={`${montserrat.className} ${
              subscriptionInView ? "text-white" : "text-neutral-700"
            }  uppercase text-sm tracking-wide cursor-pointer transition-colors duration-500`}
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
