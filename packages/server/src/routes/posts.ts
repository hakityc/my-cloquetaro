import { zValidator } from "@hono/zod-validator"
import { z } from 'zod'
import { Hono, ValidationTargets } from 'hono'

const app = new Hono().post(
  '/posts',
  zValidator(
    'json',
    z.object({
      title: z.string().min(1, { message: "标题不能为空" }),
      body: z.string().min(1, { message: "内容不能为空" }),
    }).strict({
      message: "包含未定义的字段"
    })
  ),
  (c) => {
    // 打印请求头
    console.log('Request Headers:', c.req.header())
    
    // ...
    return c.json(
      {
        ok: true,
        message: 'Created!',
        name: 1,
      },
      201
    )
  }
).post(
  '/posts/:id',
  zValidator(
    'form',
    z.object({
      title: z.string(),
      body: z.string(),
    })
  ),
  (c) => {
    //...
    return c.json(
      {
        ok: true,
        message: 'Updated!',
      },
      200
    )
  }
)

export default app