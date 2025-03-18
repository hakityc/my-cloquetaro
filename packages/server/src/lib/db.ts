import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { PrismaClient } from '@prisma/client'
import { Connection } from '@planetscale/database'

const connection = new Connection({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
})

const adapter = new PrismaPlanetScale(connection)
export const prisma = new PrismaClient({ adapter })