<template>
  <el-container>
    <el-header>
      <div class="logo-box">
        <img src="../../assets/logo.png" alt />
        <span>MyPage Admin</span>
      </div>
      <div class="btns">
        <el-button icon="el-icon-s-home" @click="homepage"></el-button>
        <el-button icon="el-icon-user-solid" @click="logout"></el-button>
      </div>
    </el-header>

    <el-container>
      <el-aside :width="isCollapse ? '64px': '200px'">
        <el-menu
          background-color="#555"
          text-color="#888"
          active-text-color="#fff"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="currentPath"
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
          <el-menu-item index="/admin/todolists">
            <i class="el-icon-finished"></i>
            <span slot="title">待办事项</span>
          </el-menu-item>
          <el-menu-item index="/admin/code_snippets">
            <i class="el-icon-tickets"></i>
            <span slot="title">代码片段</span>
          </el-menu-item>
          <el-menu-item index="/admin/settings">
            <i class="el-icon-s-operation"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
          <el-menu-item index="/admin/toolsbox">
            <i class="el-icon-fork-spoon"></i>
            <span slot="title">工具箱</span>
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
export default {
  name: "Admin",
  data: function() {
    return {
      isCollapse: false
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    homepage() {
      this.$router.push('/')
    },
    logout() {
      window.localStorage.removeItem('token')
      this.$router.push('/admin/login')
    }
  },
  computed: {
    currentPath: function() {
      return this.$router.history.current.path;
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #111;
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
  background-color: #555;
}

.el-main {
  background-color: #ddd;
}
.toggle-btn {
  background-color: #444;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu {
  width: 100%;
}
.btns {
  .el-button {
    font-size: 26px;
    color: #fff;
    background: none;
    border: none;
  }
}
</style>
