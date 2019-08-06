
//const Host = 'http://139.180.139.19:8999/testsets/';
const Host = '/testsets/'

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
    const para = {
        method:'DELETE',
    }
    fetch(Host+index,para)
    .then((resp)=>{
        return resp.json();
    }).catch((error)=>{

    }).then((data)=>{
        if(callback) {
            callback(data);
        }
    })
}


export function patch_set(index, data,cb) {
    fetch(Host+index, {
        method:'PATCH',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
        }
    }).then((resp)=>{
        return resp.json();
    }).catch((error)=>{
        console.error(error);
    }).then((data)=>{
        if(cb) {
            cb(data);
        }
    }) 
}

export function post_api(setIndex, data, cb) {
    fetch(Host+setIndex+'/interface/',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
        }
    })
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

export function put_api(setIndex, apiIndex, data,cb) {
    fetch(Host+setIndex+'/interface/'+apiIndex,{
        method:'PUT',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
        }
    })
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


export function delete_api(setIndex, apiIndex,cb) {
    fetch(Host+setIndex+'/interface/'+apiIndex,{
        method:'DELETE',
    })
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