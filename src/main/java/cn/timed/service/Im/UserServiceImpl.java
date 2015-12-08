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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import cn.timed.domain.DataResult;
import javax.validation.Valid;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private ErrorCodeDao errorCodeDao;

    @Autowired
    private UserService userService;


    public int insertUser(User user) {
        // TODO Auto-generated method stub
        return userDAO.insertUser(user);
    }
    public User getUserById(Integer id) {
        return userDAO.getUserById(id);
    }

    public User getUserByEmail(String email) {
        return userDAO.getUserByEmail(email);
    }
    public User getUserByPhone(String phone){
        return userDAO.getUserByPhone(phone);
    }
    public List<User> getAllUser() {
        return userDAO.getAllUser();
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

    public DataResult registerUser(@RequestBody @Valid User user, @PathVariable("randNum") String randNum, BindingResult result) {
        return userService.registerUser(user,randNum,result);
    }
}