<template>
  <el-dialog
    :visible.sync="lock"
    class="_edit_teacher_dialog"
    :before-close="cancel"
    :title="teacherInfo.id || teacherInfo.id === 0 ? '编辑信息' : '新增老师'"
  >
    <el-form ref="form" :model="teacherInfo" :rules="rules" label-width="80px">
      <el-form-item label="教师姓名" prop="name">
        <el-input
          v-model="teacherInfo.name"
          placeholder="请输入您的姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="teacherInfo.phone"
          placeholder="请输入您的手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input
          v-model="teacherInfo.age"
          placeholder="请输入您的年龄"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="teacherInfo.sex" placeholder="请选择性别">
          <el-option
            v-for="(item, key, index) in sex"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学段" prop="stage">
        <el-select v-model="teacherInfo.stage" placeholder="请选择学段">
          <el-option
            v-for="(item, key, index) in stage"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任教科目" prop="subject">
        <el-select v-model="teacherInfo.subject" placeholder="请选择任教科目">
          <el-option
            v-for="(item, key, index) in subject"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="radio">
      <p>状态：</p>
      <el-radio v-model="teacherInfo.status" :label="1">正常</el-radio>
      <el-radio v-model="teacherInfo.status" :label="0">禁用</el-radio>
    </div>

    <div slot="footer" class="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AlterDialog",
  data() {
    var rulePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error(rule.message));
      } else {
        return callback();
      }
    };
    return {
      teacherInfo: {
        // name: "",
        // phone: "",
        // age: "",
        // sex: "",
        // stage: "",
        // subject: "",
      },
      lock: false,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入您的手机号" },
          {
            validator: rulePhone,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
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

  props: {
    stage: Object,
    subject: Object,
    sex: Object,
  },
  methods: {
    //打开弹窗
    opens() {
      this.lock = true;
    },

    //修改信息
    share(row) {
      this.lock = true;
      this.teacherInfo = { ...row };
    },

    //确认提交
    submit(ref) {
      // Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
      //自检测input框中的值 是否填写正确
      this.$refs[ref].validate((boolean, object) => {
        console.log(boolean, object);
        if (boolean) {
          this.port();
        }
      });
    },

    //接口
    port() {
      this.$bus.$emit(
        "teacherInfo",
        JSON.parse(JSON.stringify(this.teacherInfo))
      );
      this.lock = false;
      this.teacherInfo = {};
      this.$refs["form"].resetFields();
    },

    //关闭弹窗
    cancel() {
      this.lock = false;
      this.teacherInfo = {};
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style lang="scss">
._edit_teacher_dialog {
  .el-select {
    width: 100%;
  }
  .footer {
    text-align: center !important;
  }
  .radio {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>