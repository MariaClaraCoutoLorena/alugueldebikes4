import { Bike } from "./bike";
import { User } from "./user";
import crypto from 'crypto'
import bcrypt from 'bcrypt';
export class App {
    users: User[] = []
    bikes: Bike[] = []
    salt: String = bcrypt.genSaltSync(10)

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.password = bcrypt.hashSync(user.password, this.salt)
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        bike.disponibilidade = true
        this.bikes.push(bike)
        return newId
    }

    verificaUser(email: string, password: string): User{
        for(let user of this.users){
            if(user.email==email){
                if(user.password=bcrypt.hashSync(password, this.salt)) {
                    console.log("Usuário logado com sucesso!")
                    return user
                }else throw new Error("Senha incorreta!")
            }
        }
        throw new Error("Este email não está cadastrado.")
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        bike.disponibilidade = false;
        bike.dateFrom = startDate;
        bike.dateFrom = endDate;
    }

    returnBike(bikeId: string): Number {
        const today = new Date()
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        bike.disponibilidade = true
        const diff = Math.abs(today.getTime() - bike.dateFrom.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
        return days*bike.valorDiario;
    }
    listBikes() {
        console.log("Bikes:")
        for(let bike of this.bikes){
            console.log("- "+bike.name)
        }
    }
    listUsers() {
        console.log("Usuários:")
        for(let user of this.users){
            console.log("- "+user.name+", "+ user.email)
        }
    }
}