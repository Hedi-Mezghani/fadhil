export class User {
  toLocaleLowerCase() {
    throw new Error('Method not implemented.');
  }
  id!: number;
  username!: string;
  scendname!:string;
  experience!:string;
  birthday!:string;
  rib!:string;
  tel!: string;
  email!: string;
  password! : string;
  roles!: Role[];
  post!:string;
  equipe!:string;
  manager!:string;
  statut!:string;
  datedebut!:string;
}
export class Role {
  id!: number;
  name!: string;
}

