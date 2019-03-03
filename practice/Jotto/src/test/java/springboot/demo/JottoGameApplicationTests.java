package springboot.demo;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import springboot.database.Dictionary;
import springboot.service.GameManager;

import java.util.Scanner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JottoGameApplicationTests {
    @Test
    public void test() {
        Scanner sc = new Scanner(System.in);
        GameManager gameManager = new GameManager();
        String userFirstInput = sc.nextLine();


        if (gameManager.getJottoManager().getDict().isValidWord(userFirstInput.toUpperCase())) {
            gameManager.setUserWord(userFirstInput.toUpperCase());
            gameManager.setAiWord();
            System.out.println("User's first input :" + userFirstInput);
            System.out.println("ai word : " + gameManager.getAiWord());

            while (true) {
                System.out.println("user guess");
                String input = sc.nextLine();
                if (input.equals("END"))
                    break;

                if (gameManager.getJottoManager().getDict().isValidWord(input.toUpperCase())) {
                    gameManager.setUserGuess(input.toUpperCase());
                    int userGuessCount = gameManager.getGuessCount(false);
                    int aiGuessCount = gameManager.getGuessCount(true);
                    String aiGuess = gameManager.getAiGuess();
                    int roundResult = gameManager.setGameRound();
                    System.out.println("user guess count : " + userGuessCount);
                    System.out.println("ai guess count : " + aiGuessCount);
                    System.out.println("ai guess :" + aiGuess);
                    if (roundResult == 0) {
                        System.out.println("game is not ended");
                    } else if (roundResult == 1) {
                        System.out.println("user wins the game");
                        break;
                    } else {
                        System.out.println("ai wins the game");
                        break;
                    }
                }
            }
        }
    }

    @Test
    public void dbtest() {
        MongoClient mongoClient = new MongoClient("ds125255.mlab.com", 25255);

        //System.out.println(mongoClient.listDatabaseNames());
        MongoDatabase db = mongoClient.getDatabase("heroku_vplcmjgw");
        System.out.println(db.getName());

        //MongoCollection collection = db.getCollection("words");
        //System.out.println(collection.countDocuments());

    }
}
