export class UsertypeModule {
    pseudo: String;
    firstname: String;
    lastname: String;
    email: String;
    age: String;
    password: String;
    country: String;
    phone: any;
    image: String;
    favoritbooks: [Number];
    reviews: [Number];
    addedbooks: [Number];

    constructor(
        pseudo: String,
        email: String,
        age: String,
        password: String,
        firstname: String,
        lastname: String,
        country: String,
        image: String,
        phone: any
    ) {
        this.pseudo = pseudo;
        this.email = email;
        this.age = age;
        this.password = password;
        this.firstname = firstname;
        this.image = image;
        this.phone = phone;
        this.country = country
        this.lastname = lastname
    }
}
