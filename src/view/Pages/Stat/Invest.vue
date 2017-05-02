<template>
    <div class="stat-loan">
        <lever-bar :lever="{'p':'统计','c':'投资记录'}"></lever-bar>
        <div class="stat-box">
            <div class="search-box">
                <el-form   :model="formInline" label-width="66px" >
                    <el-select @change="mixChange"  v-model="mix.value" placeholder="条件" size="small" class="middle">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-show="mix.value == 0 " size="small"  v-model="search.contractNumber" :placeholder="'请输入合同号'"></el-input>
                    <el-input v-show="mix.value == 1 " size="small"  v-model="search.name" :placeholder="'请输入姓名'"></el-input>
                    <el-input v-show="mix.value == 2 " size="small"  v-model="search.phone" :placeholder="'请输入手机'"></el-input>
                    <el-input v-show="mix.value == 3 " size="small"  v-model="search.certNumber" :placeholder="'请输入身份证'"></el-input>
                    <el-form-item label="投资金额">
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.minInvestmentAmountT" placeholder="金额"></el-input>
                        <span>-</span>
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.maxInvestmentAmountT" placeholder="金额"></el-input>
                    </el-form-item>
                    <el-form-item label="投资利率">
                        <el-input @change="rateChangeHandler" min="0" max="100" type="number" size="small" class="money" v-model="search.investmentRate" placeholder="百分比(%)"></el-input>
                    </el-form-item>
                    <el-form-item label="借款期限">
                        <el-input size="small" min="0" type="number" class="money" v-model="search.minInvestmentDays" placeholder="天数"></el-input>
                        <span>-</span>
                        <el-input size="small" min="0" type="number" class="money" v-model="search.maxInvestmentDays" placeholder="天数"></el-input>
                    </el-form-item>
                    <el-form-item label="回款方式">
                        <el-select size="small" class="middle" v-model="search.paymentMethod" placeholder="请选择条件">
                            <el-option :label="'全部'" :value="null"></el-option>
                            <el-option :label="'利随本清'" :value="1"></el-option>
                            <el-option :label="'按月结息'" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="40px" label="状态">
                        <el-select size="small" class="middle" v-model="search.status" placeholder="选择条件">
                            <el-option :label="'全部'" :value="null"></el-option>
                            <el-option :label="'初始'" :value="1"></el-option>
                            <el-option :label="'成功'" :value="2"></el-option>
                            <el-option :label="'撤销'" :value="3"></el-option>
                            <el-option :label="'失败'" :value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户经理">
                        <el-select class="lang" size="small" filterable
                                   :filter-method="filterMethod"
                                   :loading="staffLoading"
                                   @visible-change="expandHandler"
                                   v-model="search.accountManager"
                                   placeholder="请选择">
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
                    <el-form-item label-width="100px" label="计息开始时间">
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.interestStartTimeT"
                                type="date"
                                placeholder="开始日期时间">
                        </el-date-picker>
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.interestEndTimeT"
                                type="date"
                                placeholder="截至日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label-width="100px" label="合同到期时间">
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.expireStartTimeT"
                                type="date"
                                placeholder="选择日期时间">
                        </el-date-picker>
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.expireEndTimeT"
                                type="date"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="首笔投资">
                        <el-select size="small" class="middle" v-model="search.first" placeholder="是否">
                            <el-option :label="'全部'" :value="0"></el-option>
                            <el-option :label="'是'" :value="1"></el-option>
                            <el-option :label="'否'" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="30px">
                        <el-button size="small" type="primary">重置</el-button>
                        <el-button @click.native="doSearch" size="small" type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="result-box">
                <span>投资总金额:{{statistics.amountTotal | moneyFormat }}</span>
                <span>投资总笔数:{{statistics.recordCount}}</span>
                <!--<span>流失借款金额:</span>-->

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
                        prop="contractNumber"
                        align="center"
                        label="合同号"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        align="center"
                        label="投资人"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="certNumber"
                        label="身份证号"
                        align="center"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        label="投资金额"
                        width="120"
                >
                    <template scope="scope">
                        <span>{{ scope.row.investmentAmount | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="investmentTerm"
                        align="center"
                        label="投资期限"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="investmentRate"
                        align="center"
                        label="投资利率"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        label="回款方式"
                        width="120"
                >
                    <template scope="scope">
                        <span>{{ scope.row.paymentMethod | repayType }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="计息开始时间"
                        width="120"
                >
                    <template scope="scope">
                        <span>{{ scope.row.interestTime | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="合同到期时间"
                        width="120"
                >
                    <template scope="scope">
                        <span>{{ scope.row.expireTime | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="状态"
                        width="120"
                >
                    <template scope="scope">
                        <span>{{ scope.row.status | investStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="zip"
                        align="center"
                        label="首笔投资(是/否)"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        label="客户经理"
                        width="120"
                >
                    <template scope="scope">
                        <span>{{ scope.row.manager}} - {{scope.row.jobNumber}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer-box">
            <span v-if="startRow" class="pull-left">显示{{startRow}}-{{endRow}} 总共有{{total}}条目</span>
            <div class="pagination pull-right">
                <span v-if="startRow" class="pull-left">显示{{startRow}}-{{endRow}} 总共有{{total}}条目</span>
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
    import Util             from    'src/js/util'

    let wrpEle;
    let ops =[
        {
            value: '0',
            label: '合同号'
        },
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
                statistics:{},
                options: ops,
                value: '',
                mix:{
                    //混合选项 合同 身份证 手机号
                    value:'0',
                },
                statistics:{

                },
                search:{
                    name:'',
                    phone:'',
                    certNumber:'',
                    contractNumber:'',
                    interestStartTime:null,
                    interestStartTimeT:null,
                    interestEndTime:null,
                    interestEndTimeT:null,
                    investmentRate:null,
                    paymentMethod:null,
                    expireStartTime:null,
                    expireStartTimeT:null,
                    expireEndTime:null,
                    expireEndTimeT:null,
                    jobNum:null,
                    //投资金额
                    minInvestmentAmountT:null,
                    minInvestmentAmount:null,
                    maxInvestmentAmountT:null,
                    maxInvestmentAmount:null,
//                    状态
                    status:null,
//                    工号查询
                    accountManager:null
                },
                staffList: Staff.list,
                staffLoading:false,
                value7: ''
            }
        },
        watch: {
            "search.interestStartTimeT": function (val) {
                this.search.interestStartTime = val ? new Date(val).getTime() : null
            },
            "search.interestEndTimeT": function (val) {
                this.search.interestEndTime = val ? new Date(val).getTime() : null
            },
            "search.expireStartTimeT": function (val) {
                this.search.expireStartTime = val ? new Date(val).getTime() : null
            },
            "search.expireEndTimeT": function (val) {
                this.search.expireEndTime = val ? new Date(val).getTime() : null
            },
            "search.minInvestmentAmountT": function (val) {
                this.search.minInvestmentAmount = val ? accounting.format(val, 0, '') : null
            },
            "search.maxInvestmentAmountT": function (val) {
                this.search.maxInvestmentAmount = val ? accounting.format(val, 0, '') : null
            },
        },
        methods: {
            mixChange(val){
                let search = this.search
                search.contractNumber       = ''
                search.name                 = ''
                search.phone                = ''
                search.certNumber           = ''
            },
            rateChangeHandler(val){
                if(val == 0)
                    this.search.investmentRate = null
//                console.log(val)
            },
            expandHandler(val){
                if(val == true){
                    this.staffList = Staff.list
                }
            },
            moneyChange(val){

                const search = this.search

                if(search.minInvestmentAmountT)
                    search.minInvestmentAmountT = accounting.format(search.minInvestmentAmountT,2,',')

                if(search.maxInvestmentAmountT)
                    search.maxInvestmentAmountT = accounting.format(search.maxInvestmentAmountT,2,',')
//
//                if(search.remainedAmtMaxT)
//                    search.remainedAmtMaxT = accounting.format(search.remainedAmtMaxT,2,',')
            },
            test(event){
                if(event.wheelDeltaY>0){
                    wrpEle.scrollLeft += 30
                }else{
                    wrpEle.scrollLeft -= 30
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
                let url         = 'investmentRecord/search'
                var reqData     = {
                    pageSize:15,
                    pageNum:that.pageNum
                }

                Object.assign(reqData,that.search)
                Util.dataClear(reqData)

                that.$http.get(url,{params:reqData}).then(function (res) {
                    if(res.body.code == "200") {
                        let data            = res.body.data
                        console.log(data)
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
    @import 'src/scss/pages/stat/invest.scss';
</style>