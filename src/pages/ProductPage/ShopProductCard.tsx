import React, { FC, useCallback, useState } from "react";
// material
import { CardMedia, Box } from "@mui/material";
// components
import styles from "./styles.module.scss";

import { ReactComponent as CartIcon } from "~/assets/icons/CartWheel.svg";
import Modal from "./Modal";

const ShopProductCard: FC<any> = ({ product }: { product: any }) => {
  const { productname, productimgurl, category, customerprice, sku } = product;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <Modal open={isOpen} onClose={handleClose} />
      <div className={styles.card}>
        <Box sx={{ height: "150px" }}>
          <CardMedia
            component="img"
            height="140"
            image={productimgurl || "/static/image/Pas-dimage-disponible.jpg"}
            alt="Product Image"
            sx={{ height: "100%" }}
          />
        </Box>
        <div className={styles.cardDetailContainer}>
          <p className={styles.cardName}>{productname}</p>
          <p className={styles.cardCategory}>{category}</p>

          <div className={styles.cardBtnContainer}>
            <div>
              <p className={styles.cardPrice}>$ {customerprice}</p>
              <p className={styles.cardSku}>{sku}</p>
            </div>
            <div onClick={handleOpen} className={styles.cardIconContainer}>
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopProductCard;
