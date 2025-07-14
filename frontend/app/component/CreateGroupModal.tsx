"use client";

import {
  Button,
  CircularProgress,
  Container,
  Modal,
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
import { createGroup } from "../redux/slice/createGroup";
import { toast } from "sonner";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  open,
  onClose,
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
    onClose(); // Close modal on success
  };

  const handleCancelClick = () => {
    reset();
    onClose();
    toast.error("Group creation cancelled!");
  };

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
          padding: 4,
          maxWidth: 400,
          width: '100%',
          m: 2,
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
    </Modal>
  );
};

export default CreateGroupModal;
