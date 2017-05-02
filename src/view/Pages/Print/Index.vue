<template>
    <div class="print-wrp">
        <div class="data-wrp">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="借款合同号:">
                    <el-input size="small" v-model="form.contract"></el-input>
                </el-form-item>
                <el-form-item label="借款日期:">
                    <el-date-picker
                            format="yyyy-MM-dd"
                            size="small"
                            v-model="form.borrowdate"
                            type="date"
                            placeholder="借款日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="到期日期:">
                    <el-date-picker
                            format="yyyy-MM-dd"
                            size="small"
                            v-model="form.duedate"
                            type="date"
                            placeholder="到期日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="金额:">
                    <el-input type="number" size="small" v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                    <el-input size="small" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="开户行:">
                    <el-input size="small" v-model="form.bank"></el-input>
                </el-form-item>
                <el-form-item label="结息账户:">
                    <el-input size="small" v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="doPrint" type="primary">打印</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="mydiv">
            <form id="WebForm1" method="post" >
                    <table border="0" width="620px" class="fontsize">
                        <tr><td align="left">尊敬的投资人{{form.name}}：</td><td></td> <td> </td></tr>
                        <tr><td align="left"><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>感谢您对安快金融的信任与支持，您本次的出借详情如下：</td><td></td><td></td></tr>
                        <tr><td align="left" class="fontsize">出借信息</td><td></td><td></td></tr>
                    </table>
                    <table border="0"  class="fontsize">
                        <tr>
                            <td align="left" style="background:#CDC9C9" class="tdwidth">出借合同号：</td>
                            <td class="tdwidth">{{form.contract}}</td>
                            <td class="tdwidth"></td>
                            <td class="tdwidth"></td>
                        </tr>
                        <tr>
                            <td align="left" style="background:#CDC9C9" class="tdwidth">出借金额：</td>
                            <td class="tdwidth">{{parseFloat(form.money/10000)}}万元</td>
                            <td style="background:#CDC9C9" class="tdwidth">出借期限：</td>
                            <td class="tdwidth"><div id="lll">{{limit}}天</div></td>
                        </tr>
                        <tr>
                            <td align="left" style="background:#CDC9C9" class="tdwidth">出借年利率：</td>
                            <td class="tdwidth">{{parseFloat(rate*12).toFixed(2)}}%</td>
                            <td style="background:#CDC9C9" class="tdwidth">本息收益：</td>
                            <td class="tdwidth">
                                {{parseFloat(calTotal()).toFixed(2)}}
                                <div id="aaa"></div>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="background:#CDC9C9" class="tdwidth">开户行：</td>
                            <td class="tdwidth">{{form.bank}}</td>
                            <td style="background:#CDC9C9" class="tdwidth">结息账户：</td>
                            <td class="tdwidth">{{form.account}}</td>
                        </tr>
                        <tr>
                            <td align="left" style="background:#CDC9C9" class="tdwidth">出借日期：</td>
                            <td class="tdwidth">{{dateFormat(form.borrowdate)}}</td>
                            <td style="background:#CDC9C9" class="tdwidth">到期日期：</td>
                            <td class="tdwidth">{{dateFormat(form.duedate)}}</td>
                        </tr>
                        <tr>
                            <td align="left">收益演示</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                <table border="1" cellspacing="0px" width="600px" class="fontsize">
                    <tr>
                        <td width="20%" align="center">结息日期</td>
                        <td width="20%" align="center">计息天数</td>
                        <td width="20%" align="center">结算利息</td>
                        <td width="20%" align="center">应付本金</td>
                        <td width="20%" align="center">本息收益</td>
                    </tr>
                    <template v-for="item in list" >
                        <tr>
                            <td>{{item.expiry}}</td>
                            <td>{{item.days}}</td>
                            <td>{{parseFloat(item.interest).toFixed(2)}}</td>
                            <td>{{parseFloat(item.capital).toFixed(2)}}</td>
                            <td>{{parseFloat(item.total).toFixed(2)}}</td>
                        </tr>
                    </template>
                </table>
                <div align="left" class="fontsize">*以上收益测算仅供参考，具体收益以实际结算为准。 </div>
            </form>
        <!--</div>-->
    </div>



        <!--<div align="left">-->
            <!--<el-button @click="doPrint" type="primary">打印</el-button>-->
            <!--<input class="Noprn" id="print" type="button"  value="打印"/>-->
            <!--<input type="button" id="backone" name="reback" value="返回" onclick="window.history.go(-1)">-->
            <!--<% Double sum = sumMoney2+money;-->
            <!--DecimalFormat df = new DecimalFormat("#.00");-->
            <!--sum = Double.parseDouble(df.format(sum));-->
            <!--%>-->
            <!--<div id="summoney2"><%=sum %></div>-->
            <!--<div id="limit">{{limit}}天</div>-->
            <!--<script type="text/javascript">-->
                <!--var vv= document.getElementById('summoney2').innerHTML;-->
                <!--document.getElementById('aaa').innerHTML=vv;-->
                <!--var ll=document.getElementById('limit').innerHTML;-->
                <!--document.getElementById('lll').innerHTML=ll;-->
            <!--</script>-->
        <!--</div>-->
    </div>
</template>
<style lang="scss">

    @media print{
        .print {display:block;}
        .notPrint {display:none;}
        .Noprn,.data-wrp { DISPLAY: none }
    }
    .print-wrp{
        display: flex;
    }
    .data-wrp{
        width: 20rem;
        padding: 1rem;
    .el-input{
        width: 100% !important;
    }
    }
    .mydiv{
        flex: 1;
        position:absolute;
        left:27%;
        top:15%;
        /*padding-top: 2rem;*/
        margin:-100px 0 0 -150px
    }
    td{
        text-align:left;
    }
    .tdwidth{
        width:116px;
    }
    .fontsize{
        font-size:13px;
        font-family:Arial,"宋体";
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                form:{
                    contract:'',
                    borrowdate:'',
                    duedate:'',
                    money:'',
                    name:'',
                    bank:'',
                    account:''
                },
            }
        },
        computed:{
            limit:function () {
                let f   = this.form;
                var b   = moment(f.borrowdate);
                var d   = moment(f.duedate);
                let res = d.diff(b, 'days') // 1
                if(Number.isNaN(res))
                    res = 0
                return res
            },
            rate:function () {
                let res     = 0
                let limit   = this.limit
                if(limit>=30 && limit <= 90)
                    res = 7.2/12   //月利率 百分之 0.6   7.2% 年化
                if(limit>=120 && limit <= 270)
                    res = 0.625 //  月利率 百分之 0.625   7.5% 年化
                if(limit>=300 && limit <= 365)
                    res = 8/12 //  月利率 百分之 0.6666   8% 年化
                return parseFloat(res)
            },
            list:function () {
                const that  = this;
                let res     = []
                let f       =  this.form
                if(that.limit>=30 && that.limit <= 90){
                    console.log(that.rate/30,that.limit,parseFloat(f.money))
                    let interest = that.calInterest(that.limit,that.rate/30,f.money)
                    res.push({
                        'expiry':that.dateFormat(f.duedate),
                        'days':that.limit,
                        'interest':interest,
                        'capital':f.money,
                        'total':parseFloat(f.money) + interest
                    })
                }

                if((that.limit>=120 && that.limit <= 270)||(that.limit>=300 && that.limit <= 365)){
                    let start   = moment(f.borrowdate)
                    let end     = moment(f.duedate)
                    let current = start.clone()
                    let next    = current.clone().add(1,'month').set('date',20)
                    console.log('current:',current.format())
                    console.log('next:',next.format())
                    let interest= 0
                    while (next.get('year') != end.get('year') || next.get('month') != end.get('month')){
                        let days = next.diff(current,'days')
                        console.log('days:',next.diff(current,'days'))
                        interest = that.calInterest(days,that.rate/30,f.money)
                        console.log('利息',interest)
                        res.push({
                            'expiry':that.dateFormat(next),
                            'days':days,
                            'interest':interest,
                            'capital':0,
                            'total':interest
                        })
                        let temp  = next.clone()
                        next      = next.clone().add(1,'month').set('date',20)
                        current   = temp
                        console.log('next:',next.format())
                        console.log('current:',current.format())
                        console.log('month',current.get('month'))
                    }
                    let lastDays = end.diff(current,'days')
                    interest = that.calInterest(lastDays,that.rate/30,f.money)
                    console.log('最后一个次天数',lastDays)
                    res.push({
                        'expiry':that.dateFormat(end),
                        'days':lastDays,
                        'interest':interest,
                        'capital':f.money,
                        'total':parseFloat(interest+parseFloat(f.money)).toFixed(2)
                    })
//                    console.log(that.rate/30,that.limit,parseFloat(f.money))
//                    let interest = that.calInterest(that.limit,that.rate/30,f.money)
//                    res.push({
//                        'expiry':that.dateFormat(f.duedate),
//                        'days':that.limit,
//                        'interest':interest,
//                        'capital':f.money,
//                        'total':parseFloat(f.money) + interest
//                    })
                }

                return res
            }
        },
        methods:{
            doPrint(){
//                document.getElementById('print').style.display='none';
//                document.getElementById('summoney2').style.display='none';
                window.print();
            },
            dateFormat(val){
                let res = ''
                if(!!val)
                    res = moment(val).format("YYYY-MM-DD")
                return res
            },
            calInterest(days=0,rate=0,capital=0){
                console.log('测试',parseFloat(rate),'总共',(parseInt(days)*parseFloat(rate)).toFixed(4)*parseFloat(capital))
                return Math.floor((parseInt(days)*parseFloat(rate)*parseFloat(capital)/100).toFixed(3)*100)/100
            },
            calTotal(){
                let list = this.list;
                let res  = 0
                list.forEach(item=>{

                    res += parseFloat(item.total)
                    console.log('总共',item.total,'合计',res)
                })
                return res
            }
        },
        components:{

        }
    }
</script>
