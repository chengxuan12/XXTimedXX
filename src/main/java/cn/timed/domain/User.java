package cn.timed.domain;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by xuan on 15/11/29.
 */

public class User implements Serializable {

    private int id;
    private String mobilePhone;
    private String userAccount;
    private String realName;
    private String password;
    private String email;
    private short gender;
    private Timestamp createTime;
    private Timestamp birthday;

    public User() {
    }

    public User(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public User(int id, String email, String mobilePhone) {
        this.id = id;
        this.email = email;
        this.mobilePhone = mobilePhone;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public short getGender() {
        return gender;
    }

    public void setGender(short gender) {
        this.gender = gender;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Timestamp getBirthday() {
        return birthday;
    }

    public void setBirthday(Timestamp birthday) {
        this.birthday = birthday;
    }

}