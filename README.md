
# 基于mpvue 和 bootstrap 的 cnode 微信小程序

## 项目简介
一个小程序版的cnode客户端，项目采用mpvue + bootstrap技术栈构建。
- 感谢来自[cnodejs论坛](https://cnodejs.org/)官方提供的api！


## 运用的技术主要有:
- 采用mpvue + bootstrap技术栈，通过vuex来管理页面状态。
- UI框架采用的选用的是Bootstrap
- 应用`flyio`库代替`request`实现网络请求
- 使用`PostCSS`对CSS进行预处理

## 预览
![](./static/images/doc/mpvue-qrcode.jpg 'cnode助手')

备注: 由于个人小程序只有五个，且cnode助手涉及资讯，招聘等不让审核通过，所以暂停服务。想体验的化可以把代码拉下来试试

## 运行项目
```
  git clone https://github.com/strawbreey/mpvue-cnode.git
  cd mpvue-cnode
  npm install
  npm run dev
```
 打开微信开发者工具, 创建新项目。找到当前项目文件中的dist文件

## 生产项目
```
  npm run build
```
 微信开发者中选择`上传`新项目。登录微信公众平台,选择开发管理点击提交审核
