import {
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Stack,
  Divider,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Category } from "./AddExpenseModal";
import {
  GetUserSettlementsByCategory,
  GetUserSettlements,
} from "../redux/slice/getUserSummarySlice";

const SettlementComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Category.ALL
  );

  const { settlements, isLoading, error } = useAppSelector(
    (state) => state.getUserSettlements
  );
  const { user } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category === Category.ALL) {
      dispatch(GetUserSettlements(user.email));
    } else {
      dispatch(
        GetUserSettlementsByCategory({
          email: user.email,
          category: category,
        })
      );
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
          <Typography ml={2}>Loading settlements...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          Error fetching settlements: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Settlements
          </Typography>

          {/* Summary Cards - Always show when not loading */}
          <Box display="flex" gap={2} mb={3} flexWrap="wrap">
            <Card sx={{ minWidth: 180 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  Total Settlements
                </Typography>
                <Typography variant="h5" color="primary">
                  {settlements.length}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 180 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  Total Amount
                </Typography>
                <Typography variant="h5" color="secondary">
                  ₹
                  {settlements
                    .reduce((sum, s) => sum + s.amountToPay, 0)
                    .toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 180 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  Pending
                </Typography>
                <Typography variant="h5" color="error">
                  {settlements.filter((s) => !s.isPaid).length}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Category Filter */}
          <TextField
            select
            label="Filter by category"
            variant="outlined"
            value={selectedCategory}
            margin="normal"
            onChange={(e) => handleCategoryChange(e.target.value)}
            fullWidth
            sx={{ maxWidth: 300 }}
          >
            <MenuItem value={Category.ALL}>
              <Chip label="All Categories" color="primary" size="small" />
            </MenuItem>
            {Object.values(Category)
              .filter((option) => option !== Category.ALL) // Exclude ALL from the list
              .map((option) => (
                <MenuItem key={option} value={option}>
                  <Chip
                    label={
                      option.charAt(0).toUpperCase() +
                      option.slice(1).toLowerCase()
                    }
                    variant="outlined"
                    size="small"
                  />
                </MenuItem>
              ))}
          </TextField>
        </Box>

        {/* Settlements List */}
        <Stack spacing={3}>
          {settlements.length === 0 ? (
            <Paper
              elevation={2}
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "grey.50",
                border: "1px dashed",
                borderColor: "grey.300",
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No settlements found
              </Typography>
            </Paper>
          ) : (
            settlements.map((settlement) => (
              <Card
                key={settlement.id}
                elevation={3}
                sx={{
                  borderLeft: settlement.isPaid
                    ? "6px solid #4caf50"
                    : "6px solid #f44336",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  {/* Header Section */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6" color="primary">
                      {settlement.expense.group.groupName}
                    </Typography>
                    <Chip
                      label={settlement.isPaid ? "PAID" : "PENDING"}
                      color={settlement.isPaid ? "success" : "error"}
                      variant="filled"
                      size="small"
                    />
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    {settlement.expense.description}
                  </Typography>

                  {/* Amount Section */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    my={2}
                  >
                    <Typography
                      variant="h5"
                      color="secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      ₹{settlement.amountToPay}
                    </Typography>
                    <Chip
                      label={settlement.expense.category.toUpperCase()}
                      variant="outlined"
                      size="small"
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Details Section */}
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Total Amount:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ₹{settlement.expense.totalAmount}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Paid By:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {settlement.expense.paidBy}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Members:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {settlement.expense.members.length} people
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Members List */}
                  <Box mt={2}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      gutterBottom
                    >
                      Members:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                      {settlement.expense.members.map((member, index) => (
                        <Chip
                          key={index}
                          label={member}
                          size="small"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default SettlementComponent;
