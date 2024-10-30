export class Storage {

}

export class ClientModel {
  constructor(clientKey: number, name: string, surname: string, username: string, email: string, phone: string,
              address: string, city: string, country: string, postalCode: string, birthDate: string, plusPoints: number) {
    this.clientKey = clientKey;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.birthDate = birthDate;
    this.plusPoints = plusPoints;
  }

  clientKey: number | null;
  name: string;
  surname: string;
  username: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  birthDate: string | null;
  plusPoints: number;
}

export class User {
  constructor(name: string, username: string, surname: string, password: string, email: string, created: Date) {
    this.name = name;
    this.username = username;
    this.surname = surname;
    this.password = password;
    this.email = email;
    this.created = created;
  }

  name: string;
  username: string;
  surname: string;
  password: string;
  email: string;
  created: Date
}

export class AuthResponse {
  // @ts-ignore
  success: boolean;
  // @ts-ignore
  user: User;
}
