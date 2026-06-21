import type { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export function getLeads() {
  return prisma.lead.findMany({ include: { product: true }, orderBy: { createdAt: "desc" } });
}

export function updateLeadStatus(id: string, status: LeadStatus) {
  return prisma.lead.update({ where: { id }, data: { status } });
}
