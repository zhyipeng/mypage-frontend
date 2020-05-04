<template>
    <el-row>
        <el-col :span="12">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="curl">
                    <el-input
                            type="textarea"
                            :rows="10"
                            placeholder="请输入curl"
                            v-model="form.curl">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="analysis-btn" @click="parse">解析</el-button>
                    <el-button class="exec-btn" @click="exec">执行</el-button>
                </el-form-item>
                <el-form-item label="url">
                    <el-input v-model="form.url" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="method">
                    <div style="margin-top: 20px">
                        <el-radio-group v-model="form.method" size="mini">
                            <el-radio-button label="GET"></el-radio-button>
                            <el-radio-button label="POST"></el-radio-button>
                            <el-radio-button label="PUT"></el-radio-button>
                            <el-radio-button label="DELETE"></el-radio-button>
                            <el-radio-button label="OPTIONS"></el-radio-button>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="headers">
                    <div v-for="item in form.headers" class="header">
                        <el-input v-model="item.key"></el-input>
                        <el-input v-model="item.value"></el-input>
                        <el-button icon="el-icon-close" circle size="mini" class="remove-item"
                                   @click="remove_item(item, form.headers)"></el-button>
                    </div>
                    <el-button icon="el-icon-plus" circle size="mini" class="add-item"
                               @click="add_item(form.headers)"></el-button>
                </el-form-item>
                <el-form-item label="data">
                    <div v-for="item in form.data" class="header">
                        <el-input v-model="item.key"></el-input>
                        <el-input v-model="item.value"></el-input>
                        <el-button icon="el-icon-close" circle size="mini" class="remove-item"
                                   @click="remove_item(item, form.headers)"></el-button>
                    </div>
                    <el-button icon="el-icon-plus" circle size="mini" class="add-item"
                               @click="add_item(form.data)"></el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12">
            <jsonView :data="resp"></jsonView>
        </el-col>
    </el-row>
</template>

<script>
    import jsonView from 'vue-json-views'
    import {api, ToolsBoxBaseURL} from "../../core/api";

    export default {
        name: "CURL",
        data: function () {
            return {
                form: {
                    curl: '',
                    url: undefined,
                    headers: [],
                    data: [],
                    method: 'GET'
                },
                resp: {}
            }
        },
        components: {
            jsonView
        },
        methods: {
            add_item(data) {
                data.push({key: '', value: ''})
            },
            remove_item(item, data) {
                data.splice(data.indexOf(item), 1)
            },
            async parse() {
                let url = ToolsBoxBaseURL + '/api/v1/curl/parse';
                let ret = await api.post(url, {curl: this.form.curl});
                this.form.url = ret.url
                if (ret.method === 'GET') {
                    this.form.data = this.objToArray(ret.params)
                } else {
                    this.form.data = this.objToArray(ret.data)
                }
                this.form.headers = this.objToArray(ret.headers)
                this.form.method = ret.method
            },
            async exec() {
                let data = {
                    method: this.form.method,
                    headers: this.ArrayToObj(this.form.headers),
                    data: this.ArrayToObj(this.form.data),
                    url: this.form.url
                }
                let url = ToolsBoxBaseURL + '/api/v1/curl/exec'
                this.resp = await api.post(url, data)
                console.log(this.resp)
            },
            objToArray(obj) {
                let l = [];
                for (let k in obj) {
                    if (typeof obj[k] == 'object') {
                        l.push({key: k, value: JSON.stringify(obj[k])})
                    } else {
                        l.push({key: k, value: obj[k]})
                    }
                }
                return l
            },
            ArrayToObj(list) {
                let obj = {};
                for (let i = 0; i < list.length; i++) {
                    obj[list[i].key] = list[i].value
                }
                return obj
            }
        },
    }
</script>

<style lang="less" scoped>
    .el-row {
        padding: 50px 0;
    }

    .el-col {
        padding: 10px;
    }

    .analysis-btn {
        float: left;
    }

    .exec-btn {
        float: right;
    }

    .header {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    .remove-item {
        border: none;
        background: none;
    }
</style>