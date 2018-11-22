
const datasource = `
{
    "name":"foo bar",
    "origin":{
        "pre":"https://liveamusecommpre.lizhi.fm",
        "dock":"http://192.168.10.237:8881",
        "prod":"https://liveamusecomm.lizhi.fm"
    },
    "global_input":{
        "token":"" 
    },
    "interface":[{
            "name":"api_mount_list",
            "input":{ 

            },
            "path":"/mount/getMountList",
            "method": "GET",  
            "application_json" : {

            },
            "headers":{
            },
            "assert":"RET.rcode === 0" 
        },{
            "name":"api_user_info",
            "input":{ 
            },
            "path":"/mount/getUserInfo?token=\${token}",
            "method": "GET",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_buy_mount",
            "input":{ 
                "productId":"",
                "cmd":0,
                "type":0
            },
            "path":"/mount/buyMount?token=\${token}&productId=\${productId}&cmd=\${cmd}&type=\${type}",
            "method": "GET",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0" 
        },{
            "name":"api_test_error",
            "input":{ 
            },
            "path":"/mount/getUserError",
            "method": "GET",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_master_get_connect",
            "input":{ 
            },
            "path":"/dropim/getConnectionAttribute",
            "method": "GET",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_master_send_msg",
            "input":{ 
                "cmd":"0"
            },
            "path":"/dropim/webSend?session=\${token}",
            "method": "POST",  
            "application_json" : {
                "cmd":"\${cmd}",
                "describe":"hello world"
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_master_long_poll",
            "input":{ 
                "seq":"0"
            },
            "path":"/dropim/syncWebMessages?session=\${token}&seq=\${seq}",
            "method": "GET",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        }
    ],

    "cases":[{
            "name":"购买座驾后有改id",
            "process":"  api_buy_mount('12223232'); api_user_info().contain('12222232');"
        }
    ]
}

`;

export default datasource;