package springboot.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import springboot.service.GameManager;

import java.util.Scanner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JottoGameApplicationTests {
    @Test
    public void test() {
        System.out.println("input user word");
        String input = "stony";
        GameManager manager = new GameManager();
        manager.setUserWord(input);
        manager.setAiWord();
        System.out.println("--------------------------------------------------");
        System.out.println(manager.getUserWord());
        System.out.println(manager.getAiWord());
    }

}
