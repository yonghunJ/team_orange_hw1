package springboot.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import springboot.database.Dictionary;
import springboot.database.GameRecord;
import springboot.database.User;
import springboot.database.UserRepository;
import springboot.model.GameRound;
import springboot.service.GameManager;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class GameController {
    private GameManager gameManager;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "http://orangeJotto.com/user_first_input", method = RequestMethod.GET)
    @ResponseBody
    public int getUserWordInput(@RequestParam(value = "user_first_input") String firstInput) {
        //this.gameManger = new GameManager();
        //gameManager.setUserWord(firstInput)
        if (this.gameManager == null)
            this.gameManager = new GameManager();
        // check vaild word
        /*
        if (this.gameManager.getJottoManager().getDict().isValidWord(firstInput)) {

            this.gameManager.setUserWord(firstInput);
            this.gameManager.setAiWord();
            return 0;
        } else{
            return 1;
        }
        */
        return 0;
    }

    @RequestMapping(value = "http://orangeJotto.com/user_guess", method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> getGuessWordInput(@RequestParam(value="user_guess") String input) {
        // int userGuessCount = this.gameController.getGuessCount(false);
        // int aiGuessCount = this.gameController.getGuessCount(true);
        // getGuessCount(flag)
        // false : user
        // true : ai
        HashMap<String, Object> response = new HashMap<>();

        /*
        if (this.gameManager.getJottoManager().getDict().isValidWord(firstInput)) {
            int userGuessCount = this.gameManager.getGuessCount(false);
            int aiGuessCount = this.gameManager.getGuessCount(true);
            String aiGuess = this.gameManager.getAiGuess();
            int roundResult = this.gameManager.setGameRound();
            response.put("is_valid_word",true);
            response.put("user_guess_count",userGuessCount);
            response.put("user_guess_word",this.gameManager.get);
            response.put("ai_guess_count",aiGuessCount);
            response.put("ai_guess",aiGuess);
            response.put("user_game_ended",true);
            response.put("ai_game_ended",true);
        } else {
            response.put("is_valid_word",false);
        }
        */
        return response;
    }

    // When game is finished, send game data to Data base
    public void sendData(HttpSession session) {
        User user = userRepository.findByName((String) session.getAttribute("user"));
        // GameRecord gameRecord = new GameRecord(new Date(), this.gameManager.getUserWord(), this.gameManager.getAiWord(), this.gameManager.getGameRoundList());
        // user.addGame(game);
        userRepository.save(user);
    }
}
