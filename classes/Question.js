class Question{
    constructor(id=undefined, text, questionSection, possibleQuestionAnswer){
        this.id = id;
        this.text = text;
        this.questionSection = questionSection;
        this.possibleQuestionAnswer = possibleQuestionAnswer;
    }

    static from(json){
        return new Question(json.id, json.text, json.questionSection, json.possibleQuestionAnswer);
    }
}

export default Question