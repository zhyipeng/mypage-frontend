<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>

            <el-form label-width="0px" class="login_form" :model="form" :rules="loginRules" ref="loginFormRef">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" v-model="form.password" type="password"></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click="login" @keyup.enter="login">登录</el-button>
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {api} from '../core/api.js'

export default {
    name: 'Login',
    data: function(){
        return {
            form: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 3, max: 16, message: '请输入3-10个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                ],
            }
        }
    },
    methods: {
        resetForm: function(){
            this.$refs.loginFormRef.resetFields()
        },
        login: function(){
            this.$refs.loginFormRef.validate(async is_valid => {
                if (!is_valid) return;

                const data = await api.post('/v1/admin/login', this.form)
                if (!data) {return}
                console.log(data)
                this.$message.success("登录成功")
                window.sessionStorage.setItem('token', data.token)
                this.$router.push('/admin')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #a7b5c9;
    height: 100%;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    };
}
.btns {
    display: flex;
    justify-content: flex-end;
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>