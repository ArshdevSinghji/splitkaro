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
import { SignInSchema, ZSignInSchema } from "../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { style } from "../style/style";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZSignInSchema>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = () => {
    return "Working!";
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
          disabled={isSubmitting}
          type="submit"
          variant="outlined"
          size="small"
          fullWidth
        >
          sign in
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
