import type { User } from "$utils/types/entities";

export type RegisterUser = Omit<User, "id" | "updatedAt" | "createdAt">;
