package springboot.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SignUpController {
    //@Autowired
    //private UserRepository userRepository;

    @RequestMapping(value = "/zxczxczxc", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> signUpRequset(@RequestParam("signup_id") String id, @RequestParam("signup_pw") String pwd, @RequestParam("signup_name") String signup_name) {
        //userRepository.save(Passwords.createUser(id,psw));
        /*
        if id exists
        return new ResponseEntity<>("id already exists",HttpStatus.BAD_REQUEST);
         */
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
