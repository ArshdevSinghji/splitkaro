"use client";

import { Box, Button, Divider, Drawer, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ProfileComponent from "../component/Profile";
import SettlementComponent from "../component/Settlement";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slice/authenticatingUser.slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GetUserSettlements } from "../redux/slice/getUserSummarySlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authentication);

  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/");
  };

  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  return (
    <>
      <Drawer variant="permanent" anchor="left">
        <Stack p={2}>
          <Stack
            flexDirection={"row"}
            gap={2}
            p={2}
            onClick={() => {
              setIsProfileOpen(true);
              setIsSummaryOpen(false);
            }}
          >
            <AccountCircleIcon />
            <Typography>Profile</Typography>
          </Stack>

          <Divider />

          <Stack
            flexDirection={"row"}
            gap={2}
            p={2}
            onClick={() => {
              dispatch(GetUserSettlements(user.email));
              setIsProfileOpen(false);
              setIsSummaryOpen(true);
            }}
          >
            <SummarizeIcon />
            <Typography>Settlements</Typography>
          </Stack>

          <Divider />

          <Button
            variant="outlined"
            onClick={() => router.push("/home")}
            sx={{ my: 2 }}
          >
            Back to dashboard
          </Button>

          <Divider />

          <Button
            startIcon={<LogoutIcon />}
            variant="contained"
            color="error"
            onClick={handleLogOut}
            sx={{ m: "auto 0" }}
          >
            Logout
          </Button>
        </Stack>
      </Drawer>
      <Box>
        {isProfileOpen && <ProfileComponent />}
        {isSummaryOpen && <SettlementComponent />}
      </Box>
    </>
  );
};

export default Profile;
