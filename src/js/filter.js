/**
 * Created by lifetea on 2017/4/17.
 * email: 494886251@qq.com
 * github: https://github.com/lifetea
 */
Vue.filter('dateFormat', function (value) {
    let res = value ? moment(value).format("YYYY-MM-DD") : '无';
    return res
})

Vue.filter('dateTimeFormat', function (value) {
    let res = value ? moment(value).format("YYYY-MM-DD hh:mm:ss") : '无';
    return res
})


// 会员等级 0-普通会员  1-初级服务中心 2-高级服务中心

Vue.filter('levelFormat', function (value) {
    let res = '普通会员'
    if(value == 1)
        res = '初级会员'
    if(value == 2)
        res = '高级会员'
    return res
})


Vue.filter('moneyFormat', function (value) {
    return accounting.format(value,2,',')
})


Vue.filter('countFormat', function (value) {
    let res = value? value : 0
    return res
})


Vue.filter('nameFormat', function (value) {
    let res = value? value : '未知'
    return res
})

Vue.filter('mgrNameFormat', function (value) {
    let res = value? value : '暂无'
    return res
})




// 状态 0：已处理、1：已失败、2：处理中


Vue.filter('creditCheckStatus', function (value) {
    let res = ''
    if(value == 0)
        res = '已处理'
    if(value == 2)
        res = '处理中'
    if(value == 1)
        res = '已失败'
    return res
})


// 投资状态 2：成功 3: 失败
// THE_DAY_BEARING("1", "初始"),
//     /** 成功 */
//     MORROW_BEARING("2", "成功"),
//     /** 撤销*/
//     SATISFY_BEARING("3", "撤销"),
//     /** 失败 */
//     ESTABLISH_BEARING("4", "失败")

Vue.filter('investStatus', function (value) {
    let res = ''
    if(value == 1)
        res = '初始'
    if(value == 2)
        res = '成功'
    if(value == 3)
        res = '撤销'
    if(value == 4)
        res = '失败'
    return res
})


// 状态 0-未还款 1-已还款 2-部分还款 3-逾期  4-逾期还款 5-违约处理 6-已兑付


Vue.filter('incomePlanStatus', function (value) {
    let res = '未知'
    if(value == 0)
        res = '未还款'
    if(value == 1)
        res = '已还款'
    if(value == 2)
        res = '部分还款'
    if(value == 3)
        res = '逾期'
    if(value == 4)
        res = '逾期还款'
    if(value == 5)
        res = '违约处理'
    if(value == 6)
        res = '已兑付'
    return res
})


// 状态 0-未还款 1-已还款 2-部分还款 3-逾期  4-逾期还款 5-违约处理 6-已兑付


Vue.filter('repaymentType', function (value) {
    let res = '未知'
    if(value == 0)
        res = '未还款'
    if(value == 1)
        res = '已还款'
    if(value == 2)
        res = '部分还款'
    if(value == 3)
        res = '逾期'
    if(value == 4)
        res = '逾期还款'
    if(value == 5)
        res = '违约处理'
    if(value == 6)
        res = '已兑付'
    return res
})

//
// NOT_RELEASED("0", "未发布"),
//     BIDDING("1", "投标中"),
//     INTEREST_IN("2", "计息中"),
//     TO_BE_RETURNED("3", "待返还"),
//     HAS_RETURNED("4", "已返还"),
//     HAS_ENDED("5", "已结束"),
//     ALREADY_REVOKED("6", "已撤销")

Vue.filter('lifeCycle', function (value) {
    let res = '未知'
    if(value == 0)
        res = '未发布'
    if(value == 1)
        res = '投标中'
    if(value == 2)
        res = '计息中'
    if(value == 3)
        res = '待返还'
    if(value == 4)
        res = '已返还'
    if(value == 5)
        res = '已结束'
    if(value == 6)
        res = '已撤销'
    return res
})



// 状态 0-未还款 1-已还款 2-部分还款 3-逾期未还款  4-逾期已还款 5-违约 6-已兑付
Vue.filter('outcomePlanStatus', function (value) {
    let res = '未知'
    if(value == 0)
        res = '未还款'
    if(value == 1)
        res = '已还款'
    if(value == 2)
        res = '部分还款'
    if(value == 3)
        res = '逾期未还'
    if(value == 4)
        res = '逾期已还'
    if(value == 5)
        res = '违约处理'
    if(value == 6)
        res = '已兑付'
    return res
})


// 生效状态 0：正常  1：失效

Vue.filter('creditStatus', function (value) {
    let res = ''
    if(value == 0)
        res = '正常'
    if(value == 1)
        res = '失效'
    return res
})


//1 利随本清  2 按月结息

Vue.filter('repayType', function (value) {
    let res = '未知'
    if(value == 1)
        res = '利随本清'
    if(value == 2)
        res = '按月结息'
    if(value == 3)
        res = '按季付息'
    return res
})
