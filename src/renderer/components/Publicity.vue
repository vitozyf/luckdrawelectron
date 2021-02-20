<template>
  <div class="c-Publicity">
    <el-carousel
      height="50px"
      :autoplay="true"
      indicator-position="none"
      arrow="never"
      :interval="3000"
    >
      <el-carousel-item v-for="item in message" :key="item.key">
        <div class="item" :class="{ actiname: item.key === 0 }">
          <span v-if="item.title" class="title"> {{ item.title }}</span>
          <span v-if="item.value" class="value">
            {{ item.value }}
          </span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { conversionCategoryName } from '@/helper/index'

export default {
  name: 'Publicity',
  computed: {
    config() {
      return this.$store.state.config
    },
    result() {
      return this.$store.state.result
    },
    list() {
      return this.$store.state.list
    },
    message() {
      const { result, config, list } = this
      const fields = Object.keys(config)

      let message = [{ key: 0, title: config.name }]
      fields.forEach((item, index) => {
        let label = conversionCategoryName(item)
        if (result[item] && config[item] > 0) {
          const resultNameRes = JSON.parse(JSON.stringify(result[item]))
          resultNameRes.forEach((reitem, reindex) => {
            const listItem = list.find((a) => a.key === reitem)
            resultNameRes[reindex] = listItem.name
          })
          message.push({
            key: index + 1,
            title: `${label}抽奖结果:`,
            value: `${
              resultNameRes.length > 0 ? resultNameRes.join('、') : '暂未抽取'
            }`,
          })
        }
      })

      return message
    },
  },
}
</script>
<style lang="scss">
.c-Publicity {
  height: 100%;
  // width: 1000px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .el-carousel {
    width: 80vw;
    margin: 0 auto;
  }
  .item {
    text-align: center;
    color: #fff;
    font-size: 16px;
    .title {
      color: #ccc;
    }
    .value {
      margin-left: 10px;
    }
    &.actiname {
      .title {
        color: green;
        font-size: 20px;
      }
    }
  }
}
</style>
