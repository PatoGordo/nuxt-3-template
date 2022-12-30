import { User } from "../app/domain/entities/User";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const inMemoryDB: { users: User[] } = {
  users: [],
};
