<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button @click="goCurl" plain>CURL 解析</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "ToolsBox",
        methods: {
            goCurl(){
                this.$router.push('/toolsbox/curl')
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }
</style>