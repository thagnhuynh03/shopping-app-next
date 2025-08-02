"use server";

import { FormResponse } from "@/app/common/form-response.interface";
import { post } from "@/app/until/fetch";

export default async function createUser(_prevState: FormResponse, formData: FormData) {
    const { error } = await post("users", formData);
    if (error) {
        return { error };
    }
    return { error: "" };
}

