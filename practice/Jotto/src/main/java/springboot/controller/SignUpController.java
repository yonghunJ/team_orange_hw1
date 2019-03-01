package springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import springboot.database.Passwords;
import springboot.database.UserRepository;

@Controller
public class SignUpController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/sexonthebeach", method = RequestMethod.POST)
    public void signUpRequset(@RequestParam("signup_id") String id, @RequestParam("signup_pw") String pwd) {
        userRepository.save(Passwords.createUser(id,pwd));
    }

    @RequestMapping(value = "http://orangeJotto.com/signup_id", method = RequestMethod.GET)
    @ResponseBody
    public int checkId(@RequestParam("signup_id") String id) {
        if (userRepository.findByName(id) != null) {
            return 1;
        } else {
            return 0;
        }
    }
}
