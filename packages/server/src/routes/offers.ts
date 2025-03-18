// offers.ts
import { Hono } from 'hono'
import { offerService } from '../services/offerService'
import { okRes, errorRes } from '../common/res'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()
    .post('/', zValidator('json', z.object({
        name: z.string(),
        redirectType: z.enum(['HTTP_REDIRECT']),
        url: z.string(),
    })), async (c) => {
        try {
            const data = c.req.valid('json')
            const offer = await offerService.createOffer(data)
            return c.json(okRes(offer))
        } catch (error) {
            return c.json(errorRes(error.message), 500)
        }
    }).get('/', async (c) => {
        try {
            const offers = await offerService.getAllOffers()
            return c.json(okRes(offers))
        } catch (error) {
            return c.json(errorRes(error.message), 500)
        }
    }).get('/:id', async (c) => {
        try {
            const id = c.req.param('id')
            const offer = await offerService.getOfferById(Number(id))
            if (!offer) {
                return c.json(errorRes('Offer not found'), 404)
            }
            return c.json(okRes(offer))
        } catch (error) {
            return c.json(errorRes(error.message), 500)
        }
    }).put('/:id', zValidator('json', z.object({
        name: z.string().optional(),
    })), async (c) => {
        try {
            const id = c.req.param('id')
            const data = c.req.valid('json')
            const offer = await offerService.updateOffer(Number(id), data)
            if (!offer) {
                return c.json(errorRes('Offer not found'), 404)
            }
            return c.json(okRes(offer))
        } catch (error) {
            return c.json(errorRes(error.message), 500)
        }
    }).delete('/:id', async (c) => {
        try {
            const id = c.req.param('id')
            await offerService.deleteOffer(Number(id))
            return c.json(okRes({ message: 'Offer deleted successfully' }))
        } catch (error) {
            return c.json(errorRes(error.message), 500)
        }
    })

export default app