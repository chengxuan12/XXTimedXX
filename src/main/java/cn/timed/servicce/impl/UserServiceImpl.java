package cn.timed.servicce.impl;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.dao.UserDAO;
import cn.timed.model.User;
import cn.timed.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    public int insertUser(User user) {
        // TODO Auto-generated method stub
        return userDAO.insertUser(user);
    }

}