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
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../redux/hooks";

const SettlementComponent = () => {
  const { settlements, isLoading, error } = useAppSelector(
    (state) => state.getUserSettlements
  );

  if (isLoading) {
    return <Typography>Loading settlements...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching settlements: {error}</Typography>;
  }
  if (settlements.length === 0) {
    return <Typography>No settlements found.</Typography>;
  }

  console.log("Settlements:", settlements);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Settlements
      </Typography>

      <Stack spacing={3}>
        {settlements.map((settlement) => (
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
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
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
        ))}
      </Stack>
    </Container>
  );
};

export default SettlementComponent;
