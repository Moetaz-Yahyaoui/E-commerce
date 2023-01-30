import * as React from "react";

import { ReactComponent as LogoutIcon } from "~/assets/icons/logout.svg";

import styles from "./styles.module.scss";

const NavBar: React.FC = () => {
  return (
    <div className={styles.StyledNavBar}>
      <div className={styles.headersContainer}>
        <p className={styles.headers}>Про нас</p>
        <p className={styles.headers}>Каталог</p>
        <p className={styles.headers}>продукції</p>
        <p className={styles.headers}>Оплата і доставка</p>
        <p className={styles.headers}>Партнери</p>
        <p className={styles.headers}>Новини</p>
        <p className={styles.headers}>Контакти</p>
        <div className={styles.logoutContainer}>
          <LogoutIcon />
          <p className={styles.headers}>Вхід | Реестрація</p>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
