"use server";

import { cookies } from "next/headers";

export default async function getAuthentication() {
    const cookieStore = await cookies();
    const token = cookieStore.get("Authentication");
    return token;
}