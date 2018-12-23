import axios from 'axios';

const Host = 'http://127.0.0.1:8800/testsets/';


export function get_set_list(cb) {
    fetch(Host).then((resp)=>{
        return resp.json();
    }).catch((error)=>{
        console.error(error);
    }).then((data)=>{
        if(cb && data) {
            cb(data);
        }
    });
}


export function get_set(index, cb) {
    fetch(Host+index).then((resp)=>{
        var aa =  resp.json();
        return aa;
    }).catch((error)=>{
        console.error(error);
    }).then((data)=>{
        if(cb) {
            cb(data);
        }
    })
}


export function post_new_set(name, cb) {
    const data = {
        "name":name,
        "origin":{
            "dock":"",
        },
        "global_input":{
             
        },
        "interface":[],
    };
    fetch(Host,{method:'POST',
                body:JSON.stringify(data),
                headers:{
                    'Content-Type':'application/json',
                }})
    .then((resp)=>{
        return resp.json();
    }).catch((error)=>{
        console.error(error);
    }).then((data)=>{
        if(cb) {
            cb(data);
        }
    })
}

export function delete_set(index, callback) {
    console.log(`delete set ${index}`);
}