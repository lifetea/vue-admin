<template>
    <div class="stat-loan">
        <lever-bar></lever-bar>
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
                    <el-form-item label="借款金额">
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.minLoanAmountT" placeholder="金额"></el-input>
                        <span>-</span>
                        <el-input @blur="moneyChange" size="small" class="money" v-model="search.maxLoanAmountT" placeholder="金额"></el-input>
                    </el-form-item>
                    <el-form-item label="借款期限">
                        <el-input size="small" min="0" type="number" class="money" v-model="search.minLoanTermDays" placeholder="天数"></el-input>
                        <span>-</span>
                        <el-input size="small" min="0" type="number" class="money" v-model="search.maxLoanTermDays" placeholder="天数"></el-input>
                    </el-form-item>
                    <el-form-item label="借款利率">
                        <el-input min="0" max="100" type="number" size="small" class="money" v-model="search.loanRate" placeholder="百分比(%)"></el-input>
                    </el-form-item>
                    <el-form-item label="还款方式">
                        <el-select size="small" class="middle" v-model="search.status" placeholder="选择条件">
                            <el-option :label="'全部'" :value="null"></el-option>
                            <el-option :label="'利随本清'" :value="1"></el-option>
                            <el-option :label="'按月结息'" :value="2"></el-option>
                            <el-option :label="'按季付息'" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="首笔">
                        <el-select size="small" class="middle" v-model="search.first" placeholder="首笔接口">
                            <el-option :label="'全部'" :value="0"></el-option>
                            <el-option :label="'是'" :value="1"></el-option>
                            <el-option :label="'否'" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="社区经理">
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
                    <el-form-item label="放款时间">
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.loanStartTimeT"
                                type="datetime"
                                placeholder="开始日期时间">
                        </el-date-picker>
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.loanEndTimeT"
                                type="datetime"
                                placeholder="截至日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="到期时间">
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.expireStartTimeT"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.expireEndTimeT"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <div class="item-box">
                        <el-button size="small" type="primary">重置</el-button>
                        <el-button @click.native="doSearch" size="small" type="primary">查询</el-button>
                    </div>
                </el-form>
            </div>
            <div class="result-box">
                <span>借款总金额:{{statistics.amountTotal}}</span>
                <span>借款总笔数:{{statistics.recordCount}}</span>
                <span>服务费总金额:{{statistics.serviceAmountTotal}}</span>
                <span>日均金额:{{statistics.dailyAmountTotal}}</span>
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
                        min-width="140">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="首笔借款(是否)"
                        align="center"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        align="center"
                        label="借款人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        align="center"
                        label="手机号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="certNumber"
                        label="身份证号"
                        align="center"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        label="借款金额(元)"
                        align="center"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.loanAmount | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="loanTerm"
                        align="center"
                        label="借款期限"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="annualIncomeRate"
                        align="center"
                        label="借款利率(%)"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="serviceRate"
                        align="center"
                        label="服务费率(%)"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="服务金额(元)"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.serviceAmount | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="放款时间"
                        width="160">
                    <template scope="scope">
                        <span>{{ scope.row.lendingTime | dateTimeFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="到期时间"
                        width="160">
                    <template scope="scope">
                        <span>{{ scope.row.expireTime | dateTimeFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="还款方式"
                        width="100">
                    <template scope="scope">
                        <span>{{ scope.row.repaymentMethod | repayType }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="状态(生命周期)"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.status | lifeCycle }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="社区经理"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.manager}} - {{ scope.row.jobNumber }}</span>
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
    import list             from    '../../../../src/data/loan/list'
    import Staff            from    '../../../data/loan/staff'
    import Util             from    'src/js/util'

    let wrpEle;
    let ops =[{
        value: '0',
        label: '合同号'
    }, {
        value: '1',
        label: '借款人'
    }, {
        value: '2',
        label: '手机号'
    }, {
        value: '3',
        label: '身份证号'
    }]
    export default {
        data() {
            return {
                list: [],
                options: ops,
                value: '',
                mix:{
                    //混合选项 合同 身份证 手机号
                    value:'0',
                    placeholder:'请输入合同号',
                    input:''
                },
                statistics:{

                },
                search:{
                    contractNumber:'',
                    name:'',
                    phone:'',
                    certNumber:'',
                    minLoanAmount:null,
                    minLoanAmountT:null,
                    maxLoanAmount:null,
                    maxLoanAmountT:null,
                    minLoanTermDays:null,
                    maxLoanTermDays:null,
                    loanRate:null,
                    status:null,
                    accountManager:null,
//                  放款时间
                    loanStartTime:null,
                    loanStartTimeT:null,
                    loanEndTime:null,
                    loanEndTimeT:null,
//                  截止时间
                    expireStartTime:null,
                    expireStartTimeT:null,
                    expireEndTime:null,
                    expireEndTimeT:null
                },
                staffList: Staff.list,
                staffLoading:false,
                value7: ''
            }
        },
        watch: {
            "search.loanStartTimeT": function (val) {
                this.search.loanStartTime = val ? new Date(val).getTime() : null
            },
            "search.loanEndTimeT": function (val) {
                this.search.loanEndTime = val ? new Date(val).getTime() : null
            },
            "search.expireStartTimeT": function (val) {
                this.search.expireStartTime = val ? new Date(val).getTime() : null
            },
            "search.expireEndTimeT": function (val) {
                this.search.expireEndTime = val ? new Date(val).getTime() : null
            },
            "search.minLoanAmountT": function (val) {
                this.search.minLoanAmount = val ? accounting.format(val, 0, '') : null
            },
            "search.maxLoanAmountT": function (val) {
                this.search.maxLoanAmount = val ? accounting.format(val, 0, '') : null
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

            test(event){
                if(event.wheelDeltaY>0){
                    wrpEle.scrollLeft += 30
                }else{
                    wrpEle.scrollLeft -= 30
                }
            },
            expandHandler(val){
                if(val == true){
                    this.staffList = Staff.list
                }
            },
            moneyChange(val){

                const search = this.search

                if(search.minLoanAmountT)
                    search.minLoanAmountT = accounting.format(search.minLoanAmountT,2,',')

                if(search.maxLoanAmountT)
                    search.maxLoanAmountT = accounting.format(search.maxLoanAmountT,2,',')

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
                let url         = 'loanContract/search'
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
    @import 'src/scss/pages/stat/loan.scss';
</style>