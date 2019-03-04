package springboot.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.api.Http;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class GameController {
    private GameManager gameManager;
    int gameRoundCount;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/user_first_input", method = RequestMethod.GET)
    @ResponseBody
    public int getUserWordInput(@RequestParam(value = "user_first_input") String firstInput) {
        String upperString = firstInput.toUpperCase();
        if (this.gameManager == null)
            this.gameManager = new GameManager();

        // check valid word
        // Does it have 5 unique letters?
        if (this.gameManager.getJottoManager().getDict().isValidWord(upperString) && checkLetters(upperString)) {
            this.gameManager.setUserWord(upperString);
            this.gameManager.setAiWord();
            gameRoundCount = 0;
            return 0;
        } else{
            return 1;
        }
    }

    @RequestMapping(value = "/user_guess", method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> getGuessWordInput(@RequestParam(value="user_guess") String input, HttpSession session) {
        HashMap<String, Object> response = new HashMap<>();
        String upperInput = input.toUpperCase();

        if (this.gameManager.getJottoManager().getDict().isValidWord(upperInput)) {
            gameRoundCount++;
            this.gameManager.setUserGuess(upperInput);
            int userGuessCount = this.gameManager.getGuessCount(false);
            int aiGuessCount = this.gameManager.getGuessCount(true);
            String aiGuess = this.gameManager.getAiGuess();
            int roundResult = this.gameManager.setGameRound();
            response.put("is_valid_word",true);
            response.put("user_guess_count",userGuessCount);
            response.put("user_guess_word",upperInput);
            response.put("ai_guess_count",aiGuessCount);
            response.put("ai_guess",aiGuess);
            response.put("game_round_number", gameRoundCount);
            response.put("ai_color_array", this.gameManager.getGameRoundList().get(gameRoundCount-1));
            if (roundResult == 0) {
                response.put("user_game_ended",false);
                response.put("ai_game_ended",false);
            } else if (roundResult == 1) {
                response.put("user_game_ended",true);
                response.put("ai_game_ended",false);
                response.put("user_answer", this.gameManager.getUserWord());
                response.put("ai_annwer", this.gameManager.getAiWord());
                sendData(session);
                this.gameManager = null;
            } else {
                response.put("user_game_ended",false);
                response.put("ai_game_ended",true);
                response.put("user_answer", this.gameManager.getUserWord());
                response.put("ai_annwer", this.gameManager.getAiWord());
                sendData(session);
                this.gameManager = null;
            }
        } else {
            response.put("is_valid_word",false);
        }
        return response;
    }

    // When game is finished, send game data to Data base
    public void sendData(HttpSession session) {
        User user = userRepository.findByName((String) session.getAttribute("user"));
        GameRecord gameRecord = new GameRecord(new Date(), this.gameManager.getUserWord(), this.gameManager.getAiWord(), this.gameManager.getGameRoundList());
        if (user == null || gameRecord == null) {
            System.out.println("null");
        }
        user.addGame(gameRecord);
        userRepository.save(user);
    }

    public boolean checkLetters(String userWord) {
        ArrayList<Character> list = new ArrayList<Character>(5);

        for (int i = 0; i < 5; i++) {
            if (i == 0) {
                list.add(userWord.charAt(i));
            }
            else {
                if (list.contains(userWord.charAt(i))) {
                    return false;
                }
                list.add(userWord.charAt(i));
            }
        }
        return true;
    }
}
