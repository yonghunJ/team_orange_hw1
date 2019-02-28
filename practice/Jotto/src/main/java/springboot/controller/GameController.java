package springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GameController {
    //GameManager gameManger;

    @RequestMapping(value = "/gameplay")
    public String gamePlay() {
        //this.gameController = new GameController();
        return "gameplay";
    }

    @RequestMapping(value = "/qweqweasd", method = RequestMethod.GET)
    public void getUserWordInput(@RequestParam(value = "firstWord") String firstInput) {
        // gameManager = new GameManager();
        // gameManager.setUserWord(firstInput)
    }

    @RequestMapping(value = "/gameplay/userinput", method = RequestMethod.POST)
    public @ResponseBody String[] getGuessWordInput(@RequestParam(value="userinput", required = true) String input) {
        String[] responseArray = new String[3];
        // int userGuessCount = this.gameController.getGuessCount(false);
        // int aiGuessCount = this.gameController.getGuessCount(true);
        // getGuessCount(flag)
        // false : user
        // true : ai
        // return String array : ai guess word, user guess count, ai guess count

        return responseArray;
    }

    // When game is finished, send game data to Data base
    public void sendData() {

    }
}
