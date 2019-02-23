package springboot.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyTest implements CommandLineRunner{

    @Autowired
    private UserRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(MyTest.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        repository.deleteAll();

        // create a couple users
        repository.save(Passwords.createUser("Coolkid27", "hunter2"));
        repository.save(Passwords.createUser("AvengersFan", "ilovetonystark"));

        System.out.println("Users found with findAll():");
        System.out.println("-------------------------------");
        for(User user : repository.findAll()){
            System.out.println(user);
        }
        System.out.println();

        // find individual customer
        User user = repository.findByName(("Coolkid27"));
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

    }
}
