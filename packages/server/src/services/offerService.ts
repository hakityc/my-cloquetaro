import prisma from '../lib/prisma'
import { Prisma, RedirectType, PayoutType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export interface CreateOfferInput {
    name: string
    redirectType: RedirectType
    url: string
    countries?: string
    payoutType?: PayoutType
    payoutAmount?: number
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
        try {
            return await prisma.offer.create({
                data: {
                    ...data,
                }
            })
        } catch (error) {
            console.error('创建 Offer 失败:', error)
            throw error
        }
    },

    // 获取所有 offers
    async getAllOffers() {
        try {
            return await prisma.offer.findMany({})
        } catch (error) {
            console.error('获取所有 Offers 失败:', error)
            throw error
        }
    },

    // 根据 ID 获取单个 offer
    async getOfferById(id: number) {
        try {
            return await prisma.offer.findUnique({
                where: { id },
            })
        } catch (error) {
            console.error(`获取 Offer(ID: ${id}) 失败:`, error)
            throw error
        }
    },

    // 更新 offer
    async updateOffer(id: number, data: UpdateOfferInput) {
        try {
            const { offerValues, ...updateData } = data
            return await prisma.offer.update({
                where: { id },
                data: {
                    ...updateData,
                    offerValues: offerValues ? {
                        deleteMany: {},
                        create: offerValues
                    } : undefined
                },
            })
        } catch (error) {
            console.error(`更新 Offer(ID: ${id}) 失败:`, error)
            throw error
        }
    },

    // 删除 offer
    async deleteOffer(id: number) {
        try {
            return await prisma.offer.delete({
                where: { id },
            })
        } catch (error) {
            console.error(`删除 Offer(ID: ${id}) 失败:`, error)
            throw error
        }
    }
}