<template>
    <div>
        <BreadCrumb :items="breadCrumbItems"></BreadCrumb>
        <el-card class="box-card">
            <el-row type="flex" class="search-row">
                <el-col :span="5">
                    <div class="demo-input-suffix">
                        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="q"></el-input>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-button plain @click="create_snippet">创建片段</el-button>
                </el-col>
            </el-row>

            <List
                    :data="snippets"
                    :attrs="ListAttrs"
                    @delete_item="delete_snippet"
                    @view_item="view_snippet"
            ></List>
            <pagination
                    class="pagination"
                    :total="total"
                    :pageSizes="[10,50,100]"
                    @size_change="handleSizeChange"
                    @page_change="handleCurrentPageChange"
            ></pagination>
        </el-card>
    </div>
</template>

<script>
    import List from '../../components/common/list'
    import BreadCrumb from "../../components/common/breadCrumb";
    import Pagination from "../../components/common/pagination";
    import {api} from "../../core/api.js";
    import {timestampToTime} from "../../core/utils.js";
    import {MessageBox} from "element-ui"

    export default {
        name: "CodeSnippetList",
        data: function () {
            return {
                q: "",
                breadCrumbItems: [
                    {path: "/admin/overview", name: "首页"},
                    {path: "", name: "代码片段"}
                ],
                snippets: [],
                ListAttrs: [
                    {attr: "name", label: "标题"},
                    {attr: "created_at", label: "创建时间"},
                    {attr: "language", label: "语言"},
                    {attr: "", label: "操作", type: "operations"}
                ],
                currentPage: 1,
                size: 10,
                total: 0
            };
        },
        components: {
            List,
            BreadCrumb,
            Pagination
        },
        created() {
            this.get_snippets();
        },
        methods: {
            async get_snippets() {
                let ret = await api.get("/v1/code_snippet", {
                    params: {page: this.currentPage, size: this.size}
                });
                let data = ret.data;
                for (let i = 0; i < data.length; i++) {
                    data[i].created_at = timestampToTime(data[i].created_at);
                }
                this.snippets = data;
                this.total = ret.page_info.total;
            },
            handleSizeChange(size) {
                this.size = size;
                this.get_snippets();
            },
            handleCurrentPageChange(page) {
                this.currentPage = page;
                this.get_snippets();
            },
            create_snippet() {
                this.$router.push("/admin/code_snippets/create");
            },
            view_snippet(id) {
                this.$router.push("/" + id)
            },
            delete_snippet(id) {
                MessageBox.confirm("确定删除？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async ({value}) => {
                    let r = await api.delete('/v1/code_snippet/' + id)
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    this.get_snippets()
                })
            },
        }
    };
</script>

<style lang="less" scoped>
    .search-row {
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .pagination {
        text-align: center;
    }
</style>