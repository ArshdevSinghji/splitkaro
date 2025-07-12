"use client";

import {
  Button,
  CircularProgress,
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
import { useRouter } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { authenticatingUser } from "@/app/redux/slice/authenticatingUser.slice";
import { registerUser } from "@/app/redux/slice/registeringUser.slice";

export default function SignUp() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { error, isLoading, isRegistered } = useAppSelector(
    (state) => state.register
  );

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ZSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: ZSignUpSchema) => {
    dispatch(
      registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error signing you in!`);
    }
  }, [error]);

  useEffect(() => {
    if (isRegistered) {
      toast("user registered successfully!");
      router.push("/");
    }
  }, [isRegistered]);

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
          type="password"
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
          {isLoading ? <CircularProgress /> : "Sign up"}
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
