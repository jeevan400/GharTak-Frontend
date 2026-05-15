import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white mx-4 p-4 rounded-lg border border-red-900/25 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, icon, title, className }) => {
  return (
    <div className={`flex justify-between pb-4 ${className}`}>
      <div className="flex gap-4 text-red-900">
        {icon}
        <h1 className="text-md font-semibold text-black">{title}</h1>
      </div>

        {children}

    </div>
  );
};

const CardBody = ({ children, className }) => {
  return <div className={`${className}`}>{children}</div>;
};

const CardFooter = ({ children, className }) => {
  return <div className={`${className}`}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
