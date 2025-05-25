"use server";

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/until/errors";
import { redirect } from "next/navigation";

export default async function createUser(_prevState: any, formData: FormData) {
    const res = await fetch(`http://localhost:8080/users`, {
        method: "POST",
        body: formData,
    });

    const parsedRes = await res.json();
    
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) };
    }

    redirect("/");
}

