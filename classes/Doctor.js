class Doctor{
    constructor(id=undefined, firstName, lastName, email, ssn, password){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.ssn = ssn;
        this.username = email;
        this.password = password;
    }

    static from(json){
        return new Doctor(json.id, json.firstName, json.lastName, json.email, json.ssn, json.password);
    }
}

export default Doctor