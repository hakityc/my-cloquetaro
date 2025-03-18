// users.ts
import { Hono } from 'hono'
import { userService } from '../services/userService'
import { okRes } from '../common/res'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono().post('/', zValidator('json', z.object({
  username: z.string(),
  password: z.string(),
  nickname: z.string().optional(),
  email: z.string().optional(),
})), async (c) => {
  const data = await c.req.json()
  const user = await userService.create(data)
  return c.json(okRes(user))
}).get('/', async (c) => {
  const users = await userService.findMany({})
  return c.json(okRes(users))
}).get('/info', async (c) => {
  // 从token中获取用户ID，这里暂时mock
  const userId = 1
  const user = await userService.findById(userId)
  return c.json(okRes({ userInfo: user }))
}).put('/:id', zValidator('json', z.object({
  nickname: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().optional(),
})), async (c) => {
  const id = Number(c.req.param('id'))
  const data = await c.req.json()
  const user = await userService.update(id, data)
  return c.json(okRes(user))
}).delete('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  await userService.delete(id)
  return c.json(okRes(null))
})

export default app