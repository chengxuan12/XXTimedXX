package cn.timed.service.Im;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.domain.User;


public interface UserService {

    int insertUser(User user);
    User getUser(Integer uid);
}