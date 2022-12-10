class Patient{

    constructor(id=undefined, firstName, lastName, email, ssn, height, gender, birthDate, doctor,experimental, username){
        this.id = id;
        this.ssn = ssn;
        this.height = height;
        this.gender = gender;
        this.birthDate = birthDate;
        this.doctor = doctor;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.experimental = experimental;
        this.username = username;
    }

    static from(json){
        return new Patient(json.id, json.firstName, json.lastName, json.email, json.ssn, json.height, json.gender,
            json.birthDate, json.doctor.id,json.experimental,json.user.username);
    }
}

export default Patient