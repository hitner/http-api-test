
const datasource = `
{
    "name":"foo bar",
    "origin":{
        "pre":"https://liveamusecommpre.lizhi.fm",
        "dock":"http://172.17.33.213:7102",
        "prod":"https://liveamusecomm.lizhi.fm"
    },
    "global_input":{
        "mount_id":"23412341234",                   
        "token":"__TOKEN" 
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