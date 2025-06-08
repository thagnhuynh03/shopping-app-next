"use server";

import { get } from "./until/fetch";

export default async function getMe() {
    return get("users/me");
}