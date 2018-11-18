<template>
    <el-container>
        <el-header>Header</el-header>
        <el-main>
            <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
export default {
  name: 'mainLayout',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
