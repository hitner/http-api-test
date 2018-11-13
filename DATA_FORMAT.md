# CaseSet数据
`{
    "name":"foo bar",                               //名称，
    "origin":{                                      
        "pre":"https://liveamusecommpre.lizhi.fm",
        "dev":"http://172.17.33.213:7102",
        "prod":"https://liveamusecomm.lizhi.fm"
    },
    "global_input":{                                  //可为空
        "mount_id":"23412341234",                    //可有默认值,双下滑线需要系统处理
        "token":"__TOKEN",
    },
    "interface":[{
            "name":"api_mount_list",
            "input": {              //额外的输入框

            },
            "path":"/mount/getMountList",
            "method": "GET",  
            "application_json" : {

            },
            "headers":{
                //额外的header
            },
            "assert":"RET.rcode === 0" //可为空

        },{
            "path":"/mount/getUserInfo",
            "para": {
                "token":"${TOKEN}",
                "userId":"${UID}"
            },
            "assert":[
                "RET.rcode === 0"
            ]
        }
    ],

    "cases":[{
            "describe":"购买座驾后有改id",
            "process":"  api_buy_mount('12223232'); api_user_info().contain('12222232');",
        }
    ]
}
`