class PossibleQuestionAnswer{
    constructor(id=undefined, text){
        this.id = id;
        this.text = text;
    }

    static from(json){
        return new PossibleQuestionAnswer(json.id, json.text);
    }
}

export default PossibleQuestionAnswer
