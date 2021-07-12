export class Liga{
    constructor(
        public _id: string,
        public name: string,
        public descripcion: string,
        public ligaImg: string,
        public teamCount: number,
        public teams: []
    ){}
}