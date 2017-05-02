<template>
    <div class="stat-loan">
        <lever-bar :lever="{'p':'统计','c':'还款计划'}"></lever-bar>
        <div class="stat-box">
            <div class="search-box">
                <el-form   :model="formInline" label-width="66px" >
                    <el-select @change="mixChange"  v-model="mix.value" placeholder="条件" size="small" class="middle">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-show="mix.value == 0 " size="small"  v-model="search.contractNo" :placeholder="'请输入合同号'"></el-input>
                    <el-input v-show="mix.value == 1 " size="small"  v-model="search.name" :placeholder="'请输入姓名'"></el-input>
                    <el-input v-show="mix.value == 2 " size="small"  v-model="search.mobile" :placeholder="'请输入手机'"></el-input>
                    <el-input v-show="mix.value == 3 " size="small"  v-model="search.certNo" :placeholder="'请输入身份证'"></el-input>

                    <el-form-item label="应还日期">
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.preRepayDateMinT"
                                type="date"
                                placeholder="开始日期时间">
                        </el-date-picker>
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.preRepayDateMaxT"
                                type="date"
                                placeholder="截至日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="实还日期">
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.repayDateMinT"
                                type="date"
                                placeholder="选择日期时间">
                        </el-date-picker>
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="search.repayDateMaxT"
                                type="date"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select size="small" class="middle"  v-model="search.status" placeholder="请选择条件">
                            <!--// 状态 0-未还款 1-已还款 2-部分还款 3-逾期未还款  4-逾期已还款 5-违约 6-已兑付-->
                            <el-option :label="'全部'" :value="null"></el-option>
                            <el-option :label="'未还款'" :value="0"></el-option>
                            <el-option :label="'已还款'" :value="1"></el-option>
                            <el-option :label="'部分还款'" :value="2"></el-option>
                            <el-option :label="'逾期未还'" :value="3"></el-option>
                            <el-option :label="'逾期已还'" :value="4"></el-option>
                            <el-option :label="'违约'" :value="5"></el-option>
                            <el-option :label="'已兑付'" :value="6"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户经理">
                        <el-select class="lang" size="small" filterable
                                   :filter-method="filterMethod"
                                   @visible-change="expandHandler"
                                   :loading="staffLoading"
                                   v-model="search.jobNum" placeholder="请选择">
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
                    <el-form-item label-width="30px" >
                        <el-button size="small" type="primary">重置</el-button>
                        <el-button @click.native="doSearch" size="small" type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="result-box">
                <span>应还本金:{{totals.prePrincipalAmtTotal | moneyFormat}}</span>
                <span>实还本金:{{totals.principalAmtTotal | moneyFormat}}</span>
                <span>应还利息:{{totals.prePrincipalAmtTotal | moneyFormat}}</span>
                <span>应还本息:{{totals.preInterestAmtTotal | moneyFormat}}</span>
                <span>实还本息:{{totals.interestAmtTotal | moneyFormat}}</span>
                <span>应还借款笔数:{{totals.prePrincipalInterestAmtTotal | moneyFormat}}</span>
                <span>实还借款笔数:{{totals.principalInterestAmtTotal | moneyFormat}}</span>
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
                        prop="contractNo"
                        align="center"
                        label="合同号"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="借款人"
                        align="center"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        align="center"
                        label="手机号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="certNo"
                        align="center"
                        label="身份证号"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="应还本金"
                        align="center"
                        min-width="100">
                    <template scope="scope">
                        <span>{{ scope.row.prePrincipalAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="实还本金"
                        align="center"
                        width="100">
                    <template scope="scope">
                        <span>{{ scope.row.principalAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="zip"
                        align="center"
                        label="应还利息"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.preInterestAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="实还利息"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.interestAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="应还本息"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.prePrincipalInterestAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="实还利息"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.principalInterestAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="应还日期"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.preRepayDate | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="实还日期"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.repayDate | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100">
                    <template scope="scope">
                        <span>{{ scope.row.status | outcomePlanStatus }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="mgrName"
                        align="center"
                        label="客户经理"
                        width="120">
                    <template scope="scope">
                        <span>{{ scope.row.mgrName }} - {{ scope.row.jobNum }}</span>
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
                },
                totals:{},
                search:{
                    contractNo:'',
                    name:'',
                    mobile:'',
                    certNo:'',
                    preRepayDateMinT:null,
                    preRepayDateMin:null,
                    preRepayDateMaxT:null,
                    preRepayDateMax:null,
                    repayDateMinT:null,
                    repayDateMin:null,
                    repayDateMaxT:null,
                    repayDateMax:null,
                    status:null,
                    jobNum:null
                },
                staffList: Staff.list,
                staffLoading:false,
                value7: ''
            }
        },
        watch: {
            "search.preRepayDateMinT": function (val) {
                this.search.preRepayDateMin = val ? new Date(val).getTime() : null
            },
            "search.preRepayDateMaxT": function (val) {
                this.search.preRepayDateMax = val ? new Date(val).getTime() : null
            },
            "search.repayDateMinT": function (val) {
                this.search.repayDateMin = val ? new Date(val).getTime() : null
            },
            "search.repayDateMaxT": function (val) {
                this.search.repayDateMax = val ? new Date(val).getTime() : null
            }
        },
        methods: {
            mixChange(val){
                let search          = this.search;
                search.name         = ''
                search.mobile       = ''
                search.certNo       = ''
                search.contractNo   = ''
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
                let url         = Vue.debugUrl + '/stat/outcomePlan/search'
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
        mounted:function () {
            wrpEle = document.querySelector('.table .el-table__body-wrapper')
        },
        components:{
            leverBar
        }
    }
</script>
<style lang="scss">
    @import 'src/scss/pages/stat/outcome.scss';
</style>