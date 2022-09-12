class QuestionAnswer{
    constructor(id=undefined, question, chosenAnswer){
        this.id = id;
        this.question = question;
        this.chosenAnswer = chosenAnswer;
    }

    static from(json){
        return new QuestionAnswer(json.id, json.question, json.chosenAnswer);
    }
}

export default QuestionAnswer