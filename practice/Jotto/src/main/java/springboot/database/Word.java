package springboot.database;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Word {
    @Id
    public String id;

    @TextIndexed
    private String word;

    private List<String> letters;

    public Word(String word, List<String> letters){
        this.word = word;
        this.letters = letters;
    }

    public String toString(){return word;}

}
