import { Task, UpdateTask } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const fetchTasks = async (token:string, page:number, limit:number) => {
  const res = await fetch(`${API_URL}/api/tasks?page=${page}&limit=${limit}`, { 
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
export const fetchTask = async (token:string,id:string) => {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, { 
    cache: "no-store", 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const createTask = async (token:string,data: Task) => {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const updateTask = async (token:string, data: Task, id:string) => {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const deleteTask = async (token:string, id:string) => {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};
