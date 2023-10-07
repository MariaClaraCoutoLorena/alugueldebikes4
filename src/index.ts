import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'
import {FakeUserRepo} from "../../test/doubles/fake-user-repo.ts";
import {FakeBikeRepo} from '../../test/doubles/fake-bike-repo.ts';
import {FakeRentRepo} from '../../test/doubles/fake-rent-repo.ts'

async function main() {
    
    const clock = sinon.useFakeTimers();
    const app = new App(FakeUserRepo,FakeBikeRepo, FakeRentRepo)
    const user1 = new User('Jose', 'jose@mail.com', '1234')
    await app.registerUser(user1)
    const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
    app.registerBike(bike)
    console.log('Bike disponível: ', bike.available)
    app.rentBike(bike.id, user1.email)
    app.removeUser(user1.email)
}

main()








