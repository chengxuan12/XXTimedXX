package cn.timed.dao;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDAO {

    User getUserById(Integer id);
    User getUserByEmail(String email);
    User getUserByPhone(String phone);
    List<User> getAllUser();

}
