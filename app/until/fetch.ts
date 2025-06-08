import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

export const getHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await getHeaders()) },
    body: JSON.stringify(body),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes };
};

export const get = async <T>(path: string, tags?: string[], params?: URLSearchParams) => {
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
  const res = await fetch(url, {
    headers: { ...(await getHeaders()) },
    next: { tags },
  });

  return await res.json() as T;
}
