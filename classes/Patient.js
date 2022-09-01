class Patient{

    constructor(id=undefined, firstName, lastName, email, ssn, height, maritalStatus, gender, bmi, birthDate, doctor, password){
        this.id = id;
        this.ssn = ssn;
        this.height = height;
        this.maritalStatus = maritalStatus;
        this.gender = gender;
        this.bmi = bmi;
        this.birthDate = birthDate;
        this.doctorId = doctor;
        this.username = email;
        this.password = password;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
    }


    get email() {
        return this._email;
    }

    static from(json){
        return new Patient(json.id, json._firstName, json._lastName, json._email, json.ssn, json.height, json.maritalStatus, json.gender, json.bmi, json.birthDate, json.doctorId, json.password);
    }
}

export default Patient