package cn.timed.dao;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.domain.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO {

    /**
     * 添加新用户
     * @param user
     * @return
     */
    int insertUser(User user);

    User getUser(Integer user);

}
