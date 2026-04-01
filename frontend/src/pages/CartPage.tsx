import Header from "../Components/Header";
import styles from "./Page.module.css";
import Background from "../Components/Background";

const CartPage = () => {
  return (
    <div className={styles.wrapper}>
      <Background />
      <Header />
      <h1 className="text-2xl font-bold">Кошик</h1>
    </div>
  );
};

export default CartPage;
