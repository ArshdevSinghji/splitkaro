"use client";

import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, ZSignUpSchema } from "@/app/utils/zod";
import { style } from "@/app/style/style";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

export default function SignIn() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ZSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = () => {
    return "working!";
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        maxWidth: "20rem",
        p: 4,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Stack
        component={"form"}
        onSubmit={handleSubmit(() => onSubmit)}
        alignItems={"center"}
        gap={2}
        noValidate
      >
        <Typography variant="subtitle2">Put in your credentials</Typography>

        <TextField
          required
          {...register("username")}
          name="username"
          label="username"
          type="username"
          size="small"
          error={!!errors.username}
          helperText={errors?.username?.message}
        />

        <TextField
          required
          {...register("email")}
          name="email"
          label="email"
          type="email"
          size="small"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <TextField
          required
          {...register("password")}
          name="password"
          label="password"
          type="password"
          size="small"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />

        <TextField
          required
          {...register("confirmPassword")}
          name="confirmPassword"
          label="confirmPassword"
          type="confirmPassword"
          size="small"
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="outlined"
          size="small"
          fullWidth
        >
          sign up
        </Button>

        <Divider sx={style}>OR</Divider>

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          startIcon={<GoogleIcon />}
          size="small"
          fullWidth
        >
          sign in with Google
        </Button>

        <Typography variant="subtitle2">
          Don't have an account? <Link href={"/"}>SignIn</Link>
        </Typography>
      </Stack>
    </Paper>
  );
}
