package cn.timed.controller;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/")
public class UserController {

    @Resource
    UserService userService;

    @RequestMapping("index")
    public String index(){
        return "index";
    }

}