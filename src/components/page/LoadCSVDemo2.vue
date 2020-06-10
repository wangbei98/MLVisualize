<template>
  <div class="app">
    <el-container style="height: 600px; border: 1px solid #eee">
      <el-main>
        <h3>Example - Import file with required login, firstname, lastname and optional values</h3>
        <br>
        <xls-csv-parser :columns="columns" @on-validate="onValidate" :help="help" lang="en"></xls-csv-parser>
        <br><br>
        <div class="results" v-if="results">
          <h3>Results:</h3>
          <pre>{{ JSON.stringify(results, null, 2) }}</pre>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { XlsCsvParser } from 'vue-xls-csv-parser';
  export default {
    name: 'load-csv-demo-2',
    components: {
      XlsCsvParser,
    },
    methods: {
      onValidate(results) {
        this.results = results;
      },
    },
    data() {
      return {
        columns: [
          { name: 'x', value: 'petal_l' },
          { name: 'y', value: 'petal_w' },
        ],
        results: null,
        help: 'Necessary columns are: login, firstname and lastname',
      };
    },
  };
</script>
