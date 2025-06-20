"use client";

import { Stack, TextField, Button, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import createUser from "./create-user";
import { useActionState, useState } from "react";
import type { FormResponse } from "@/app/common/form-response.interface";
import Loader from "@/app/components/loader";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [state, formAction] = useActionState(
    async (prevState: FormResponse, formData: FormData) => {
      setLoading(true);
      const result = await createUser(prevState, formData);
      setLoading(false);
      return result;
    },
    { error: "" }
  );
  return (
    <>
      {loading && <Loader />}
      
      <form
        action={formAction}
        className="w-full max-w-xs"
        onSubmit={() => setLoading(true)}
      >
        <Stack spacing={2}>
          <Typography variant="h4" align="center" gutterBottom>SIGN UP</Typography>
          {state.error && (
            <Typography color="error" align="center">{state.error}</Typography>
          )}
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            error={!!state.error}
          />
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            error={!!state.error}
          />
          <Button type="submit" variant="contained">
            Signup
          </Button>
          <Link component={NextLink} href="/auth/login" className="self-center">
            You have been account? Login
          </Link>
        </Stack>
      </form>
    </>
  );
}