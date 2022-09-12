class PatientQuestionnaire{
    constructor(id=undefined, description, submissionDate, questionAnswers, questionnaireTemplate, patient){
        this.id = id;
        this.description = description;
        this.submissionDate = submissionDate;
        this.questionAnswers = questionAnswers;
        this.questionnaireTemplate = questionnaireTemplate;
        this.patient = patient;
    }

    static from(json){
        return new PatientQuestionnaire(json.id, json.description, json.submissionDate, json.questionAnswers, json.questionnaireTemplate, json.patient);
    }
}

export default PatientQuestionnaire