<template>
  <div class="teacher">
    <el-dialog
      :title="form.id || form.phone === 0 ? '编辑信息' : '新增老师'"
      :visible.sync="flag"
      width="30%"
      :before-close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="教师名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="学段" prop="field">
          <el-select v-model="form.field" placeholder="请选择学段" class="box">
            <el-option
              v-for="(item, key, index) in field"
              :key="index"
              :label="item"
              :value="Number(key)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任教科目" prop="subject">
          <el-select
            v-model="form.subject"
            placeholder="请选择科目"
            class="box"
          >
            <el-option
              v-for="(item, key, index) in subject"
              :key="index"
              :label="item"
              :value="Number(key)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" prop="status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="ClickSure('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "teacher",
  props: {
    field: Object,
    subject: Object,
  },
  data() {
    var rulePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error(rule.message));
      } else {
        return callback();
      }
    };
    return {
      flag: false,
      form: {
        id: "",
        name: "",
        phone: "",
        field: "",
        subject: "",
        date: "",
        sex: "",
        status: "",
        class: "",
      },
      rules: {
        name: [{ required: true, message: "请输入您的姓名" }],
        phone: [
          { required: true, message: "请输入您的手机号" },
          {
            validator: rulePhone,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        field: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [
          {
            required: true,
            message: "请选择任教科目",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //父组件点击编辑icon
    clickicon(e) {
      this.form = {...e};  //为了不修改原数组，所以解构
      this.flag = true;
      // console.log(this.form)

    },

    // 关闭弹层
    close() {
      // console.log(this.form)
      this.form = {
        id:''
      };
      this.flag = false;
      this.$refs["form"].resetFields();

    },

    // 确定
    ClickSure(ref) {
      this.$refs[ref].validate((boolean) => {
        if (boolean) {
          this.change();
        }
      });
    },
    change() {
      this.$bus.$emit("teacherInfo", JSON.parse(JSON.stringify(this.form)));
      this.form = {
        id: "",
      };
      this.flag = false;
      this.$refs["form"].resetFields();
    },
  },
  mounted() {},
};
</script>

<style>
.box {
  width: 100%;
}
.el-dialog__footer {
  text-align: center;
}
</style>









