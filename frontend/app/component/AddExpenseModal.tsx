"use client";

import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  InputAdornment,
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
import { useAppSelector } from "../redux/hooks";
import { useForm } from "react-hook-form";
import { AddExpenseSchema, ZAddExpenseSchema } from "../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "zod";

const AddExpenseModal = () => {
  const { addedUsers } = useAppSelector((state) => state.fetchingUser);

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

  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [isEqualSplit, setIsEqualSplit] = useState<boolean>(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEqualSplit(event.target.checked);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: ZAddExpenseSchema) => {
    const expenseData = {
      ...data,
      addedUsers: addedUsers.map((user) => ({
        username: user.username,
      })),
    };
    console.log("Expense Data:", expenseData);
  };

  const dividedPrice = (price / (addedUsers.length + 1)).toFixed(2);

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h4">Add Expense</Typography>
      <Stack spacing={2} gap={2} direction={"row"} alignItems={"center"} mt={2}>
        <Stack spacing={1} alignItems={"center"}>
          <AddCircleIcon sx={{ width: 32, height: 32 }} onClick={handleOpen} />
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
      <SearchUserByEmailUsernameModal open={open} onClose={handleClose} />

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
        <Stack spacing={2} direction={"row"} alignItems={"center"}>
          <TextField
            {...register("description")}
            label="Description"
            variant="standard"
            multiline
            rows={4}
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
            {...register("price")}
            label="Price"
            variant="standard"
            margin="normal"
            type="number"
            error={!!errors.price}
            helperText={
              errors.price?.message
                ? String(errors.price.message)
                : "Enter the price"
            }
            onChange={(event) => setPrice(Number(event.target.value))}
            fullWidth
          />
          <TextField
            select
            label="Paid By"
            variant="standard"
            defaultValue="You"
            margin="normal"
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
            label="Equally"
          />
        </FormGroup>

        <Typography variant="body2" sx={{ my: 2 }}>
          Split Amount
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={2}>
          {/* You Stack */}
          <Stack
            alignItems={"center"}
            sx={{ border: 4, borderColor: "primary.main", borderRadius: 2 }}
          >
            <Box
              sx={{
                width: 60,
                backgroundColor: "primary.main",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle2" sx={{ p: 1 }}>
                You
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ p: 1 }}>
                {dividedPrice}
              </Typography>
            </Box>
          </Stack>

          {/* Added Users Stacks */}
          {addedUsers.map((user) => (
            <Stack
              key={user.email}
              alignItems={"center"}
              sx={{ border: 4, borderColor: "primary.main", borderRadius: 2 }}
            >
              <Box
                sx={{
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
              <Box>
                <Typography variant="subtitle2" sx={{ p: 1 }}>
                  {dividedPrice}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>

        <Stack direction={"row"} spacing={2} justifyContent="flex-end">
          <Button variant="outlined" color="error" sx={{ mt: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Add Expense
          </Button>
        </Stack>
      </Paper>
    </Paper>
  );
};

export default AddExpenseModal;
