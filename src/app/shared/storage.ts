export class Storage {

  static addUser(user: User) {
    users.push(user);

    console.log('added new user: ' + JSON.stringify(user));
  }
}


export class User {
  constructor(name: string, username: string, surname: string, password: string, clientKey: number, created: Date) {
    this.name = name;
    this.username = username;
    this.surname = surname;
    this.password = password;
    this.clientKey = clientKey;
    this.created = created;
  }

  name: string;
  username: string;
  surname: string;
  password: string;
  clientKey: number;
  created: Date
}

export var users: User[] = [
  {name: "seungmin", password: "pass", username: "seungmin", surname: "rizzler", clientKey: Math.floor(Math.random() * 9999999), created: new Date()},
  {name: "davit", password: "pass", username: "monke", surname: "chiko", clientKey: Math.floor(Math.random() * 9999999), created: new Date()}
]
