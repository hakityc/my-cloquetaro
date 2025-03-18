import prisma from '../lib/prisma'
import { Prisma, RedirectType, PayoutType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export interface CreateOfferInput {
    name: string
    redirectType: RedirectType
    url: string
    countries?: string
    payoutType?: PayoutType
    payoutAmount?: string            // 使用 string 类型
    allowUpsells?: boolean
    conversionCap?: boolean
    notes?: string
    preloadEnabled?: boolean
    offerValues?: string
}

export interface UpdateOfferInput extends Partial<CreateOfferInput> { }

export const offerService = {
    // 创建新的 offer
    async createOffer(data: CreateOfferInput) {
        return prisma.offer.create({
            data: {
                ...data,
            }
        })
    },

    // 获取所有 offers
    async getAllOffers() {
        return prisma.offer.findMany({
        })
    },

    // 根据 ID 获取单个 offer
    async getOfferById(id: number) {
        return prisma.offer.findUnique({
            where: { id },
        })
    },

    // 更新 offer
    async updateOffer(id: number, data: UpdateOfferInput) {
        const { offerValues, ...updateData } = data
        return prisma.offer.update({
            where: { id },
            data: {
                ...updateData,
                offerValues: offerValues ? {
                    deleteMany: {},
                    create: offerValues
                } : undefined
            },
        })
    },

    // 删除 offer
    async deleteOffer(id: number) {
        return prisma.offer.delete({
            where: { id },
        })
    }
}