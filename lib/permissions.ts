import type { User } from "@prisma/client";

export function canAccessAdmin(user?: Pick<User, "isActive"> | null) {
  return Boolean(user?.isActive);
}
