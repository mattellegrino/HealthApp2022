class QuestionnaireAnswered{
    constructor(id=undefined, name,questionAnswers, submissionDate, questionnaireTemplate){
        this.id = id;
        this.name = name;
        this.questionAnswers = questionAnswers
        this.submissionDate = submissionDate;
        this.questionnaireTemplate = questionnaireTemplate;
    }

    static from(json){
        return new QuestionnaireAnswered(json.id, json.questionnaireTemplate.name,json.questionAnswers, json.submissionDate, json.questionnaireTemplate);
    }
}
export default QuestionnaireAnswered