package cn.timed.domain;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by xuan on 15/11/29.
 */

public class User implements Serializable {

    private int id;
    private String mobilephone;
    private String useraccounnt;
    private String realname;
    private String password;
    private String email;
    private short gender;
    private Timestamp createTime;
    private Timestamp birthday;

    public User() {
    }

    public User(String email) {
        this.email = email;
    }

    public User(int id, String email, String mobilephone) {
        this.id = id;
        this.email = email;
        this.mobilephone = mobilephone;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMobilephone() {
        return mobilephone;
    }

    public void setMobilephone(String mobilephone) {
        this.mobilephone = mobilephone;
    }

    public String getUseraccounnt() {
        return useraccounnt;
    }

    public void setUseraccounnt(String useraccounnt) {
        this.useraccounnt = useraccounnt;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
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