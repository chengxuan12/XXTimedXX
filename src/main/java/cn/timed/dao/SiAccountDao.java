package cn.timed.dao;

import cn.timed.domain.SingleAccount;
import org.springframework.stereotype.Repository;

/**
 * Created by xuan on 15/12/13.
 */
@Repository
public interface  SiAccountDao {
    void insert(SingleAccount sAccount);
}
