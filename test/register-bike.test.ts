import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('registers a bike with valid data', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'mountain bike',
                type: 'mountain',
                bodySize: 20,
                maxLoad: 100,
                rate: 10,
                descripition: 'mountain bike',
                ratings: 5,
                imageUrls: ['http://image1.com', 'http://image2.com']
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })

    it.only('returns 400 when trying to register duplicate bike', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'mountain bike',
                type: 'mountain',
                bodySize: 20,
                maxLoad: 100,
                rate: 10,
                descripition: 'mountain bike',
                ratings: 5,
                imageUrls: ['http://image1.com', 'http://image2.com'],
                id: 2
            })
            .expect(201)

        await request(server)
            .post('/api/bikes')
            .send({
                name: 'mountain bike',
                type: 'mountain',
                bodySize: 20,
                maxLoad: 100,
                rate: 10,
                descripition: 'mountain bike',
                ratings: 5,
                imageUrls: ['http://image1.com', 'http://image2.com'],
                id: 2
            })
            .expect(400)
    }, 20000)
})