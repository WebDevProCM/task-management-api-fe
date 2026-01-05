import { User } from "@/types/auth";
import { Task, UpdateTask } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const registerUser = async (data:User) => {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  return res.json();
};
export const loginUser = async (data:User) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  return res.json();
};