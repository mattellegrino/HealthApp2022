class QuestionnaireTemplate{
    constructor(id=undefined, name, questions){
        this.id = id;
        this.name = name;
        this.questions = questions;
    }

    static from(json){
        return new QuestionnaireTemplate(json.id, json.name, json.questions);
    }
}

export default QuestionnaireTemplate