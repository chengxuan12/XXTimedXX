package cn.timed.dao;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.domain.User;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Repository
public interface UserDAO {

    /**
     * 添加新用户
     * @param user
     * @return
     */
    int insertUser(User user);

    User getUserById(Integer id);
    User getUserByEmail(String email);
    User getUserByPhone(String phone);
    List<User> getAllUser();

}
