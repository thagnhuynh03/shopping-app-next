"use server";
import { post } from "@/app/until/fetch";

export async function applyVoucher({ code, subtotal }: { code: string, subtotal: number }) {
    return post("voucher/apply", { code, subtotal });
}