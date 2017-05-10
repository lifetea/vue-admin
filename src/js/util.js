/**
 * Created by lifetea on 2017/4/18.
 * email: 494886251@qq.com
 * github: https://github.com/lifetea
 */

let reqData = {
    mobiel:null,
    name:'lifetea',
    certNo:'',
    status:0
}

// console.log(reqData)

let dataClear = function (obj) {
    for (var a in obj){
        if(obj[a] === null || obj[a] === '' )
            delete obj[""+a]
    }
}

// dataClear(reqData)
//
// console.log(reqData)


let dataReset = function (obj) {
    for (var a in obj){
        obj[a] = null
    }
}


let getFile = function (response,fileName) {
    var headers             = response.headers;
    var blob                = new Blob([response.data],{type:headers['content-type']});
    var link                = document.createElement('a');
    link.href               = window.URL.createObjectURL(blob);
    link.download           = fileName;
    link.click();
}


export default {
    dataClear:dataClear,
    dataReset:dataReset,
    getFile:getFile
}