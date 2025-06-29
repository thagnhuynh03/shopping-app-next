"use server";

import { FormResponse } from "@/app/common/form-response.interface";
import { del } from "@/app/until/fetch";

export default async function removeCart(): Promise<FormResponse> {
    try {
      const result = await del("cart");
      if (result.error) {
        return { error: result.error };
      }
      return { error: "" };
    } catch {
      return { error: "Failed to remove cart items" };
    }
  }
