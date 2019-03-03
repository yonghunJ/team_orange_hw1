package springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import springboot.database.GameRecord;
import springboot.database.User;
import springboot.database.UserRepository;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class PastGameResultController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/pastGameResult",method = RequestMethod.GET)
    @ResponseBody
    public List<String> handleUserGameListRequest(HttpSession session) {
        User user = userRepository.findByName((String) session.getAttribute("user"));
        if (user != null) {
            List<String> dateList = new ArrayList<>();
            for (int i = 0; i < user.pastGames.size(); i++) {
                dateList.add(user.getGame(i).date.toString());
            }
            return dateList;
        }
        return null;
    }

    @RequestMapping(value = "/pastGameResult/data", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<GameRecord> handleGameRecordRequest(@RequestParam(value = "data") String date, HttpSession session) {
        User user = userRepository.findByName((String) session.getAttribute("user"));
        if (user != null) {
            for (int i = 0; i < user.pastGames.size(); i++) {
                if (user.getGame(i).date.toString().equals(date)) {
                    return new ResponseEntity<GameRecord>(user.getGame(i), HttpStatus.OK);
                }
            }
        }
        return null;
    }
}
