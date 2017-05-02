<template>
    <div class="stat-loan">
        <lever-bar :lever="{'p':'统计','c':'客户信息查询'}"></lever-bar>
        <div class="stat-box">
            <div class="search-box">
                <el-form   :model="formInline" label-width="66px" >
                    <el-select @change="mixChange"  v-model="mix.value" placeholder="条件" size="small" class="middle">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-show="mix.value == 1 " size="small"  v-model="search.name" :placeholder="'请输入姓名'"></el-input>
                    <el-input v-show="mix.value == 2 " size="small"  v-model="search.mobile" :placeholder="'请输入手机'"></el-input>
                    <el-input v-show="mix.value == 3 " size="small"  v-model="search.certNo" :placeholder="'请输入身份证'"></el-input>
                    <el-form-item label="借款余额">
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.borrowAmtMinT" placeholder="金额"></el-input>
                        <span>-</span>
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.borrowAmtMaxT" placeholder="金额"></el-input>
                    </el-form-item>
                    <el-form-item label="投资余额">
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.investAmtMinT" placeholder="金额"></el-input>
                        <span>-</span>
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.investAmtMaxT" placeholder="金额"></el-input>
                    </el-form-item>
                    <el-form-item label="授信余额">
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.remainedAmtMinT" placeholder="金额"></el-input>
                        <span>-</span>
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.remainedAmtMaxT" placeholder="金额"></el-input>
                    </el-form-item>
                    <el-form-item label="社区经理">
                        <el-select class="lang" size="small"
                                   filterable
                                   :filter-method="filterMethod"
                                   @visible-change="expandHandler"
                                   :loading="staffLoading"
                                   v-model="search.jobNum" placeholder="请选择">
                            <el-option :label="'全部'" :value="''"></el-option>
                            <el-option-group
                                    v-for="group in staffList"
                                    :key="group.label"
                                    :label="group.label">
                                <el-option
                                        v-for="item in group.options"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.value">
                                    <span style="float: left">{{ item.name }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.no }}</span>
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="100px" label="关联借款笔数">
                        <el-input size="small" min="0" type="number" class="money" v-model.lazy="search.loanCountMin" placeholder="起始笔数"></el-input>
                        <span>-</span>
                        <el-input size="small" min="0" type="number" class="money" v-model.lazy="search.loanCountMax" placeholder="截至笔数"></el-input>
                    </el-form-item>
                    <el-form-item label-width="100px" label="关联投资笔数">
                        <el-input size="small" min="0" type="number" class="money" v-model.lazy="search.investCountMin" placeholder="起始笔数"></el-input>
                        <span>-</span>
                        <el-input size="small" min="0" type="number" class="money" v-model.lazy="search.investCountMax" placeholder="截至笔数"></el-input>
                    </el-form-item>
                    <el-form-item label="注册时间">
                        <!--<el-select  placeholder="条件" v- size="small" class="middle">-->
                            <!--<el-option :label="'注册时间'" :value="1"></el-option>-->
                            <!--<el-option :label="'服务时间'" :value="2"></el-option>-->
                        <!--</el-select>-->
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.registerTimeMinT"
                                type="datetime"
                                placeholder="开始日期时间">
                        </el-date-picker>
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.registerTimeMaxT"
                                type="datetime"
                                placeholder="截至日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="绑卡时间">
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.bindCardTimeMinT"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.bindCardTimeMaxT"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="30px">
                        <el-button size="small" type="primary">重置</el-button>
                        <el-button @click.native="doSearch" size="small" type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="result-box">
                <span>客户数:{{ totals.userCount }}</span>
                <span>借款余额:{{ totals.borrowAmtTotal | moneyFormat }}</span>
                <span>投资余额:{{ totals.inventAmtTotal | moneyFormat }}</span>
                <span>平台存量人均借款额度:{{ totals.perPlatformBorrowAmt | moneyFormat }}</span>
                <span>平台人均投资额度:{{ totals.perPlatformInvestAmt | moneyFormat }}</span>
                <span>平台累计服务客户总数:{{totals.userPlatformCount}}</span>

                <div class="pull-right">
                    <a href="#">
                        <span>导出</span>
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                        <span>导出全部</span>
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>

        <div @mousewheel.prevent="test" class="table">
            <el-table
                    :data="list"
                    :stripe="true"
                    border
                    style="width: 100%">
                <el-table-column
                        align="center"
                        label="姓名"
                        width="100"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.name | nameFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        align="center"
                        label="手机号"
                        width="120"
                        >
                </el-table-column>
                <el-table-column
                        prop="certNo"
                        label="身份证号"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="关联借款笔数"
                        align="center"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.loanCount | countFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="关联投资笔数"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.investCount | countFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="借款余额"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.borrowAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="投资余额"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.investAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="授信余额"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.remainedAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        align="center"
                        label="江西银行电子账户"
                        width="200"
                        >
                </el-table-column>
                <el-table-column
                        prop="cardNo"
                        align="center"
                        label="绑定银行卡号"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        label="注册时间"
                        width="180"
                >
                    <template scope="scope">
                        <span>{{ scope.row.registerTime | dateTimeFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="zip"
                        align="center"
                        label="绑卡时间"
                        width="180"
                >
                    <template scope="scope">
                        <span>{{ scope.row.bindCardTime | dateTimeFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="社区经理"
                        width="120"
                >
                    <template scope="scope">
                        <span>{{ scope.row.mgrName}} - {{ scope.row.jobNum}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer-box">
            <span v-if="startRow" class="pull-left">显示{{startRow}}-{{endRow}} 总共有{{total}}条目</span>
            <div class="pagination pull-right">
                <el-pagination
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div>
        </div>

    </div>

</template>

<script>
    import leverBar         from    '../../Com/LeverBar.vue'
    import Staff            from    '../../../data/loan/staff'
    import Util             from    '../../../js/util'


    let wrpEle;
    let ops =[
//        {
//            value: '0',
//            label: '合同号'
//        },
        {
            value: '1',
            label: '姓名'
        },
        {
            value: '2',
            label: '手机号'
        },
        {
            value: '3',
            label: '身份证'
    }]
    export default {
        data() {
            return {
                list: [],
                options: ops,
                value: '',
                mix:{
                    //混合选项 合同 身份证 手机号
                    value:'1',
                },
                totals:{

                },
                search:{
                    //用户姓名
                    name:'',
                    //手机号
                    mobile:'',
//                    身份证
                    certNo:'',
                    //授信总额
                    creditAmtMin:'',
                    creditAmtMinT:'',
                    creditAmtMax:'',
                    creditAmtMaxT:'',
                    //授信余额
                    borrowAmtMin:'',
                    borrowAmtMax:'',
                    borrowAmtMinT:'',
                    borrowAmtMaxT:'',
//                    投资余额
                    investAmtMin:'',
                    investAmtMinT:'',
                    investAmtMax:'',
                    investAmtMaxT:'',
//                    授信余额
                    remainedAmtMin:'',
                    remainedAmtMinT:'',
                    remainedAmtMax:'',
                    remainedAmtMaxT:'',
//                    授信笔数
                    loanCountMin:null,
                    loanCountMax:null,
//                    授信笔数
                    investCountMin:null,
                    investCountMax:null,
//                    注册时间
                    registerTimeMinT:null,
                    registerTimeMin:null,
                    registerTimeMaxT:null,
                    registerTimeMax:null,
//                  绑卡时间
                    bindCardTimeMin:null,
                    bindCardTimeMinT:null,
                    bindCardTimeMax:null,
                    bindCardTimeMaxT:null,
                    //授信时间
                    startDateMin:'',
                    startDateMinT:'',
                    startDateMax:'',
                    startDateMaxT:'',
                    endDateMin:'',
                    endDateMinT:'',
                    endDateMax:'',
                    endDateMaxT:'',
                    status:null,
                    creditCheckStatus:null,
                    jobNum:''
                },
                staffList: Staff.list,
                staffLoading:false,
            }
        },
        watch: {
            "search.borrowAmtMinT": function (val) {
                this.search.borrowAmtMin = val ? accounting.format(val, 0, '') : null
            },
            "search.borrowAmtMaxT": function (val) {
                this.search.borrowAmtMax = val ? accounting.format(val, 0, '') : null
            },

            "search.investAmtMinT": function (val) {
                this.search.investAmtMin = val  ? accounting.format(val, 0, '') : null
            },
            "search.investAmtMaxT": function (val) {
                this.search.investAmtMax = val ? accounting.format(val, 0, '') : null
            },
            "search.remainedAmtMinT": function (val) {
                this.search.remainedAmtMin = val ? accounting.format(val, 0, '') : null
            },
            "search.remainedAmtMaxT": function (val) {
                this.search.remainedAmtMax = val ? accounting.format(val, 0, '') : null
            },
            "search.registerTimeMinT": function (val) {
                if (val)
                    this.search.registerTimeMin = new Date(val).getTime()
            },
            "search.registerTimeMaxT": function (val) {
                if (val)
                    this.search.registerTimeMax = new Date(val).getTime()
            },
            "search.bindCardTimeMinT": function (val) {
                if (val)
                    this.search.bindCardTimeMin = new Date(val).getTime()
            },
            "search.bindCardTimeMaxT": function (val) {
                if (val)
                    this.search.bindCardTimeMax = new Date(val).getTime()
            },


        },
        methods: {
            mixChange(val){
                this.search.name    = ''
                this.search.mobile  = ''
                this.search.certNo  = ''
            },
            test(event){
                if(event.wheelDeltaY>0){
                    wrpEle.scrollLeft += 30
                }else{
                    wrpEle.scrollLeft -= 30
                }
            },
            moneyChange(val){
                const search = this.search
                if(search.borrowAmtMinT)
                    search.borrowAmtMinT = accounting.format(search.borrowAmtMinT,2,',')

                if(search.borrowAmtMaxT)
                    search.borrowAmtMaxT = accounting.format(search.borrowAmtMaxT,2,',')

                if(search.investAmtMinT)
                    search.investAmtMinT = accounting.format(search.investAmtMinT,2,',')

                if(search.investAmtMaxT)
                    search.investAmtMaxT = accounting.format(search.investAmtMaxT,2,',')

                if(search.remainedAmtMinT)
                    search.remainedAmtMinT = accounting.format(search.remainedAmtMinT,2,',')

                if(search.remainedAmtMaxT)
                    search.remainedAmtMaxT = accounting.format(search.remainedAmtMaxT,2,',')
            },
            expandHandler(val){
                if(val == true){
                    this.staffList = Staff.list
                }
            },
            filterMethod(query){
                if (query !== '') {
                    this.staffLoading = true
                    if(!!query.match(/[\u4e00-\u9fa5]/)){
                        this.staffLoading = false
                        this.staffList = Staff.findByName(Staff.list,query)
//                        console.log('test:',Staff.list)
                    }else if(!!query.match(/^\d/)){
                        this.staffLoading = false
                        this.staffList = Staff.findByNo(Staff.list,query)
                    }else if(!!query.match(/[a-zA-Z]/)){
                        console.log('字母')
                        this.staffLoading = false
                        this.staffList = Staff.findByInitial(Staff.list,query.toUpperCase())
                    }else{
                        this.staffLoading = false;

                    }
//                    this.loading = true;
//                    setTimeout(() => {
//                        this.loading = false;
//                        this.options4 = this.list.filter(item => {
//                            return item.label.toLowerCase()
//                                    .indexOf(query.toLowerCase()) > -1;
//                        });
//                    }, 200);
                } else {
                    this.staffLoading = true;
                    this.staffList = []
                    setTimeout(()=>{
                        this.staffLoading = false;
                        console.log('空白',Staff.list)
                        this.staffList = Array.from(Staff.list)
                    })

                }
            },
            doSearch(){
                let that        = this
                let url         = Vue.debugUrl + '/stat/userInfo/search'
                var reqData     = {
                    pageSize:15,
                    pageNum:that.pageNum
                }

                Object.assign(reqData,that.search)
                Util.dataClear(reqData)

                that.$http.get(url,{params:reqData}).then(function (res) {
                    if(res.body.msg == "OK") {
                        let data            = res.body.data
                        Object.assign(that,data)
                    }
                });
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.doSearch()
            }
        },
        created:function () {
//            console.log(this.$route)
//            console.log(this.$route.params)
        },
        mounted:function () {
            wrpEle = document.querySelector('.table .el-table__body-wrapper')
        },
        components:{
            leverBar
        }
    }
</script>
<style lang="scss">
    @import 'src/scss/pages/stat/info.scss';
</style>