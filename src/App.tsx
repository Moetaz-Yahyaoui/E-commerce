import React from "react";
import { BrowserRouter } from "react-router-dom";
import RenderRouter from "./routes";
import ThemeProvider from "~/theme/ThemeProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ShopProvider } from "./contexts/ShopContext";

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider>
        <BrowserRouter>
          <ShopProvider>
            <RenderRouter />
          </ShopProvider>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
