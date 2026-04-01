import Header from "../Components/Header";
import styles from "./Page.module.css";
import Background from "../Components/Background";

const CouponsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Background />
      <Header />
      <h1 className="text-2xl font-bold">Купони</h1>
      <img src="images/Breakfast.jpg" alt="сніданок" />
    </div>
  );
};

export default CouponsPage;
