import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Background from "../Components/Background";
import styles from "./Page.module.css";
import Header from "../Components/Header";
const ShopPage = () => {
  type Shop = {
    id: number;
    name: string;
    rating: number;
  };

  type Product = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    category_id: number;
    shop_id: number;
  };
  type Category = {
    id: number;
    name: string;
  };
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedShop, setSelectedShop] = useState<number | null>(null);

  // 🔹 отримати магазини
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shops`)
      .then((res) => res.json())
      .then((data) => setShops(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 отримати продукти (залежить від shop)
  useEffect(() => {
    let url = `${import.meta.env.VITE_API_URL}/products?page=${page}`;

    if (selectedShop) {
      url += `&shopId=${selectedShop}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [selectedShop, page]);
  const categoriesMap: Record<number, string> = Object.fromEntries(
    categories.map((c) => [c.id, c.name]),
  );
  type CartItem = {
    productId: number;
    quantity: number;
  };

  const addToCart = (productId: number) => {
    console.log("ADD", productId); // 👈
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <div className={styles.wrapper}>
      <Background />
      <Header />

      <div className="relative z-10 p-5 flex gap-6">
        {/* Sidebar */}
        <aside className="w-[25%] bg-white p-10 m-10 rounded-lg shadow-md">
          <h2 className="font-semibold mb-3">Магазини</h2>

          <ul className="flex flex-col gap-2">
            {/* кнопка "всі" */}
            <li
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                setSelectedShop(null);
                setPage(1);
              }}
            >
              All Shops
            </li>

            {shops.map((shop) => (
              <li
                key={shop.id}
                className="cursor-pointer hover:text-blue-500"
                onClick={() => {
                  setSelectedShop(shop.id);
                  setPage(1);
                }}
              >
                {shop.name} ⭐ {shop.rating}
              </li>
            ))}
          </ul>

          {/* <div className="mt-6">
            <h3 className="font-semibold mb-2">Filters</h3>
            <p className="text-gray-500">Soon...</p>
          </div> */}
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                title={product.name}
                category={categoriesMap[product.category_id] || "Loading..."}
                price={product.price}
                imageSrc={product.image_url}
                onAddToCart={() => addToCart(product.id)}
              />
            ))}
          </div>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
