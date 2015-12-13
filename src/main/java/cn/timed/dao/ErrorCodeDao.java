package cn.timed.dao;

import cn.timed.domain.ErrorCode;
import org.springframework.stereotype.Repository;

/**
 * Created by xuan on 15/12/5.
 */
@Repository
public interface ErrorCodeDao {
    ErrorCode getErrorCode(Integer id);
}
