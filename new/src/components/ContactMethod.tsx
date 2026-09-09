import React from "react";

interface ContactMethodProps {
  icon: string;
  text: string;
  href?: string;
}

const ContactMethod: React.FC<ContactMethodProps> = ({ icon, text, href }) => {
  const content = (
    <>
      <div className="w-6 h-6 lg:w-8 lg:h-8 relative flex-shrink-0">
        <img src={icon} className="w-full h-full object-contain" alt="" />
      </div>
      <span className="text-[#abb2bf] text-sm lg:text-base break-all group-hover:text-white transition-colors">
        {text}
      </span>
    </>
  );

  if (!href) {
    return <div className="flex items-center gap-[5px]">{content}</div>;
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex items-center gap-[5px]"
    >
      {content}
    </a>
  );
};

export default ContactMethod;
