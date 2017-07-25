<template>
  <el-dialog title="新增自选" :visible.sync="isVisible">
    <el-form :model="form">
      <el-form-item label="股票名称" :label-width="formLabelWidth">
        <el-autocomplete
          class="input"
          v-model="form.name"
          :fetch-suggestions="querySearch"
          placeholder="股票名称或代码"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="hide">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px'
      };
    },
    methods: {
      hide() {
        this.$store.dispatch('hide');
      },
      querySearch(queryString, cb) {
        const regexp = /var suggestvalue="(.*)";/gi;
        this.$http.get(`http://suggest3.sinajs.cn/suggest/key=${queryString}`).then(data => {
          const match = regexp.exec(data.bodyText);
          if (match) {
            const stockStr = match[1];
            const stockList = stockStr.split(';')

          }
        });
        cb([{
          value: '123', code: '456'
        }]);
      }
    },
    computed: {
      isVisible() {
        return this.$store.state.addStock.visible;
      }
    }
  };
</script>
