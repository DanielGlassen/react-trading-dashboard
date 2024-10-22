import React from "react";
import classNames from "classnames";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        'max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
