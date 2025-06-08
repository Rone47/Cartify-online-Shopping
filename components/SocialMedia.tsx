import {
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}
const socialLink = [
  {
    title: "YouTube",
    href: "https://www.youtube.com",
    icon: <FaYoutube className="w-5 h-5 text-gray-600" />,
  },
  {
    title: "Github",
    href: "https://github.com/Rone47",
    icon: <FaGithub className="w-5 h-5 text-gray-600" />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/byrone-aketch-701b95237/",
    icon: <FaLinkedin className="w-5 h-5 text-gray-600" />,
  },
  {
    title: "Facebook",
    href: "https://facebook.com",
    icon: <FaFacebook className="w-5 h-5 text-gray-600" />,
  },
  {
    title: "X",
    href: "https://twitter.com",
    icon: <BsTwitterX className="w-5 h-5 text-gray-600" />,
  },
  {
    title: "TikTok",
    href: "https://tiktok.com",
    icon: <FaTiktok className="w-5 h-5 text-gray-600" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                key={item?.title}
                target="_blank"
                rel="noopener noreferrer"
                href={item?.href}
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect",
                  iconClassName
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-darkColor font-semibold",
                tooltipClassName
              )}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
