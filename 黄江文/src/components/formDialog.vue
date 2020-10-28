<template>
  <div id="formDialog">
    <el-dialog :title="teacherInfo.id || teacherInfo.id === 0 ? '编辑信息' : '新增教师'"
               :visible.sync="visible"
               :before-close="close">
      <el-form ref="form"
               :model="teacherInfo"
               :rules="rules">
        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="teacherInfo.name"
                    placeholder="请输入姓名"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号"
                      prop="phone">
          <el-input placeholder="请输入手机号"
                    v-model="teacherInfo.phone"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="teacherInfo.sex"
                     placeholder="请选择性别">
            <el-option v-for="(item, key, index) in sex"
                       :key="index"
                       :label="item"
                       :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-radio v-model="teacherInfo.status"
                    :label="1">正常</el-radio>
          <el-radio v-model="teacherInfo.status"
                    class="taboo"
                    :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="学段"
                      prop="stage">
          <el-select v-model="teacherInfo.stage"
                     placeholder="请选择学段">
            <el-option v-for="(item, key, index) in stage"
                       :key="index"
                       :label="item"
                       :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任教科目"
                      prop="subject">
          <el-select v-model="teacherInfo.subject"
                     placeholder="请选择任教科目">
            <el-option v-for="(item, key, index) in subject"
                       :key="index"
                       :label="item"
                       :value="key"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary"
                   @click="toSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FormDialog',
  props: { sex: Object, stage: Object, subject: Object },
  data() {
    var phoneRule = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error(rule.message))
      } else {
        return callback()
      }
    };
    return {
      visible: false,
      teacherInfo: {},
      rules: {
        name: [
          { required: true, message: '请输入您的姓名' },
        ],
        phone: [
          { required: true, message: '请输入您的手机号' },
          { validator: phoneRule, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        stage: [
          { required: true, message: '请选择学段', trigger: 'change' }
        ],
        subject: [
          { required: true, message: '请选择教学科目', trigger: 'change' }
        ]
      },
    }
  },
  methods: {
    // 编辑
    edit(e) {
      this.visible = true;
      this.teacherInfo = { ...e }
    },

    // 确认提交按钮
    toSubmit(ref) {
      this.$refs[ref].validate((boolean) => {
        if (boolean) {
          this.changeInput()
        }
      });
    },
    // 修改input框内容
    changeInput() {
      setTimeout(() => {
        this.$bus.$emit('teacherInfo', JSON.parse(JSON.stringify(this.teacherInfo)))
        this.$refs['form'].resetFields();
        this.visible = false;
        this.teacherInfo = {};
      }, 150)

    },

    //取消按钮
    close() {
      this.$refs["form"].resetFields();
      this.visible = false;
      this.teacherInfo = {};
    }
  }
}
</script>

<style lang="scss">
.el-form-item {
  display: flex;
  .el-form-item__label {
    width: 80px;
  }
  .el-form-item__content {
    width: 380px;
  }
  .el-input__inner {
    width: 380px;
  }
}

.el-dialog__footer {
  text-align: center;
}
.el-dialog__body {
  padding: 10px 20px;
}

.taboo.is-checked {
  .el-radio__label {
    color: #bc0315;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: #bc0315;
    border-color: #bc0315;
  }
}
</style>