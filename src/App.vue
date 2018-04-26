<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    console.log('6666')
  }
}
</script>

<style lang='scss'>
page{
  font-size: 1rem;
}
.container {
  font-size: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.wxParse {
  margin: 0 !important;
  .img{
    // padding: 50% 0;
    display: block;
    width: 100%;
    padding: .5rem 0;
    padding-bottom: 1rem;
    // min-height: 100px;
    height: 375rpx;
  }
}
</style>
