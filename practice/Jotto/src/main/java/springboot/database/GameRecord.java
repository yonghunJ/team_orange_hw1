package springboot.database;

import org.springframework.data.annotation.Id;
import java.util.Date;
import java.util.List;
//import springboot.model.GameRound;

public class GameRecord {
    @Id
    public String id;

    public Date date;
    public String userWord;
    public String computerWord;
    public List<String> rounds;

    public GameRecord(Date date, String userWord, String computerWord, List<String> rounds){
        this.date = date;
        this.userWord = userWord;
        this.computerWord = computerWord;
        this.rounds = rounds;
    }

    @Override
    public String toString(){
        String s = String.format("GameRecord[id=%s, Date='%s', UserWord='%s', ComputerWord='%s', Rounds='%d']",
                id, date.toString(), userWord, computerWord, rounds.size());
        for(int i=0; i<rounds.size(); i++){
            s = s + String.format("\nRound%d[%s]", i+1, rounds.get(i));
        }
        return s;
    }
}
