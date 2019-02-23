package springboot.database;

import org.springframework.data.annotation.Id;

public class User {
    @Id
    public String id;

    public String name;
    public byte[] password_salt;
    public byte[] password_hash;

    public User(String name, byte[] password_salt, byte[] password_hash){
        this.name = name;
        this.password_salt = password_salt;
        this.password_hash = password_hash;
    }

    @Override
    public String toString(){
        return String.format("User[id=%s, username='%s']", id, name);
    }
}
