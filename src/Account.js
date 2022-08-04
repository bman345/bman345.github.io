export default class Account {
    constructor(vals, uid) {
       // console.log(vals)
        this.first_name = vals[1];
        this.last_name = vals[2];
        this.email = vals[0];
        this.tables = vals[3] ? Object.values(vals[3]) : undefined;
        this.uid = uid;
    }
}