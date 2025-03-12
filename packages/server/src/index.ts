import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { Hono } from 'hono'
import books from './routes/books'
import posts from './routes/posts'
import auth from './routes/auth'
import users from './routes/users'
import { authMiddleware } from './middleware/auth'

const app = new Hono()

// 公开路由
app.use('/*', cors())
app.route('/auth', auth)

// 需要验证的路由
app.use('/users/*', authMiddleware)
app.use('/posts/*', authMiddleware)
app.use('/books/*', authMiddleware)

app.route('/users', users)
app.route('/books', books)
app.route('/posts', posts)

export default app
export type AppType = typeof app

serve(app, () => {
    console.log('Server is running on http://localhost:3000')
})