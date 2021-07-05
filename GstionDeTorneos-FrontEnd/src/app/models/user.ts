export class User{

    constructor(
        public name:string,
        public lastname:string,
        public username:string,
        public password:string,
        public email:string,
        public image:string,
        public role:string,
        public ligas: []
    ){}
}