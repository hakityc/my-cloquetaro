import prisma from '../lib/prisma'
import { hash } from '../utils/crypto'

export const userService = {
  // 创建用户
  async create(data: {
    username: string
    password: string
    nickname?: string
    email?: string
  }) {
    const hashedPassword = await hash(data.password)
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })
  },

  // 查询用户列表
  async findMany(params: {
    skip?: number
    take?: number
    where?: any
  }) {
    return prisma.user.findMany({
      ...params,
      select: {
        id: true,
        username: true,
        nickname: true,
        avatar: true,
        role: true,
        email: true,
        createTime: true,
      },
    })
  },

  // 根据ID查询用户
  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        nickname: true,
        avatar: true,
        role: true,
        email: true,
        createTime: true,
      },
    })
  },

  // 更新用户
  async update(id: number, data: {
    nickname?: string
    email?: string
    avatar?: string
  }) {
    return prisma.user.update({
      where: { id },
      data,
    })
  },

  // 删除用户
  async delete(id: number) {
    return prisma.user.delete({
      where: { id },
    })
  },
}