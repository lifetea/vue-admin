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

export default {
    dataClear:dataClear
}