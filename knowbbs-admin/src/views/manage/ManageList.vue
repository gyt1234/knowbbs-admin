<template>
  <div>
    <bread father-title='管理员管理' son-title='管理员列表'></bread>
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入管理员名称" v-model="query" clearable @clear="getManageList">
            <el-button slot="append" icon="el-icon-search" @click="queryManage"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click='addDialogVisible = true'>新增管理员</el-button>
        </el-col>
      </el-row>
      <!-- 管理员列表区域 -->
      <el-table
        :data="manageList"
        stripe
        header-align='center'
        fit
        border
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="等级">
          <template slot-scope='scope'>
            <span>{{scope.row.level === '0' ? '超级管理员':'普通管理员'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope='scope'>
            <!-- 详情按钮 -->
            <el-tooltip effect="dark" content="详情" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-tickets" size="mini" @click='showDialog(scope.row.id)'></el-button>
            </el-tooltip>
            <!-- 编辑按钮 -->
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click='showEditDialog(scope.row.id)'></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增管理员的对话框 -->
    <el-dialog title="新增管理员" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="70px">
        <el-form-item label="名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-select v-model="addForm.level" placeholder="请选择管理员等级">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManage">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑管理员的对话框 -->
    <el-dialog title="编辑管理员" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="名称" prop='name'>
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pw">
          <el-input v-model="editForm.pw"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-select v-model="editForm.level" placeholder="请选择管理员等级">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="editDialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="editManage">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看管理员详情的的对话框 -->
    <el-dialog title="管理员详情" :visible.sync="showDialogVisible" width="30%">
      <el-row :gutter='20'>
        <el-col :span='6' class='viewClass'>名称：</el-col>
        <el-col :span='14'>{{editForm.name}}</el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='6' class='viewClass'>密码：</el-col>
        <el-col :span='14'>{{editForm.pw}}</el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='6' class='viewClass'>等级：</el-col>
        <el-col :span='14'>{{editForm.level === '1'? '普通管理员':'超级管理员'}}</el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='6' class='viewClass'>创建时间：</el-col>
        <el-col :span='17'>{{editForm.create_time}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
       <el-button @click="showDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bread from '@/components/Bread'
export default {
  name: 'ManageList',
  components: { Bread },
  comments: {
    Bread
  },
  data() {
    return {
      // 查询参数
      query: '',
      // 管理员列表数据
      manageList: [],
      // 控制新增弹框显示与隐藏
      addDialogVisible: false,
      // 控制编辑弹框显示与隐藏
      editDialogVisible: false,
      // 控制管理员详情弹框的显示与隐藏
      showDialogVisible: false,
      // 新增管理员的表单数据
      addForm: {
        username: '',
        password: '',
        level: '1'
      },
      // 查询到的管理员信息对象
      editForm: {},
      // 管理员等级下拉框
      options: [
        { label: '超级管理员', value: '0' },
        { label: '普通管理员', value: '1' }
      ],
      // 新增表单的验证规则对象
      addFormrules: {
        username: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 10, message: '管理员的长度在 3-10 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在 6-15 之间', trigger: 'blur' }
        ]
      },
      // 编辑验证规则对象
      editFormRules: {
        name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 10, message: '管理员的长度在 3-10 之间', trigger: 'blur' }
        ],
        pw: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在 6-15 之间', trigger: 'blur' }
        ]
      },
      // 当前编辑的管理员id
      editManageId: ''
    }
  },
  created() {
    this.getManageList()
    console.log(this.radio)
  },
  methods: {
    // 获取管理员列表
    async getManageList() {
      const { data: res } = await this.$http.get('/manage.php')
      this.manageList = res
    },
    // 根据名称搜索特定管理员
    async queryManage() {
      const { data: res } = await this.$http.get('/manage_query.php', { params: { name: this.query } })
      this.manageList = res
    },
    // 监听新增管理员对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 新增管理员
    addManage() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加管理员的网络请求
        const { data: res } = await this.$http.post('/manage_add.php', this.addForm)
        if (res.code !== 200) {
          this.$message.error('新增管理员失败!')
        }
        this.$message.success('新增管理员成功!')
        // 隐藏添加管理员的对话框
        this.addDialogVisible = false
        // 重新获取管理员列表数据
        this.getManageList()
      })
    },
    // 展示编辑管理员的对话框
    async showEditDialog (manageId) {
      const { data: res } = await this.$http.get('/manage_query.php', { params: { id: manageId } })
      this.editForm = res
      this.editDialogVisible = true
      this.editManageId = manageId
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 编辑管理员
    editManage() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起编辑管理员的网络请求
        this.editForm.id = this.editManageId
        const { data: res } = await this.$http.post('/manage_update.php', this.editForm)
        if (res.code !== 200) {
          this.$message.error('编辑管理员失败!')
        }
        this.$message.success('编辑管理员成功!')
        // 隐藏编辑管理员的对话框
        this.editDialogVisible = false
        // 重新获取管理员列表数据
        this.getManageList()
      })
    },
    // 展示管理员详情的对话框
    async showDialog (manageId) {
      const { data: res } = await this.$http.get('/manage_query.php', { params: { id: manageId } })
      this.editForm = res
      this.showDialogVisible = true
    }
  }
}
</script>
<style lang='less' scoped>
//.tableHeader{
//  font-size: 40px;
//}
.viewClass{
  font-weight: bold;
  text-align: right;
  height: 25px;
}
</style>
