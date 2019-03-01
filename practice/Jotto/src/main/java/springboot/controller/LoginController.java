package springboot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import springboot.database.Passwords;
import springboot.database.User;
import springboot.database.UserRepository;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = {"/"},method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @RequestMapping(value = {"http://orangeJotto.com/login"}, method = RequestMethod.POST)
    @ResponseBody
    public int loginRequest(@RequestParam("login_id") String uname, @RequestParam("login_pw") String psw, HttpSession session) {
        User user = userRepository.findByName(uname);
        if (user != null) {
            if (Passwords.isExpectedPassword(psw.toCharArray(), user.password_salt, user.password_hash)) {
                session.setAttribute("user", uname);
                return 0;
            } else {
                return 1;
            }
        }else {
            return 2;
        }

    }

}
