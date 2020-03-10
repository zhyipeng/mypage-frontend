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
      <el-aside :width="isCollapse ? '64px': '200px'">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <div class="toggle-btn" @click="toggleCollapse">|||</div>
          <el-menu-item index="/admin/overview">
            <i class="el-icon-view"></i>
            <span slot="title">概览</span>
          </el-menu-item>
          <el-menu-item index="/admin/posts">
            <i class="el-icon-reading"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/categories">
            <i class="el-icon-folder"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/tags">
            <i class="el-icon-paperclip"></i>
            <span slot="title">标签管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/settings">
            <i class="el-icon-finished"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
          <router-view></router-view>
      </el-main>
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
  data: function(){
      return {
          isCollapse: false,
      }
  },
  methods: {
     toggleCollapse() {
         this.isCollapse = !this.isCollapse
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
.toggle-btn {
    background-color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
