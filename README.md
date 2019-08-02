# 测试前端

## 数据结构体
```
{
    "name":"foo bar",
    "origin":{
        "pre":"https://liveamusecommpre.lizhi.fm",
        "dock":"http://192.168.10.237:8800",
        "prod":"https://liveamusecomm.lizhi.fm"
    },
    "global_input":{
        "token":"" 
    },
    "interface":[{
            "name":"api_get_set_list",
            "input":{ 
                "name":"new name",
                "index":0,
            },
            "path":"/testsets/\${index}",
            "method": "GET",  
            "application_json" : {
                "cmd":"\${cmd}",
                "describe":"hello world”，
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"       
        },
    ]
}
```

说明：
全局输入和每个接口的input都是输入一个JSON
变量在path和application_json内生效，但是要通过${}来转义设置。
返回值用RET来替代


输入实例
name            api_master_send_msg
input           {"cmd":"0"}
path            /dropim/webSend?session=${token}
method          POST
application_json    {"cmd":"${cmd}","describe":"hello world"}
headers         {}
assert          RET.rcode === 0

注意在js文件中用``输入长串字符串的时候，${foo}回去读取变量foo的值，故要\${foo}来转义