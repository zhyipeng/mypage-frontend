<template>
    <div>
        <div style="margin-top: 15px;" @keyup.enter="search">
            <el-input placeholder="" v-model="q" class="input-with-select">
                <el-select v-model="lang" slot="prepend" placeholder="请选择语言" class="select">
                    <el-option
                            v-for="l in languages"
                            :key="l"
                            :label="l"
                            :value="l"
                    ></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>

        <el-card class="box-card" v-for="s in snippets" :key="s.id" v-infinite-scroll="load">
            <div slot="header" class="clearfix">
                <span>{{s.name}}</span>
                <el-tag type="info" style="float: right;" @click="search_lang(s.language)">
                    {{s.language}}
                </el-tag>
            </div>
            <MarkdownPro
                    v-model="s.code"
                    :bordered="false"
                    :height="null"
                    theme="gitHub"
                    isPreview
            ></MarkdownPro>
        </el-card>
    </div>
</template>

<script>
    import {api} from "../../core/api";
    import {MarkdownPro} from "vue-meditor";

    export default {
        name: "codeSnippets",
        components: {
            MarkdownPro,
        },
        data: function () {
            return {
                snippets: [],
                current_page: 1,
                size: 10,
                total: 0,
                end: false,
                q: null,
                lang: null,
                languages: [
                    'python',
                    'go'
                ]
            }
        },
        methods: {
            async get_snippets() {
                let params = {page: this.current_page, size: this.size}
                if (this.q !== null) {
                    params.q = this.q
                }
                if (this.lang !== null) {
                    params.language = this.lang
                }
                let ret = await api.get('/v1/code_snippet', {
                    params: params
                })
                for (let i = 0; i < ret.data.length; i++) {
                    this.snippets.push(ret.data[i])
                }
                this.total = ret.page_info.total
                if (this.current_page >= ret.page_info.last_page || !ret.data) {
                    this.end = true
                }
            },
            load() {
                if (!this.end) {
                    this.current_page += 1;
                    this.get_snippets()
                }
            },
            search() {
                this.snippets = []
                this.current_page = 1
                this.get_snippets()
            },
            search_lang(lang) {
                this.lang = lang
                this.q = null
                this.search()
            }
        },
        created() {
            this.get_snippets()
        }
    }
</script>

<style scoped>
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        margin: 20px 0;
    }

    .el-select .el-input {
        width: 130px;
    }

    .select {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>