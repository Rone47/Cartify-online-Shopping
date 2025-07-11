"use client";

import { RxBorderSplit } from "react-icons/rx";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";

type QuickActionsProps = object;

const QuickActions: React.FC<QuickActionsProps> = () => {
  const actions = [
    {
      icon: <RxBorderSplit className="text-lg" />,
      label: "Compare Color",
      href: "#compare-color",
    },
    {
      icon: <FaRegQuestionCircle className="text-lg" />,
      label: "Ask a Question",
      href: "#ask-question",
    },
    {
      icon: <TbTruckDelivery className="text-lg" />,
      label: "Delivery & Return",
      href: "#delivery-return",
    },
    {
      icon: <FiShare2 className="text-lg" />,
      label: "Share",
      href: "#share",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:flex items-center justify-between gap-4 border-b border-gray-200 py-5">
      {actions.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition duration-200 cursor-pointer"
        >
          {item.icon}
          <p>{item.label}</p>
        </a>
      ))}
    </div>
  );
};

export default QuickActions;
