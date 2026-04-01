import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Background from "../Components/Background";
import styles from "./Page.module.css";
import Header from "../Components/Header";
const ShopPage = () => {
  return (
    <div className={styles.wrapper}>
      <Background />
      <Header />
      <div className="relative z-10 p-5 flex gap-6">
        {/* Sidebar */}
        <aside className="w-[25%] bg-white p-10 m-10 rounded-lg shadow-md">
          {" "}
          <h2 className="font-semibold mb-3">Магазини</h2>
          <ul className="flex flex-col gap-2 ">
            <li>Магазин 1</li>
            <li>Магазин 2</li>
          </ul>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Фільтри</h3>
            <p className="text-gray-500">Скоро...</p>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* <h1 className="text-xl font-medium mb-4">Товари</h1> */}

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                title="Круасани"
                category="Солодощі"
                price={100}
                imageSrc="https://milkalliance.com.ua/blog/media/k2/items/cache/3a9fdfdb8b1a460a423baa85a1a46274_M.jpg"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
