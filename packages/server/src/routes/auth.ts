// authors.ts
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { okRes } from '../common/res'

// 这个密钥在实际应用中应该从环境变量中获取
const JWT_SECRET = 'your-secret-key'

const app = new Hono()
  .post('/login',
    zValidator('json',
      z.object({
        username: z.string().min(1, { message: "用户名不能为空" }),
        password: z.string().min(1, { message: "密码不能为空" })
      }).strict({
        message: "包含未定义的字段"
      })
    ),
    async (c) => {
      const { username, password } = await c.req.json()

      // 在实际应用中，这里应该查询数据库验证用户名和密码
      // 这里为了演示，使用硬编码的验证
      if (username === 'admin' && password === 'admin') {
        const token = jwt.sign(
          {
            username,
            // 可以添加其他需要的用户信息
            role: 'admin'
          },
          JWT_SECRET,
          { expiresIn: '1h' } // token 1小时后过期
        )
        return c.json(okRes({
          token,
          username
        }))
      }
      return c.json({
        code: '401',
        message: '用户名或者密码不正确',
        data: null,
      }, 401)
    }
  )

export default app