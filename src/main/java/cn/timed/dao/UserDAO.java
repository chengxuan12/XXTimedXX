package cn.timed.dao;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.model.User;


public interface UserDAO {

    /**
     * 添加新用户
     * @param user
     * @return
     */
    public int insertUser(User user);


}
