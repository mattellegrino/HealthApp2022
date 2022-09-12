class User{
    constructor(id=undefined, username, isAccountNonExpired, isAccountNonLocked, isCredentialsNonExpired, isEnabled){
        this.id = id;
        this.username = username;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
    }

    static from(json){
        return new User(json.id, json.username, json.isAccountNonExpired, json.isAccountNonLocked, json.isCredentialsNonExpired, json.isEnabled);
    }
}

export default User