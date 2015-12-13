package cn.timed.utils;

import java.util.Random;

/**
 * Created by xuan on 15/12/13.
 */
public class TimedUtil {

    /**
     * 给手机号 用户名 加星号*
     *
     * @param result
     * @return
     */
    public static String getEncryptString(String result) {
        try {
            if (result.length() == 11) {
                return result.substring(0, 3) + "******" + result.substring(9, 11);
            } else if (result.length() == 3) {
                return result.substring(0, 1) + "**";
            } else if (result.length() == 2) {
                return result.substring(0, 1) + "*";
            } else {
                return result.substring(0, 1) + "**";
            }
        } catch (Exception e) {
            return null;
        }

    }

    /**
     * 生产随机字符串
     *
     * @param length
     * @return
     */
    public static String getRandString(int length) {
        String str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuffer buf = new StringBuffer();

        for (int i = 0; i < length; i++) {
            int num = random.nextInt(62);
            buf.append(str.charAt(num));
        }

        return buf.toString();
    }
}
