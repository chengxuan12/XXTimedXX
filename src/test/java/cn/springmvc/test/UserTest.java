package cn.springmvc.test;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.domain.User;
import cn.timed.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import java.util.List;

public class UserTest {

    private UserService userService;

    @Before
    public void before(){
        @SuppressWarnings("resource")
        ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:conf/spring.xml"
                ,"classpath:conf/spring-mybatis.xml"});
        userService = (UserService) context.getBean("userServiceImpl");
    }


    public void getAllUser(){
     //   List<User> userList=userService.getAllUser();
     //   System.out.println( userList.get(0));
    }
    @Test
    public void getUser(){
        User user = userService.getUserById("ur00000000001");
        System.out.println(user.getId());
    }
    public void addUser(){

    }

}