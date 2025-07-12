"use client";

import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CreateGroupSchema, ZCreateGroupSchema } from "../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { createGroup } from "../redux/slice/thunk";
import { toast } from "sonner";

const CreateGroup: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const { isLoading } = useAppSelector((state) => state.creatingGroup);
  const { user } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ZCreateGroupSchema>({
    resolver: zodResolver(CreateGroupSchema),
  });

  const onSubmit = async (groupName: ZCreateGroupSchema) => {
    const data = {
      email: user.email,
      groupName: groupName.groupName,
    };
    dispatch(createGroup(data));
    toast.success("Group created successfully!");
    reset();
  };

  const handleCancelClick = () => {
    reset();
    handleClose();
    toast.error("Group creation cancelled!");
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 4,
        }}
      >
        <Typography variant="subtitle1">Create a group</Typography>
        <Stack
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          mt={2}
          noValidate
        >
          <TextField
            {...register("groupName", { required: "Group name is required!" })}
            variant="outlined"
            placeholder="Enter a group name"
            type="text"
            name="groupName"
            label=" Group Name"
            margin="normal"
            error={!!errors.groupName}
            helperText={
              typeof errors.groupName?.message === "string"
                ? errors.groupName.message
                : undefined
            }
            fullWidth
          />
          <Button
            disabled={isSubmitting}
            variant="contained"
            sx={{ mt: 2 }}
            type="submit"
          >
            {isLoading ? <CircularProgress /> : "Create"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancelClick}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CreateGroup;
