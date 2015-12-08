package cn.timed.service;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.domain.User;
import cn.timed.domain.DataResult;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/user", produces = {"application/json", "application/xml"})
public interface UserService {

    int  insertUser(User user);
    User getUserById(Integer id);
    User getUserByEmail(String email);
    User getUserByPhone(String phone);


    List<User> getAllUser();


    @RequestMapping(value = "/login", method = RequestMethod.POST,
            produces = "application/json",
            consumes = {"application/xml", "application/json", "application/x-www-form-urlencoded"})
    public DataResult loginUser(@RequestParam(value = "mobileNumber", defaultValue = "") String mobileNumber,
                                @RequestParam(value = "password", defaultValue = "") String password);

    @RequestMapping(value = "/register/{randNum}", method = RequestMethod.POST,
            produces = "application/json",
            consumes = {"application/xml", "application/json", "application/x-www-form-urlencoded"})
    public DataResult registerUser(@RequestBody @Valid User user, @PathVariable("randNum") String randNum ,BindingResult result);

 }