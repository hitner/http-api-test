
const datasource = `
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
            },
            "path":"/testsets",
            "method": "GET",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
                    
        },{
            "name":"api_add_file",
            "input":{ 
                "content":""
            },
            "path":"/testsets",
            "method": "POST",  
            "application_json" : {
                "name":"test",
                "content":"\${content}"
            },
            "headers":{
            },
            "assert":"RET.rcode === 0" 
        },{
            "name":"api_get_set_content",
            "input":{ 
                "index":0
            },
            "path":"/testsets/\${index}",
            "method": "GET",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_delete_set",
            "input":{ 
                "index":0 
            },
            "path":"/testsets/\${index}",
            "method": "DELETE",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0" 
        },{
            "name":"api_patch_set",
            "input":{ 
                "name":"new name",
                "index":0
            },
            "path":"/testsets/\${index}",
            "method": "PATCH",  
            "application_json" : {
                "name":"\${name}",
                "describe":"哈哈哈哈哈哈"
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_post_interface",
            "input":{ 
                "name":"new name",
                "index":0
            },
            "path":"/testsets/\${index}/interface",
            "method": "POST",  
            "application_json" : {
                "name":"\${name}",
                "describe":"哈哈哈哈哈哈",
                "method":"GET"
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_put_interface",
            "input":{ 
                "from_put":"it is from put",
                "index":0,
                "inter":0
            },
            "path":"/testsets/\${index}/interface/\${inter}",
            "method": "PUT",  
            "application_json" : {
                "name":"PUTkkkk",
                "describe":"哈哈哈哈哈哈dd",
                "method":"GET",
                "content":"\${from_put}"
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_delete_interface",
            "input":{ 
                "index":0,
                "inter":0
            },
            "path":"/testsets/\${index}/interface/\${inter}",
            "method": "DELETE",  
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
        },{
            "name":"api_slave_connect_to",
            "input":{ 
                
            },
            "path":"/dropim/connect?token=\${token}",
            "method": "GET",  
            "application_json" : {
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_slave_send_msg",
            "input":{ 
                "cmd":"0"
            },
            "path":"/dropim/clientSend?token=\${token}",
            "method": "POST",  
            "application_json" : {
                "cmd":"\${cmd}",
                "describe":"client"
            },
            "headers":{
            },
            "assert":"RET.rcode === 0"
        },{
            "name":"api_slave_long_poll",
            "input":{ 
                "seq":"0"
            },
            "path":"/dropim/syncClientMessages?token=\${token}&seq=\${seq}",
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


export const main_list = `
{
    "sets":[
        {
            "name":"one",
            "index":1,
            "size":233,
            "mtime":1523434343.1234

        },{
            "name":"two",
            "index":11,
            "size":233,
            "mtime":1523434343.1234
        },{ 
            "name":"three",
            "index":12,
            "size":233,
            "mtime":1523434343.1234
        },{
            "name":"four",
            "index":13,
            "size":233,
            "mtime":1523434343.1234
        }
    ]
}
`;

