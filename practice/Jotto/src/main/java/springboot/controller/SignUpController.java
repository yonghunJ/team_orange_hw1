package springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SignUpController {
    //@Autowired
    //private UserRepository userRepository;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public void signUpRequset(@RequestParam("signup_id") String id, @RequestParam("signup_pw") String pwd, @RequestParam("signup_name") String signup_name) {
        //userRepository.save(Passwords.createUser(id,psw));
    }
}
