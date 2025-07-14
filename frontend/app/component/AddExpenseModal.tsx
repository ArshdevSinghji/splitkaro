"use client";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import SearchUserByEmailUsernameModal from "./SearchUserByEmailUsernameModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useForm } from "react-hook-form";
import { AddExpenseSchema, ZAddExpenseSchema } from "../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpenseWithSettlements } from "../redux/slice/createExpenseWithSettlements";
import { toast } from "sonner";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
}

const AddExpenseModal = ({ open, onClose }: AddExpenseModalProps) => {
  const dispatch = useAppDispatch();

  const { addedUsers } = useAppSelector((state) => state.fetchingUser);
  const { group } = useAppSelector(
    (state) => state.getGroupsDetailsWithExpense
  );
  const currentUser = useAppSelector((state) => state.authentication.user);
  const { isLoading, error } = useAppSelector(
    (state) => state.createExpenseWithSettlements
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZAddExpenseSchema>({
    resolver: zodResolver(AddExpenseSchema),
  });

  enum Category {
    HOME = "home",
    TRIP = "trip",
    PERSONAL = "personal",
    OFFICE = "office",
    SPORTS = "sports",
    OTHERS = "others",
  }

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [isEqualSplit, setIsEqualSplit] = useState<boolean>(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEqualSplit(event.target.checked);
  };

  const handleSearchModalOpen = () => setSearchModalOpen(true);
  const handleSearchModalClose = () => setSearchModalOpen(false);

  const onSubmit = (data: ZAddExpenseSchema) => {
    const amountToPay: { [key: string]: number } = {};

    const currentUserAmount = document.getElementById(
      `standard-adornment-amount-${currentUser.email}`
    ) as HTMLInputElement;
    if (currentUserAmount) {
      const amount = currentUserAmount.value;
      amountToPay[currentUser.email] = Number(amount);
    }

    addedUsers.forEach((user) => {
      const userAmount = document.getElementById(
        `standard-adornment-amount-${user.email}`
      ) as HTMLInputElement;
      if (userAmount) {
        const amount = userAmount.value;
        amountToPay[user.email] = Number(amount);
      }
    });

    const members = addedUsers.map((user) => user.email);
    members.push(currentUser.email);

    if (data.paidBy === "You") {
      data.paidBy = currentUser.email;
    }

    const expenseData = {
      ...data,
      totalAmount: Number(data.totalAmount),
      members,
      amountToPay,
    };

    // console.log("Expense Data:", expenseData);

    dispatch(
      createExpenseWithSettlements({
        data: expenseData,
        groupName: group.groupName,
      })
    );

    if (error) {
      toast.error(error);
    } else {
      toast.success("Expense added successfully!");
      onClose(); // Close modal on success
    }
  };

  const dividedPrice = (price / (addedUsers.length + 1)).toFixed(2);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          width: "40rem",
          maxHeight: "90vh",
          overflow: "auto",
          m: 2,
        }}
      >
        <Typography variant="h4">Add Expense</Typography>

        {/* Add Friends Section */}
        <Stack
          spacing={2}
          gap={2}
          direction={"row"}
          alignItems={"center"}
          mt={2}
        >
          <Stack spacing={1} alignItems={"center"}>
            <AddCircleIcon
              sx={{ width: 32, height: 32, cursor: "pointer" }}
              onClick={handleSearchModalOpen}
            />
            <Typography variant="subtitle2">Add Friends</Typography>
          </Stack>
          <Stack spacing={1} alignItems={"center"}>
            <Avatar />
            <Typography variant="subtitle2">You</Typography>
          </Stack>
          {addedUsers.map((friend) => (
            <Stack key={friend.email} spacing={1} alignItems={"center"}>
              <Avatar />
              <Typography variant="subtitle2">{friend.username}</Typography>
            </Stack>
          ))}
        </Stack>

        {/* Add Friends Modal */}
        <SearchUserByEmailUsernameModal
          open={searchModalOpen}
          onClose={handleSearchModalClose}
        />

        <Paper
          variant="outlined"
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Basic form */}
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <TextField
              {...register("description")}
              label="Description"
              variant="standard"
              multiline
              margin="normal"
              type="text"
              error={!!errors.description}
              helperText={
                errors.description?.message
                  ? String(errors.description.message)
                  : "Add a description"
              }
              fullWidth
            />
            <TextField
              {...register("category")}
              select
              label="Category"
              variant="standard"
              defaultValue={Category.OTHERS}
              margin="normal"
              type="text"
              error={!!errors.category}
              helperText={
                errors.category?.message
                  ? String(errors.category.message)
                  : "Select a category"
              }
              fullWidth
            >
              {Object.values(Category).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack spacing={2} direction={"row"}>
            <TextField
              {...register("totalAmount")}
              label="Total Amount"
              variant="standard"
              margin="normal"
              error={!!errors.totalAmount}
              helperText={
                errors.totalAmount?.message
                  ? String(errors.totalAmount.message)
                  : "Enter the total amount"
              }
              onChange={(event) => {
                setPrice(Number(event.target.value));
              }}
              fullWidth
            />
            <TextField
              {...register("paidBy")}
              select
              label="Paid By"
              variant="standard"
              defaultValue="You"
              margin="normal"
              name="paidBy"
              type="text"
              fullWidth
            >
              <MenuItem value="You">You</MenuItem>
              {addedUsers.map((user) => (
                <MenuItem key={user.email} value={user.username}>
                  {user.username}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {/* Equally Split */}
          <FormGroup sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch checked={isEqualSplit} onChange={handleSwitchChange} />
              }
              label={isEqualSplit ? "Equally" : "Unequally"}
            />
          </FormGroup>

          <Typography variant="body2" sx={{ my: 2 }}>
            Split Amount
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {/* You Stack */}
            <Stack
              alignItems={"center"}
              sx={{
                border: 4,
                borderColor: "primary.main",
                borderRadius: 2,
                my: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  textAlign: "center",
                  verticalAlign: "middle",
                  color: "#fff",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" sx={{ p: 1 }}>
                  You
                </Typography>
              </Box>

              <Box sx={{ p: 1 }}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">
                    Amount
                  </InputLabel>
                  {isEqualSplit ? (
                    <Input
                      id={`standard-adornment-amount-${currentUser.email}`}
                      value={dividedPrice}
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  ) : (
                    <Input
                      id={`standard-adornment-amount-${currentUser.email}`}
                      placeholder={"0.00"}
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                    />
                  )}
                </FormControl>
              </Box>
            </Stack>

            {/* Added Users Stacks */}
            {addedUsers.map((user) => (
              <Stack
                key={user.email}
                alignItems={"center"}
                sx={{
                  border: 4,
                  borderColor: "primary.main",
                  borderRadius: 2,
                  my: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "primary.main",
                    textAlign: "center",
                    verticalAlign: "middle",
                    color: "#fff",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ p: 1 }}>
                    {user.username}
                  </Typography>
                </Box>
                <Box sx={{ p: 1 }}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">
                      Amount
                    </InputLabel>
                    {isEqualSplit ? (
                      <Input
                        id={`standard-adornment-amount-${user.email}`}
                        value={dividedPrice}
                        startAdornment={
                          <InputAdornment position="start">₹</InputAdornment>
                        }
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    ) : (
                      <Input
                        id={`standard-adornment-amount-${user.email}`}
                        placeholder={"0.00"}
                        startAdornment={
                          <InputAdornment position="start">₹</InputAdornment>
                        }
                      />
                    )}
                  </FormControl>
                </Box>
              </Stack>
            ))}
          </Stack>

          <Stack direction={"row"} spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 2 }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              {isSubmitting && isLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Add Expense"
              )}
            </Button>
          </Stack>
        </Paper>
      </Paper>
    </Modal>
  );
};

export default AddExpenseModal;
