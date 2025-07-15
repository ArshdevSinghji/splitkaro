import { Box, Container, Typography } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ textWrap: "balance" }}>
        SplitKaro
      </Typography>
      <Typography variant="h4" sx={{ textWrap: "balance" }}>
        where you splits your bills and we manage
      </Typography>
    </Box>
  );
};

export default HomePage;
