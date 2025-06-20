"use client";

import { Stack, TextField, Button, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { useActionState, useState } from "react";
import login from "../login/login";
import type { FormResponse } from "@/app/common/form-response.interface";
import Loader from "@/app/components/loader";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [state, formData] = useActionState(
    async (prevState: FormResponse, formData: FormData) => {
      setLoading(true);
      const result = await login(prevState, formData);
      setLoading(false);
      return result;
    },
    { error: "" }
  );
  return (
    <>
      {loading && <Loader />}
      <form action={formData} className="w-full max-w-xs" onSubmit={() => setLoading(true)}>
        <Stack spacing={2}>
            <Typography variant="h4" align="center" gutterBottom>LOG IN</Typography>
          {state.error && (
            <Typography color="error" align="center">{state.error}</Typography>
          )}
          <TextField name="email" label="Email" variant="outlined" type="email" error={!!state.error} />
          <TextField name="password" label="Password" variant="outlined" type="password" error={!!state.error} />
          <Button variant="contained" type="submit">Login</Button>
          <Link component={NextLink} href="/auth/signup" className="self-center">Don&apos;t have an account? Signup</Link>
        </Stack>
      </form>
    </>
  );
}