package springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
    @RequestMapping(value = {"/"},method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @RequestMapping(value = {"/"}, method = RequestMethod.POST)
    public String loginRequest(@RequestParam("uname") String uname, @RequestParam("psw") String psw) {
        System.out.println(uname);
        System.out.println(psw);
        return "Succeed";
    }

}
