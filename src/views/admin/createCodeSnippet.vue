<template>
    <div>
        <BreadCrumb :items="breadCrumbItems"></BreadCrumb>

        <el-card class="box-card">
            <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="createForm.name"></el-input>
                </el-form-item>

                <el-form-item label="代码" prop="body">
                    <MarkdownPro v-model="createForm.code"></MarkdownPro>
                </el-form-item>

                <div class="btn">
                    <el-button type="primary" @click="submit">保存</el-button>
                    <el-button type @click="cancel">返回</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {api} from "../../core/api.js";
    import BreadCrumb from "../../components/common/breadCrumb"
    import {MarkdownPro} from "vue-meditor";

    export default {
        name: "CodeSnippetForm",
        props: {
            id: {
                type: Number,
                default: null
            }
        },
        data: function () {
            return {
                breadCrumbItems: [
                    {path: "/admin/overview", name: "首页"},
                    {path: "/admin/code_snippets", name: "代码片段"},
                    {path: "", name: "创建"}
                ],
                categories: [],
                createForm: {
                    name: "",
                    code: "",
                },
                rules: {
                    name: [{required: true, message: "请输入标题", trigger: "blur"}],
                    code: [{required: true, message: "请输入代码", trigger: "blur"}]
                },
            };
        },
        components: {
            BreadCrumb,
            MarkdownPro
        },
        methods: {
            submit() {
                if (this.id) {
                    if (this.update_snippet()) {
                        this.$message.success("保存成功");
                        setTimeout(_ => {
                            this.$router.push("/admin/code_snippets");
                        }, 1000);
                    }
                } else {
                    if (this.create_snippet()) {
                        this.$message.success("保存成功");
                        setTimeout(_ => {
                            this.$router.push("/admin/code_snippets");
                        }, 1000);
                    }
                }
            },
            cancel() {
                this.$router.push("/admin/code_snippets");
            },
            async getSnippet() {
                let ret = await api.get("/v1/code_snippet/" + this.id);
                this.createForm.name = ret.name;
                this.createForm.code = ret.code;
            },
            async update_snippet() {
                let ret = await api.put("/v1/code_snippet/" + this.id, this.createForm);
                return ret;
            },
            async create_snippet() {
                let ret = await api.post("/v1/code_snippet/", this.createForm);
                return ret;
            },
        },
    };
</script>

<style lang="less" scoped>
    .btn {
        display: flex;
        justify-content: flex-end;
    }
</style>