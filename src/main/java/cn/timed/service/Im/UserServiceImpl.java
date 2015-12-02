package cn.timed.service.Im;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.dao.UserDAO;
import cn.timed.domain.User;
import cn.timed.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class UserServiceImpl implements UserService {

    @Resource
    UserDAO userDAO;

    @Override
    public int insertUser(User user) {
        // TODO Auto-generated method stub
        return userDAO.insertUser(user);
    }

    @Override
    public User getUser(Integer uid) {
        return userDAO.getUser(uid);
    }

}