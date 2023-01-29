// @mui
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Theme, ButtonBase } from "@mui/material";
// utils
import { fShortenNumber } from "~/shared";
// components
import Iconify from "@components/Iconify";
// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

enum EColor {
  info = "info",
  primary = "info",
  warning = "warning",
  error = "error",
}

// ----------------------------------------------------------------------

const AppWidgetSummary = ({
  title,
  total,
  icon,
  color = EColor.primary,
  sx,
  onClick,
  ...other
}: {
  title: any;
  total: any;
  icon?: any;
  color: EColor;
  sx?: any;
  onClick?: () => void;
}) => {
  return (
    <Card
      sx={{
        boxShadow: 0,
        textAlign: "center",
        color: (theme: Theme) => theme.palette[color].dark,
        bgcolor: (theme: Theme) => theme.palette[color].light,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...other}
    >
      <ButtonBase
        sx={{
          py: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
        onClick={onClick}
      >
        <IconWrapperStyle
          sx={{
            color: (theme: Theme) => theme.palette[color].dark,
            backgroundImage: (theme: Theme) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette[color].dark,
                0
              )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </IconWrapperStyle>

        <Typography variant="h3">{fShortenNumber(total)}</Typography>

        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </ButtonBase>
    </Card>
  );
};

export default AppWidgetSummary;
