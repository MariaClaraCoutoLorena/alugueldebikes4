import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikeNotFoundError } from "./errors/bike-not-found-error"
import { UnavailableBikeError } from "./errors/unavailable-bike-error"
import { UserNotFoundError } from "./errors/user-not-found-error"
import { DuplicateUserError } from "./errors/user-duplicate-error"
import { App } from "./app"
import sinon from "sinon"

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })
    it('should correctly handle a bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })
    it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(() => {
            app.rentBike(bike.id, user.email)
        }).toThrow(UnavailableBikeError)
    })


    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })
    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)
        expect(() => {
            app.moveBikeTo('fake-id', newYork)
        }).toThrow(BikeNotFoundError)
    })

    
    it('should be able to find user', async () => {
        const app = new App()
        const user1 = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user1)
        expect(app.findUser('jose@mail.com').id).toEqual(user1.id)
    })
    it('should throw user not found error when user is not found', () => {
        const app = new App()
        expect(() => {
            app.findUser('fake@mail.com')
        }).toThrow(UserNotFoundError)
    })


    it('should be able to find user', async () => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike1)
        expect(app.findBike(bike1.id).id).toEqual(bike1.id)

    })
    it('should throw bike not found error when bike is not found', () => {
        const app = new App()
        expect(() => {
            app.findBike('11111')
        }).toThrow(BikeNotFoundError)
    })

    
    // it('should throw duplicate user error when user is duplicate', async () => {
    //     const app = new App()
    //     const user1 = new User('Jose', 'jose@mail.com', '1234')
    //     await app.registerUser(user1)
    //     const user2 = new User('Zé', 'jose@mail.com', '1234')
    //     expect(async () => {
    //         await app.registerUser(user2)
    //     }).toThrow(DuplicateUserError)
    // })


    // it('should throw user not found error when user not found to authenticate', async () => {
    //     const app = new App()
    //     const user1 = new User('Jose', 'jose@mail.com', '1234')
    //     await app.registerUser(user1)
    //     expect(async () => {
    //         await app.authenticate('joe@mail.com','1234')
    //     }).toThrow(UserNotFoundError)
    // })
    it('should false authenticate when password is wrong', async () => {
        const app = new App()
        const user1 = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user1)
        const password_ok = await app.authenticate('jose@mail.com','1245')
        expect(password_ok).toEqual(false)
    })
    it('should true authenticate when password is rigth', async () => {
        const app = new App()
        const user1 = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user1)
        const password_ok = await app.authenticate('jose@mail.com','1234')
        expect(password_ok).toEqual(true)
    })

    it('should throw user not found error when user is not found to remove', () => {
        const app = new App()
        expect(() => {
            app.removeUser('fake@mail.com')
        }).toThrow(UserNotFoundError)
    })
})