export function pathOnly(str) {
    var pp = str.split('?')[0];
    return pp.split('#')[0];
}


