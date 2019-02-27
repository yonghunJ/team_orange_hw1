package springboot.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
        ArrayList<String> rounds = new ArrayList<String>();
        rounds.add("UserGuess:'TEETH'; ComputerGuess'MAKER'");
        rounds.add("UserGuess:'TOOTH'; ComputerGuess'HANDY'");
        rounds.add("UserGuess:'LOTTO'; ComputerGuess'PARKA'");
        rounds.add("UserGuess:'JOTTO'; ComputerGuess'SALTY'");
        GameRecord game = new GameRecord(new Date(), "SALTY", "BOATS", rounds);
        user.addGame(game);
        userRepository.save(user);

        user = userRepository.findByName("Coolkid27");
        game = user.getGame(0);
        System.out.println("First game by User 'Coolkid27':");
        System.out.println(game.toString());

    }
}
