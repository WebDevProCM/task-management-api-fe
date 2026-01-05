export interface Task {
    _id?: string;
    title: string;
    description?: string;
    status?: "pending" | "completed";
    createdAt?:string,
    updatedAt?:string
}

export interface UpdateTask {
    title: string;
    description?: string;
    status: "pending" | "completed";
}
