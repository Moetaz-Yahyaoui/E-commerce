import { ReactComponent as LeftLeafIcon } from "~/assets/icons/leftLeaf.svg";
import { ReactComponent as RightLeafIcon } from "~/assets/icons/rightLeaf.svg";
import { ReactComponent as PlusIcon } from "~/assets/icons/plus.svg";
import { ReactComponent as MinesIcon } from "~/assets/icons/mines.svg";
import { ReactComponent as CartWheel } from "~/assets/icons/CartWheel.svg";
import { ReactComponent as DocumentIcon } from "~/assets/icons/document.svg";

import styles from "./styles.module.scss";

export default function Modal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      style={{ display: open ? "block" : "none" }}
      className={styles.container}
    >
      <div className={styles.headerContainer}>
        <LeftLeafIcon />
        Кошик
        <RightLeafIcon />
      </div>
      <div className={styles.content}>
        <p className={styles.productName}>Гербіцид Комманд®, ФМС УКРАЇНА</p>
        <div className={styles.details}>
          <div className={styles.detailContainer}>
            <div className={styles.imageContainer}>
              <img src="/static/image/product1.png" alt="Product X" />
            </div>
            <div className={styles.detailTextContainer}>
              <p className={styles.text1}>7814,63 грн</p>
              <p className={styles.text3}>Ціна за 5 л </p>
              <p className={styles.text4}>Виробник</p>
              <p className={styles.text5}>ФМС Украина</p>
            </div>
          </div>
          <div className={styles.detailTextContainer}>
            <div className={styles.select}>Канистра 5 л</div>
            <div className={styles.qtyContainer}>
              <p>Кількість</p>
              <MinesIcon />
              <div className={styles.quantity}>1</div>
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.Btn} onClick={onClose}>
          <CartWheel />
          Продовжити покупки
        </div>
        <div className={styles.Btn}>
          <DocumentIcon /> Оформити заказ
        </div>
      </div>
    </div>
  );
}
