package cn.timed.service.Im;

/**
 * Created by xuan on 15/11/29.
 */

import cn.timed.dao.ErrorCodeDao;
import cn.timed.dao.SiAccountDao;
import cn.timed.dao.UserDAO;
import cn.timed.domain.ErrorCode;
import cn.timed.domain.SingleAccount;
import cn.timed.domain.User;
import cn.timed.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.*;

import cn.timed.domain.DataResult;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    ErrorCodeDao errorCodeDao;

    @Autowired
    SiAccountDao siAccountDao;

    public User getUserById(String id) {
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
        Map<String, Object> result = new HashMap<>();
        dataResult.setResult(result);
        ErrorCode errorCode;
        if(password==""){
            dataResult.setCode(1001);
            errorCode= errorCodeDao.getErrorCode(1001);
            dataResult.setMessage("密码"+errorCode.getMessage());
            return dataResult;
        }
        User user=userDAO.getUserByPhone(mobileNumber);
        if(user==null){
            dataResult.setCode(1003);
            errorCode= errorCodeDao.getErrorCode(1003);
            dataResult.setMessage(errorCode.getMessage());
            return dataResult;
        }
        if(user.getPassword().equals(password)){
            dataResult.setCode(200);
            dataResult.setMessage("登录成功");
            return dataResult;

        }else {
            dataResult.setCode(1002);
            errorCode= errorCodeDao.getErrorCode(1002);
            dataResult.setMessage(errorCode.getMessage());
            return dataResult;
        }
    }

    public DataResult registerUser(String mobileNumber, String password) {

        DataResult dataResult=new DataResult();
        Map<String, Object> result = new HashMap<>();
        dataResult.setResult(result);
        ErrorCode errorCode;
        if(password==""){
            dataResult.setCode(1001);
            errorCode= errorCodeDao.getErrorCode(1001);
            dataResult.setMessage("密码"+errorCode.getMessage());
            return dataResult;
        }
        User user=userDAO.getUserByPhone(mobileNumber);
        if(user!=null){
            dataResult.setCode(1004);
            errorCode= errorCodeDao.getErrorCode(1004);
            dataResult.setMessage(errorCode.getMessage());
            return dataResult;
        }

        User nUser=new User();
        SingleAccount siAccount=new SingleAccount();
        nUser.setCreateTime(new Timestamp(new Date().getTime()));
        nUser.setId("ur00000000003");
        nUser.setMobilePhone(mobileNumber);
        nUser.setPassword(password);

        siAccount.setId("sa00000000003");
        siAccount.setUserId("ur00000000003");
        try {
            userDAO.insert(nUser);
            siAccountDao.insert(siAccount);
            dataResult.setCode(200);
            dataResult.setMessage("用户注册成功");
            return dataResult;

        } catch (Exception e) {
            dataResult.setCode(1006);
            errorCode= errorCodeDao.getErrorCode(1006);
            dataResult.setMessage(errorCode.getMessage());
            return dataResult;
        }

    }
}