import React from "react";

type CardProps = {
  title: string;
  category: string;
  price: number;
  imageSrc: string;
};

const Card: React.FC<CardProps> = ({ title, category, price, imageSrc }) => {
  return (
    <div className="w-64 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">
      {/* Image */}
      <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src={imageSrc}
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <span className="text-lg font-semibold text-gray-800">{title}</span>

        <span className="text-sm text-gray-500">{category}</span>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-green-600">{price} грн</span>

          <button className="px-3 py-1 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Купити
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
