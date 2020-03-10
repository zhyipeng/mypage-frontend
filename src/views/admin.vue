<template>
  <el-container>
    <el-header>
      <div class="logo-box">
        <img src="../assets/logo.png" alt />
        <span>MyPage Admin</span>
      </div>
      <Logout class="logout-btn"></Logout>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-view"></i>
            <span slot="title">概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-reading"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-folder"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-paperclip"></i>
            <span slot="title">标签管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-finished"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import Logout from "../components/logout";

export default {
  name: "Admin",
  components: {
    Logout
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #125212;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      height: 60px;
    }
  }
}

.el-aside {
  background-color: #123521;
}

.el-main {
  background-color: #ddd;
}
</style>
