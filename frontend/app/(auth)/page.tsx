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
import { SignInSchema, ZSignInSchema } from "../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { style } from "../style/style";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { authenticatingUser } from "../redux/slice/authenticatingUser.slice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.authentication
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZSignInSchema>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data: ZSignInSchema) => {
    dispatch(
      authenticatingUser({
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("SignIn Successful!");
      router.push("/home");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(`Error signing you in!`);
    }
  }, [error]);

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
        onSubmit={handleSubmit(onSubmit)}
        alignItems={"center"}
        gap={2}
        noValidate
      >
        <Typography variant="subtitle2">Put in your credentials</Typography>

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

        <Button
          disabled={isLoading || isSubmitting}
          type="submit"
          variant="outlined"
          size="small"
          fullWidth
        >
          {isLoading ? <CircularProgress /> : "Sign in"}
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
          Don't have an account? <Link href={"/signUp"}>SignUp</Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SignIn;
