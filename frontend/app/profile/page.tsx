"use client";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slice/authenticatingUser.slice";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const handleEditButton = () => {
    setIsEdit(!isEdit);
    setReadOnly(isEdit);
  };

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <Drawer variant="permanent" anchor="left">
        <Stack p={2}>
          <Stack flexDirection={"row"} gap={2} p={2}>
            <AccountCircleIcon />
            <Typography>Profile</Typography>
          </Stack>
          <Stack flexDirection={"row"} gap={2} p={2}>
            <SummarizeIcon />
            <Typography>Summary</Typography>
          </Stack>
          <Button
            startIcon={<LogoutIcon />}
            variant="contained"
            color="error"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </Stack>
      </Drawer>
      <Container>
        <Typography variant="h1">Profile Settings</Typography>
        <Stack>
          <Box>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <AddAPhotoIcon sx={{ color: "white", fontSize: 20 }} />
                </Box>
              }
              sx={{
                "& .MuiBadge-badge": {
                  bottom: 8,
                  right: 8,
                  padding: 0,
                  backgroundColor: "transparent",
                },
              }}
            >
              <Avatar
                variant="square"
                sx={{
                  width: 196,
                  height: 196,
                }}
              />
            </Badge>
          </Box>

          <TextField
            variant={readOnly ? "filled" : "outlined"}
            label="username"
            defaultValue={`${user.username}`}
            slotProps={{
              input: {
                readOnly: readOnly,
              },
            }}
            margin="normal"
          />
          <TextField
            variant={readOnly ? "filled" : "outlined"}
            label="email"
            defaultValue={`${user.email}`}
            slotProps={{
              input: {
                readOnly: readOnly,
              },
            }}
            margin="normal"
          />
          {!isEdit ? (
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              onClick={handleEditButton}
              sx={{ my: 2 }}
            >
              Edit Details
            </Button>
          ) : (
            <>
              <Button startIcon={<SaveIcon />} variant="contained">
                Save Details
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setIsEdit(false);
                  setReadOnly(isEdit);
                }}
                sx={{ my: 2 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Profile;
