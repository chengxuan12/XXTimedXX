package cn.timed.domain;


import java.util.Map;

public class DataResult implements java.io.Serializable {

	// Fields

	private int code;
	private Map<String, Object> result;
	private String message;

	public DataResult(){
	}
	public DataResult(int code,Map<String, Object> result, String message) {
		this.code = code;
		this.result = result;
		this.message = message;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}