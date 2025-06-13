"use client";

import { Stack, TextField, Button, Link } from "@mui/material";
import NextLink from "next/link";
import { useActionState } from "react";
import login from "../login/login";
export default function Signup() {
  const [state, formData] = useActionState(login, { error: "" });
  return (
    <form action={formData} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField name="email" label="Email" variant="outlined" type="email" error={!!state.error} helperText={state.error}/>
        <TextField name="password" label="Password" variant="outlined" type="password" error={!!state.error} helperText={state.error}/>
        <Button variant="contained" type="submit">Login</Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">Don&apos;t have an account? Signup</Link>
        </Stack>
    </form>
    
  );
}