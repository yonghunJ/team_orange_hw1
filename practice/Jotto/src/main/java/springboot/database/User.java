package springboot.database;

import org.springframework.data.annotation.Id;
import java.util.ArrayList;

public class User {
    @Id
    public String id;

    public String name;
    public byte[] password_salt;
    public byte[] password_hash;
    public ArrayList<String> pastGameIds = new ArrayList<String>();

    public User(String name, byte[] password_salt, byte[] password_hash){
        this.name = name;
        this.password_salt = password_salt;
        this.password_hash = password_hash;
    }

    public String getGameId(int i){
        return pastGameIds.get(i);
    }

    public void addGameId(String id){
        pastGameIds.add(id);
    }

    @Override
    public String toString(){
        return String.format("User[id=%s, username='%s']", id, name);
    }
}
