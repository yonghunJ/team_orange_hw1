package springboot.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springboot.model.GameRound;

import java.util.ArrayList;
import java.util.Date;

@SpringBootApplication
public class MyTest implements CommandLineRunner{

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(MyTest.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        userRepository.deleteAll();

        Dictionary dictionary = new Dictionary();

        System.out.println("Getting random words");
        System.out.println("-------------------------------");
        for(int i=0; i<10; i++) {
            System.out.println(dictionary.getWord(new char[]{}, new char[]{}, null, new String[]{}));
        }

        System.out.println("Getting random words containing 'W'");
        System.out.println("-------------------------------");
        for(int i=0; i<10; i++) {
            System.out.println(dictionary.getWord(new char[]{'W'}, new char[]{}, null, new String[]{}));
        }

        System.out.println("Getting random words containing 'T' but not 'W'");
        System.out.println("-------------------------------");
        for(int i=0; i<10; i++) {
            System.out.println(dictionary.getWord(new char[]{'T'}, new char[]{'W'}, null, new String[]{}));
        }

        System.out.println("Getting random words containing 'T' but aren't 'SALTY'");
        System.out.println("-------------------------------");
        for(int i=0; i<10; i++) {
            System.out.println(dictionary.getWord(new char[]{'T'}, new char[]{}, null, new String[]{"SALTY"}));
        }

        System.out.println(String.format("'SALTY' is a word? %b", dictionary.isValidWord("SALTY")));
        System.out.println(String.format("'AAAAA' is a word? %b", dictionary.isValidWord("AAAAA")));

        /**
        // create a couple users
        userRepository.save(Passwords.createUser("Coolkid27", "hunter2"));
        userRepository.save(Passwords.createUser("AvengersFan", "ilovetonystark"));

        System.out.println("Users found with findAll():");
        System.out.println("-------------------------------");
        for(User user : userRepository.findAll()){
            System.out.println(user);
        }
        System.out.println();

        // find individual customer
        User user = userRepository.findByName(("Coolkid27"));
        System.out.println("User found with findByName('Coolkid27'):");
        System.out.println("--------------------------------");
        System.out.println(user);

        // test login
        System.out.println("Attempting login with password 'password'");
        System.out.println("Login Successful? " +
                Passwords.isExpectedPassword(("password").toCharArray(), user.password_salt, user.password_hash));
        System.out.println("Attempting login with password 'hunter2'");
        System.out.println("Login Successful? " +
                Passwords.isExpectedPassword(("hunter2").toCharArray(), user.password_salt, user.password_hash));
        System.out.println();

        // test saving games
        ArrayList<GameRound> rounds = new ArrayList<GameRound>();
        rounds.add(new GameRound("TEETH","MAKER", new int[]{1,0,0,1,0}, new int[]{0,1,0,0,0}));
        rounds.add(new GameRound("TOOTH","HANDY", new int[]{1,1,1,1,0}, new int[]{0,1,0,0,1}));
        rounds.add(new GameRound("LOTTO","PARKA", new int[]{0,1,1,1,1}, new int[]{0,1,0,0,1}));
        rounds.add(new GameRound("JOTTO","SALTY", new int[]{0,1,1,1,1}, new int[]{1,1,1,1,1}));
        GameRecord game = new GameRecord(new Date(), "SALTY", "BOATS", rounds);
        user.addGame(game);
        userRepository.save(user);

        user = userRepository.findByName("Coolkid27");
        game = user.getGame(0);
        System.out.println("First game by User 'Coolkid27':");
        System.out.println(game.toString());
        **/
    }
}
