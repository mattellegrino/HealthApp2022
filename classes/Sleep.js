class Sleep{
    constructor( date, durationMs){
        this.date = date;
        this.durationMs = durationMs;
    }

    static from(json){
        return new Sleep(json.id.date, json.durationMs);
    }
}
export default Sleep