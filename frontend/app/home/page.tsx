"use client";

import {
  Box,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateGroupModal from "../component/CreateGroupModal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchGroups } from "../redux/slice/fetchGroups";
import AddExpenseModal from "../component/AddExpenseModal";

const Home = () => {
  const { user } = useAppSelector((state) => state.authentication);
  const groups = useAppSelector((state) => state.fecthGroups.groups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups(user.email));
  }, [dispatch, user.email]);

  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const handleCreateGroupClick = () => {
    setShowCreateGroup(true);
  };

  const handleCloseCreateGroup = () => {
    setShowCreateGroup(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Stack sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Welcome, {user.username}!
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateGroupClick}
            sx={{
              mb: 3,
              py: 1.5,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Create New Group
          </Button>

          <List>
            {groups.map((group, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary={group.groupName} />
                  <ListItemIcon>
                    <AddCircleIcon
                      onClick={() =>
                        setShowAddExpenseModal(!showAddExpenseModal)
                      }
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Drawer>

      <Container
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: 0,
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        {!showCreateGroup && !showAddExpenseModal ? (
          <Box>
            <Typography variant="h4" gutterBottom>
              These are your groups.
            </Typography>
          </Box>
        ) : (
          <Box>
            {showAddExpenseModal ? (
              <AddExpenseModal />
            ) : (
              <CreateGroupModal handleClose={handleCloseCreateGroup} />
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
