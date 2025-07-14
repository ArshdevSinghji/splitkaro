"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Divider,
  Container,
  Paper,
  Backdrop,
  CircularProgress,
  IconButton,
  Tooltip,
  Fab,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AddExpenseModal from "./AddExpenseModal";
import { removeMemberFromGroup } from "../redux/slice/crudForGroup.slice";

const GroupDetail = () => {
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { group, error, isLoading } = useAppSelector(
    (state) => state.getGroupsDetailsWithExpense
  );

  const { user: currentUser } = useAppSelector((state) => state.authentication);

  if (isLoading)
    return (
      <Backdrop open sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  if (error)
    return <Typography>Error fetching group details: {error}</Typography>;

  console.log(group);

  const getAvatarColor = (email: string) => {
    const colors = [
      "#1976d2",
      "#388e3c",
      "#f57c00",
      "#d32f2f",
      "#7b1fa2",
      "#0288d1",
    ];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (email: string) => {
    const username = email.split("@")[0];
    return username.slice(0, 2).toUpperCase();
  };

  const getAllMembers = (): string[] => {
    if (!group?.expense || !Array.isArray(group.expense)) return [];

    const memberEmails = new Set<string>();
    group.expense.forEach((expense) => {
      if (expense.members && Array.isArray(expense.members)) {
        expense.members.forEach((email: string) => memberEmails.add(email));
      }
    });
    return Array.from(memberEmails);
  };

  const uniqueMembers = getAllMembers();

  const isCurrentUserAdmin = currentUser?.email === group?.admin?.email;

  const handleRemoveMember = (memberEmail: string) => {
    dispatch(
      removeMemberFromGroup({ groupName: group.groupName, memberEmail })
    );
  };

  if (!group) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No group data available
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: "relative" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        Group Details
      </Typography>

      <Card
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-2px)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        {/* Group Header with Members */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            p: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {group.groupName}
          </Typography>

          {/* Group Admin */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Chip
              label="Admin"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                mr: 2,
                fontWeight: "bold",
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: getAvatarColor(group.admin.email),
                  width: 32,
                  height: 32,
                  mr: 1,
                  fontSize: "0.875rem",
                }}
              >
                {getInitials(group.admin.email)}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {group.admin.username}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {group.admin.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* All Members */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              All Members ({uniqueMembers.length})
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {uniqueMembers.map((memberEmail: string, memberIndex) => (
              <Box
                key={memberIndex}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  minWidth: "200px",
                  position: "relative",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: getAvatarColor(memberEmail),
                    width: 32,
                    height: 32,
                    mr: 1.5,
                    fontSize: "0.75rem",
                  }}
                >
                  {getInitials(memberEmail)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    {memberEmail.split("@")[0]}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {memberEmail}
                  </Typography>
                </Box>
                {/* Remove member button - only show if current user is admin and member is not admin */}
                {isCurrentUserAdmin && memberEmail !== group.admin.email && (
                  <Tooltip title="Remove Member">
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveMember(memberEmail)}
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        bgcolor: "error.main",
                        color: "white",
                        width: 20,
                        height: 20,
                        "&:hover": {
                          bgcolor: "error.dark",
                        },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 12 }} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Expenses List */}
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Expenses ({group.expense.length})
          </Typography>

          <Stack spacing={2}>
            {group.expense.map((expense, index) => (
              <Paper
                key={expense.id}
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  "&:hover": {
                    boxShadow: 2,
                    borderColor: "primary.main",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Description
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {expense.description}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Category
                    </Typography>
                    <Chip
                      label={expense.category}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: "medium" }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total Amount
                    </Typography>
                    <Typography
                      variant="h6"
                      color="success.main"
                      sx={{ fontWeight: "bold" }}
                    >
                      ₹{expense.totalAmount.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Paid By
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: getAvatarColor(expense.paidBy),
                          width: 24,
                          height: 24,
                          mr: 1,
                          fontSize: "0.7rem",
                        }}
                      >
                        {getInitials(expense.paidBy)}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium" }}
                        >
                          {expense.paidBy.split("@")[0]}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {expense.paidBy}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Expense Members */}
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Expense Members ({expense.members.length})
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {expense.members.map((memberEmail: string, memberIdx) => (
                    <Chip
                      key={memberIdx}
                      avatar={
                        <Avatar
                          sx={{
                            bgcolor: getAvatarColor(memberEmail),
                            width: 20,
                            height: 20,
                            fontSize: "0.6rem",
                          }}
                        >
                          {getInitials(memberEmail)}
                        </Avatar>
                      }
                      label={memberEmail.split("@")[0]}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Box sx={{ textAlign: "right", mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Expense ID: #{expense.id}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Floating Action Buttons */}
      <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
        <Stack spacing={2}>
          {/* Add Expense Button */}
          <Tooltip title="Add Expense" placement="left">
            <Fab
              color="primary"
              onClick={() => setAddExpenseModalOpen(true)}
              sx={{
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              <AddCircleIcon />
            </Fab>
          </Tooltip>
        </Stack>
      </Box>

      {/* Modals */}
      <AddExpenseModal
        open={addExpenseModalOpen}
        onClose={() => setAddExpenseModalOpen(false)}
      />
    </Container>
  );
};

export default GroupDetail;
