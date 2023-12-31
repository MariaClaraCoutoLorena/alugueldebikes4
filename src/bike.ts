
export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public valorDiario: number,
        public location?: { latitude: string, longitude: string},
        public disponibilidade?: boolean,
        public dateFrom?: Date,
        public dateTo?: Date,
        public id?: string
    ) {}
}