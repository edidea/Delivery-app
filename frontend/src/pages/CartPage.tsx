import { useEffect, useState } from "react";
import Header from "../Components/Header";
import styles from "./Page.module.css";
import Background from "../Components/Background";

type CartItem = {
  productId: number;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  stock_quantity: number;
};

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      address: "",
    };

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{7,15}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  // load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // fetch products
  useEffect(() => {
    if (cart.length === 0) {
      setProducts([]);
      return;
    }

    const ids = cart.map((item) => item.productId).join(",");

    fetch(`${import.meta.env.VITE_API_URL}/products/products-by-ids?ids=${ids}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [cart]);

  const updateQuantity = (productId: number, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const safeQuantity = Math.max(
      1,
      Math.min(quantity, product.stock_quantity),
    );

    const updated = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: safeQuantity } : item,
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (productId: number) => {
    const updated = cart.filter((item) => item.productId !== productId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = products.reduce((sum, product) => {
    const item = cart.find((c) => c.productId === product.id);
    return sum + product.price * (item?.quantity || 0);
  }, 0);

  const handleBuy = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: form,
          items: cart,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Order failed");
      }

      // clear cart
      localStorage.removeItem("cart");
      setCart([]);
      setProducts([]);

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      setSuccess("Order successfully created!");
    } catch (error) {
      console.error(error);
      setSuccess("Error creating order");
    }
  };

  return (
    <div className={styles.wrapper}>
      <Background />
      <Header />

      <div className="relative z-10 p-5 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cart</h1>

        {success && (
          <p className="mb-4 text-green-600 font-semibold">{success}</p>
        )}

        <div className="flex flex-col gap-4 mb-8">
          {cart.length === 0 && (
            <p className="text-center text-gray-500">Cart is empty</p>
          )}

          {cart.length > 0 &&
            products.map((product) => {
              const item = cart.find((c) => c.productId === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p>{product.price} UAH</p>
                    <p className="text-sm text-gray-500">
                      In stock: {product.stock_quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, (item?.quantity || 1) - 1)
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item?.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(product.id, (item?.quantity || 1) + 1)
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>

        {cart.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-6">
              Total: {total.toFixed(2)} UAH
            </h2>

            <div className="grid gap-3 mb-6">
              <input
                placeholder="Name"
                className={`border p-2 rounded ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              <input
                placeholder="Email"
                className={`border p-2 rounded ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <input
                placeholder="Phone"
                className={`border p-2 rounded ${
                  errors.phone ? "border-red-500" : ""
                }`}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}

              <input
                placeholder="Address"
                className={`border p-2 rounded ${
                  errors.address ? "border-red-500" : ""
                }`}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <button
              onClick={handleBuy}
              className="w-full bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-800"
            >
              Buy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
