package cn.timed.service.Im;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.dao.ErrorCodeDao;
import cn.timed.dao.UserDAO;
import cn.timed.domain.ErrorCode;
import cn.timed.domain.User;
import cn.timed.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

import cn.timed.domain.DataResult;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    ErrorCodeDao errorCodeDao;

    public User getUserById(Integer id) {
        return userDAO.getUserById(id);
    }

    public User getUserByEmail(String email) {
        return userDAO.getUserByEmail(email);
    }
    public User getUserByPhone(String phone){
        return userDAO.getUserByPhone(phone);
    }

    public DataResult getAllUser() {
        DataResult dataResult=new DataResult();
        List<User> users=userDAO.getAllUser();
        Map<String,Object> result=new LinkedHashMap<String, Object>();
        if (users.size()>0){
            dataResult.setCode(200);
            dataResult.setMessage("ok");
            result.put("items",users);
            dataResult.setResult(result);
            return dataResult;
        }
        dataResult.setCode(400);
        dataResult.setMessage("error");
        dataResult.setResult(result);
        return dataResult;
    }

    public DataResult loginUser(String mobileNumber, String password) {
        DataResult dataResult=new DataResult();
        if(password==""){
            dataResult.setCode(1001);
            ErrorCode errorCode= errorCodeDao.getCode(1001);
            dataResult.setMessage("密码"+errorCode.getMessage());
            return dataResult;

        }
        if(userDAO.getUserByEmail(mobileNumber).getPassword()==password){
            dataResult.setCode(200);
            dataResult.setMessage("登录成功");
            return dataResult;
        }else {
            dataResult.setCode(333);
        }
        return dataResult;
    }

    public DataResult registerUser(@RequestBody User user, @PathVariable("randNum") String randNum) {
        return null;
    }
}