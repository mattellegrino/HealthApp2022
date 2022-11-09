class QuestionAnswered{
    constructor(id=undefined, name,questionAnswers, submissionDate){
        this.id = id;
        this.name = name;
        this.questionAnswers = questionAnswers
        this.submissionDate = submissionDate;
    }

    static from(json){
        return new QuestionAnswered(json.id, json.questionnaireTemplate.name,json.questionAnswers, json.submissionDate);
    }
}
export default QuestionAnswered