// import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { Hono } from 'hono'
import books from './routes/books'
import posts from './routes/posts'
import auth from './routes/auth'
import users from './routes/users'
import { authMiddleware } from './middleware/auth'

const app = new Hono()
app.use('/*', cors())
// 需要验证的路由
app.use('/users/*', authMiddleware)
app.use('/posts/*', authMiddleware)
app.use('/books/*', authMiddleware)

const routes = app.route('/auth', auth).route('/users', users).route('/books', books).route('/posts', posts)

export default {
  fetch: app.fetch
}
export type AppType = typeof routes

// serve(app, () => {
//   console.log('Server is running on http://localhost:3000')
// })