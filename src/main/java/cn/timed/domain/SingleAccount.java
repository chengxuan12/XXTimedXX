package cn.timed.domain;

/**
 * Created by xuan on 15/12/13.
 */
public class SingleAccount {
    private String id;
    private String userId;

    public SingleAccount(){}
    public SingleAccount(String id, String userId) {
        this.id = id;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
