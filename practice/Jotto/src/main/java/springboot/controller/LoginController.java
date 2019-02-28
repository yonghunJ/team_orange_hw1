package springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
    @RequestMapping(value = {"/"},method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @RequestMapping(value = {"/"}, method = RequestMethod.POST)
    @ResponseBody
    public int loginRequest(@RequestParam("login_id") String uname, @RequestParam("login_pw") String psw) {
        //System.out.println(uname);
        //System.out.println(psw);
        //@Autowired
        //UserRepository userRepository;
        //if (userRepository.exit())
        //  User user = userRepository.findByName(uname);
        //if (Passwords.isExpectedPassword(psw.toCharArray(), user.password_salt, user.password.hash))
        //return 0;
        //else return 1;
        //else return 2;
        return 0;
    }

}
