package cn.timed.service;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.domain.User;
import cn.timed.domain.DataResult;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/user_api/v1", produces = {"application/json", "application/xml"})
public interface UserService {

    User getUserById(String id);
    User getUserByEmail(String email);
    User getUserByPhone(String phone);


    @RequestMapping(value = "/userList", method = RequestMethod.GET, produces = "application/json")
    public DataResult getAllUser();

   // List<User> getAllUser();


    @RequestMapping(value = "/login", method = RequestMethod.POST,
            produces = "application/json",
            consumes = {"application/x-www-form-urlencoded"})
    public DataResult loginUser(@RequestParam(value = "mobileNumber") String mobileNumber,
                                @RequestParam(value = "password") String password);

    @RequestMapping(value = "/register", method = RequestMethod.POST,
            produces = "application/json",
            consumes = {"application/x-www-form-urlencoded"})
    public DataResult registerUser(@RequestParam(value = "mobileNumber") String mobileNumber,
                                   @RequestParam(value = "password") String password);

 }