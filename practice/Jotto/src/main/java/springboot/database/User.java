package springboot.database;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document
@Getter @Setter
public class User {
    @Id
    public String id;

    public String name;
    public byte[] password_salt;
    public byte[] password_hash;
    public ArrayList<GameRecord> pastGames = new ArrayList<GameRecord>();

    public User(String name, byte[] password_salt, byte[] password_hash){
        this.name = name;
        this.password_salt = password_salt;
        this.password_hash = password_hash;
    }

    public GameRecord getGame(int i){
        return pastGames.get(i);
    }

    public void addGame(GameRecord game){
        pastGames.add(game);
    }

    @Override
    public String toString(){
        return String.format("User[id=%s, username='%s']", id, name);
    }
}
