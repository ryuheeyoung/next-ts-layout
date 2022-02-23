import { Material, PrismaPromise } from "@prisma/client";

import {prisma} from "utils/db";

/**
 * 비누재료 목록 조회
 * @returns 비누재료 목록
 */
export const getMaterials = (): PrismaPromise<Material[]> => prisma.material.findMany();

/**
 * 비누재료 추가
 * @param data 추가 비누재료
 * @returns 추가결과
 */
export const addMaterial = (data: { name: string; amount: number | null; unit: string | null; }): PrismaPromise<Material> => prisma.material.create({data});

/**
 * 비누재료 수정
 * @param data 수정 비누재료
 * @returns 수정 결과
 */
export const putMaterial = (id: number, data: Material): PrismaPromise<Material> => prisma.material.update({where: {id}, data: {
    name: data.name,
    amount: data.amount,
    unit: data.unit
}});

export const delMaterial = (id: number) => prisma.material.delete({where: {id}});