"use client";

import {
  Box,
  Button,
  Container,
  Divider,
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
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchGroups } from "../redux/slice/fetchGroups";
import GroupDetail from "../component/GroupDetail";
import { GetGroupsDetailsWithExpense } from "../redux/slice/getGroupsDetailsWithExpense";
import CreateGroupModal from "../component/CreateGroupModal";
import AddExpenseModal from "../component/AddExpenseModal";

const Home = () => {
  const { user } = useAppSelector((state) => state.authentication);
  const groups = useAppSelector((state) => state.fecthGroups.groups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups(user.email));
  }, [dispatch, user.email]);

  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const [groupName, setGroupName] = useState("");

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
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={group.groupName}
                      onClick={() => {
                        setGroupName(group.groupName);
                        dispatch(GetGroupsDetailsWithExpense(group.groupName));
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Stack>
      </Drawer>
      <Container>
        {groupName === "" ? (
          <Typography>Select a group to view details</Typography>
        ) : (
          <Box>
            <GroupDetail />
          </Box>
        )}
      </Container>

      {/* Modals */}
      <CreateGroupModal
        open={showCreateGroup}
        onClose={handleCloseCreateGroup}
      />
    </Box>
  );
};

export default Home;
