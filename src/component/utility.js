export function pathOnly(str) {
    var pp = str.split('?')[0];
    return pp.split('#')[0];
}


export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}