import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"

describe('PrismaBikeRepo', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('adds a bike in the database', async () => {
        const BikeToBePersisted = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(BikeToBePersisted)
        expect(bikeId).toBeDefined()
        const persistedBike = await repo.find(BikeToBePersisted.id)
        expect(persistedBike.name).toEqual(
            BikeToBePersisted.name
        )
    })

    it('removes a bike from the database', async () => {
        const BikeToBePersisted = new Bike(
            'caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, []
        )
        const repo = new PrismaBikeRepo()
        await repo.add(BikeToBePersisted)
        await repo.remove(BikeToBePersisted.id)
        const removedBike = await repo.find(BikeToBePersisted.id)
        expect(removedBike).toBeNull()
    })

    it('lists bikes in the database', async () => {
        const user1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const user2 = new Bike('caloi mountainbike 2', 'mountain bike',
        2341, 2341, 100.0, 'My bike 2', 5, [])
        const repo = new PrismaBikeRepo()
        await repo.add(user1)
        await repo.add(user2)
        const bikeList = await repo.list()
        expect(bikeList.length).toEqual(2)
    })
  
    
    it('updates a bike from the database', async () => {
        const BikeToBePersisted = new Bike(
            'caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, []
        )
        const repo = new PrismaBikeRepo()
        await repo.add(BikeToBePersisted)
        BikeToBePersisted.ratings+=1
        await repo.update(BikeToBePersisted.id, BikeToBePersisted)
        const persistedBike = await repo.find(BikeToBePersisted.id)
        expect(persistedBike.ratings).toEqual(
            BikeToBePersisted.ratings
        )
    })
})