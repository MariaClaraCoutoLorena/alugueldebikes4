import { App } from "./app";
import { Bike } from "./bike";
import { User } from "./user";

const app = new App()
const bike = new Bike('caloi mountain', 'mountain bike', 100, 200, 150.5, 'My bike', 5, [], 10)
const bikeId = app.registerBike(bike)
const user = new User('Maria', 'maria@mail.com', '1234')
app.registerUser(user)

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

app.rentBike(bikeId, 'maria@mail.com', yesterday, today)
app.returnBike(bikeId)
app.verificaUser("maria@mail.com","1234")

app.verlocalizacao(bike)
app.atualizarLocalização(bike, {latitude:'-23.16', longitude:'-45.7'})



