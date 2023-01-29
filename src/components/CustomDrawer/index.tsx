// material
import { Drawer } from "@mui/material";
// components
import { FC, ReactNode } from "react";

// ----------------------------------------------------------------------

interface IShopFilterSidebar {
  isOpen: boolean;
  onOpenFilter?: () => void;
  onCloseFilter: () => void;
  children: ReactNode;
}

const ShopFilterSidebar: FC<IShopFilterSidebar> = ({
  isOpen,
  onCloseFilter,
  children,
}) => {
  return (
    <>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={(e, raison) => raison !== "backdropClick" && onCloseFilter()}
        PaperProps={{
          sx: { width: 440, border: "none", overflow: "hidden" },
        }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default ShopFilterSidebar;
