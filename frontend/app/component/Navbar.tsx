"use client";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/profile");
  };

  return (
    <AppBar position="sticky" sx={{ p: 1, display: "flex" }}>
      <Toolbar variant="dense">
        <Box flexGrow={1}>
          <Typography variant="h6" color="inherit" component="div">
            SplitKaro
          </Typography>
        </Box>
        <Stack flexDirection={"row"} alignItems={"center"} gap={4}>
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
          <Avatar onClick={handleClick} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
