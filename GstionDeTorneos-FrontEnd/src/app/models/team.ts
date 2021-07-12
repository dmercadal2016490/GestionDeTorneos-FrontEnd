export class Team{
    constructor(
        public _id: string,
        public name: string,
        public country: string,
        public golesFavor:number,
        public golesContra:number,
        public golesDiferencia:number,
        public partidos:number,
        public puntos:number,
        public logo:string,
        public players: []
    ){}
}