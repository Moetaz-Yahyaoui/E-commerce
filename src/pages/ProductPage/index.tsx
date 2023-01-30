import { useContext } from "react";
import { ShopContext } from "~/contexts/ShopContext";
import ProductList from "./ProductList";

import { ReactComponent as Backcon } from "~/assets/icons/backIcon.svg";
import { ReactComponent as NextIcon } from "~/assets/icons/nextIcon.svg";

import styles from "./styles.module.scss";

export default function EcommerceShop() {
  const { onChangeData, products } = useContext(ShopContext);

  return (
    <>
      <div className={styles.container}>
        <ProductList />
        <div className={styles.pagination}>
          <div className={styles.paginationCircle}>
            <Backcon />
          </div>
          <div className={styles.paginationCircle}>1</div>
          <div className={styles.paginationCircle}>2</div>
          <div className={styles.paginationCircle}>...</div>
          <div className={styles.paginationCircle}>6</div>
          <div className={styles.paginationCircle}>7</div>
          <div className={styles.paginationCircle}>
            <NextIcon />
          </div>
        </div>
      </div>
    </>
  );
}
