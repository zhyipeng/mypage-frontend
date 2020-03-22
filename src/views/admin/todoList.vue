<template>
  <div>
    <BreadCrumb :items="breadCrumbItems"></BreadCrumb>
    <el-row :gutter="20">
      <el-col
        :span="4"
        v-for="l in todoLists"
        :key="l.id"
        @mouseenter.native="mouseEnter(l.id)"
        @mouseleave.native="mouseLeave(l.id)"
      >
        <el-card @click.native="jump(l.id)">
          <div class="name">{{ l.name }}</div>
          <div class="progress">
            <el-progress
              type="circle"
              :percentage="calculate_progress(l)"
              :width="180"
              :status="calculate_progress(l) == 100? 'success':''"
            ></el-progress>
          </div>
        </el-card>
        <div class="btns">
          <el-button-group :class="{hidden: hoverId!=l.id}">
            <el-button icon="el-icon-edit" @click="edit(l.id)"></el-button>
            <el-button icon="el-icon-delete" @click="delete_list(l.id)"></el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="4">
          <el-card class="create-card" @click.native="create_list"><div>+</div></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BreadCrumb from "../../components/common/breadCrumb";
import { api } from "../../core/api.js";
import { MessageBox } from "element-ui";

export default {
  name: "TodoLists",
  data: function() {
    return {
      todoLists: [],
      breadCrumbItems: [
        { path: "/admin/overview", name: "首页" },
        { path: "", name: "任务簿" }
      ],
      hoverId: null
    };
  },
  components: {
    BreadCrumb
  },
  methods: {
    async getTodoLists() {
      let ret = await api.get("/v1/todolist/");
      this.todoLists = ret;
    },
    jump(id) {
      this.$router.push("/admin/todolists/" + id);
    },
    mouseEnter(id) {
      this.hoverId = id;
    },
    mouseLeave(id) {
      this.hoverId = null;
    },
    edit(id) {
      MessageBox.prompt("请输入任务簿名称", "修改名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          let ret = await api.put("/v1/todolist/" + id, { name: value });
          if (!ret) {
            return;
          }
        this.$message({
          type: "success",
          message: "修改成功"
        });
          this.getTodoLists();
        })
        .catch(() => {});
    },
    delete_list(id) {
      MessageBox.confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async ({ value }) => {
        let ret = await api.delete("/v1/todolist/" + id);
        if (!ret) {
          return;
        }
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getTodoLists();
      });
    },
    create_list(){
      MessageBox.prompt("请输入任务簿名称", "新建", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          let ret = await api.post("/v1/todolist/", { name: value });
          if (!ret) {
            return;
          }
        this.$message({
          type: "success",
          message: "创建成功"
        });
          this.getTodoLists();
        })
    },
    calculate_progress(l) {
        return Number((l.total_count > 0? l.finished_count * 100 / l.total_count : 0).toFixed(0))
    }
  },
  created() {
    this.getTodoLists();
  }
};
</script>

<style lang="less" scoped>
.name {
  font-size: 26px;
  text-align: center;
  color: #555;
}
.progress {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 30px;
}
.el-card {
  margin-top: 30px;
  position: relative;
  cursor: pointer;
  :hover {
    background-color: #fafafa;
  }
}
.btns {
  text-align: center;
}
.el-button-group {
  .el-button {
    border: none;
    background: none;
    font-size: 20px;
    :hover {
      color: #000;
    }
  }
}
.hidden {
  opacity: 0;
}
.create-card {
    height: 332px;
    font-size: 80px;
    text-align: center;
    line-height: 272px;
    color: #555;
}
</style>