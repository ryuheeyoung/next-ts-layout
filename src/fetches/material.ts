import { prisma } from "utils/db";

export const getMaterials = () => prisma.material.findMany();
