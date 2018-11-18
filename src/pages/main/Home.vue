<template>
  <div class="home">
     <div ref="home-chart-top" class="home-chart-wrap" style="width:300px;height:200px;"></div>
   <el-container class='demo-container'>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
</el-container>

<el-container class='demo-container'>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
  <el-footer>Footer</el-footer>
</el-container>

<el-container class='demo-container'>
  <el-aside width="200px">Aside</el-aside>
  <el-main>Main</el-main>
</el-container>

<el-container class='demo-container'>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container >

<el-container class='demo-container'>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>

<el-container class='demo-container'>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>

<el-container class='demo-container'>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>

  </div>
</template>

<script>
// @ is an alias to /src
import echarts from 'echarts'
export default {
  name: 'home',
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.showTopChart()
        this.showBottomChart()
      }, 100)
    })
  },
  methods: {
    drawLineChart (ref, option) {
      var myChart = echarts.init(this.$refs[ref])
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    showTopChart () {
      const option = {
        backgroundColor: '#fff',
        color: [
          '#4A9BFD',
          '#E95F45',
          '#01A292'
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#666'
          },
          extraCssText: 'box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.1);'
        },
        grid: {
          top: '5%',
          left: '0%',
          right: '2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        series: [
          {
            name: '邮件',
            type: 'line',
            smooth: true,
            symbolSize: 6,
            data: [120, 82, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟',
            type: 'line',
            smooth: true,
            symbolSize: 6,
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            smooth: true,
            symbolSize: 6,
            data: [150, 232, 201, 154, 190, 330, 310]
          }
        ]
      }
      this.drawLineChart('home-chart-top', option)
    }
  }
}
</script>
<style scoped lang="stylus">
.demo-container{
    margin-bottom 50px
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>
