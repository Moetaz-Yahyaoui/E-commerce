import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

const theme = createTheme();

export default function LeaveReviewForm() {
  const [value, setValue] = React.useState<number | null>(0);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "48px 0 24px",
              color: "#144633",
              fontFamily: "Anton,sans-serif",
              fontWeight: 400,
              fontSize: "35px",
              letterSpacing: "10.5px",
            }}
          >
            Leave a Review
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your Name "
              name="text"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address "
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Your Review "
              name="email"
              autoComplete="email"
              autoFocus
              multiline
              rows={4}
            />
            <Typography
              sx={{
                padding: "10px 20px",
                background: " #fdf0d5",
                borderRadius: "5px",
              }}
            >
              Reviews may be rejected or edited to ensure that they fall within
              the FDA’s guidelines about what you should or shouldn’t say about
              CBD. Similar to herbal supplements, the FDA does not allow any
              perceived health claims related to CBD products to be made in a
              public forum, even if it’s about your personal experience. For
              more information, please read our guide to posting a review.
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
