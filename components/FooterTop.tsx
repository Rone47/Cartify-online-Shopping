import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string[]; // Multiple lines
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: ["Central Business Disrict, Nairobi", " Or visit any of our branches across the globe"],
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: ["+254 719 174 450"],
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: [
      "Mon - Sat: 07:00 AM - 9:00 PM",
      "Sunday & Public Holidays: Closed",
      "Available 24/7 via our website or live chat",
    ],
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: ["cartify@gmail.com", "ryanbyrone47@gmail.com"],
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 group hover:bg-gray-50 p-4 transition-colors hoverEffect"
        >
          {item.icon}
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-black hoverEffect">
              {item.title}
            </h3>
            {item.subtitle.map((line, i) => (
              <p
                key={i}
                className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 hoverEffect"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
