<template>
  <el-card>
    <div class="post_title">
      <a class="post-title-link">{{post.title}}</a>
    </div>
    <div class="info">
      <i class="el-icon-edit"></i>
      <span>发表于{{post.created_at}}</span>
      <el-divider direction="vertical"></el-divider>
      <i class="el-icon-folder"></i>
      <span>
        分类于
        <el-link>{{post.category.name}}</el-link>
      </span>
    </div>
    <div class="brief">{{post.brief}}</div>
    <a
      :class="{'btn': true, 'btn-hover': btnHover}"
      @click="mouseLeave"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >查看全文 >></a>
  </el-card>
</template>

<script>
export default {
  name: "PostItem",
  props: {
      post: Object
  },
  data: function() {
    return {
      btnHover: false
    };
  },
  methods: {
    mouseEnter() {
      this.btnHover = true;
    },
    mouseLeave() {
      this.btnHover = false;
    }
  }
};
</script>

<style lang="less" scoped>
.el-card {
  padding: 30px 0 40px 0;
  margin-bottom: 20px;
}
.post_title {
  font-size: 26px;
  text-align: center;
}
.info {
  font-size: 12px;
  text-align: center;
  color: #999;
  margin-top: 3px;
  margin-bottom: 60px;
  span {
    margin-left: 5px;
  }
}
a {
  text-decoration: none;
  border-bottom: none;
  margin: 0 auto;
}
.el-link {
  font-size: 12px;
}
.post-title-link {
  position: relative;
  text-decoration: none;
  color: #555;
}
.post-title-link:before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: #555;
  transition: all 0.2s;
}
.post-title-link:hover:before {
  width: 100%;
  left: 0;
  right: 0;
}
.btn {
  color: #555;
  background: none;
  display: block;
  width: 108px;
  height: 28px;
  border: 1px solid #999;
  text-align: center;
  line-height: 28px;
  font-size: 14px;
  cursor: pointer;
}
.btn-hover {
  color: #fff;
  background-color: #222;
}
.brief {
  margin-bottom: 25px;
}
</style>