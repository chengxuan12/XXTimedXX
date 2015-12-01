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

import javax.annotation.Resource;


public class UserTest {


    private UserService userService;

    @Before
    public void before(){
        @SuppressWarnings("resource")
        ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:conf/spring.xml"
                ,"classpath:conf/spring-mybatis.xml"});
        userService = (UserService) context.getBean("userServiceImpl");
    }

    @Test
    public void getUser(){
        User user = userService.getUser(1);
        System.out.println(user.getId());
    }
    public void addUser(){

    }

}