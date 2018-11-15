### Photo2.0 （我想学摄影）
> 此项目主要是学习thinkjs做的一个文章发布系统项目。前端目前只开发了微信小程序版本，后台管理用的vue，服务端是基于node的thinkjs。目前开发功能比较简单，后续有时间还会继续。。。

<p align="left">
    <img width="200" src="https://raw.githubusercontent.com/Raydooom/photo2.0/master/images/gh_a9ada37d4c7c_344.jpg">
</p>

#### wechat 微信小程序
1. 用户登录（jwt校验）
2. 文章点赞
3. 文章评论
4. 文章统计
5. 个人中心点赞、评论的文章统计
6. wxParse富文本解析
7. 对http、微信api进行Promise封装
8. 精选模块（2018.11.15）

#### admin 后台管理（基于element-ui的vue）
1. aes加密登录
2. 文章发布
3. 富文本编辑器（quillEditor）
4. 图片上传
5. 文章列表
6. 文章删除、编辑
7. 精选模块管理（2018.11.15）

#### server 服务端（thinkjs）
1. 动态aesKey生成、aes解密校验（vue）
2. cookie登录
3. jwt生成token登录校验（小程序不支持cookie）
4. 获取小程序openid生成唯一用户
5. 图片上传，gm压缩图片
6. 数据库增操作（mysql）


此次还是有很大收获的，登录加密、jwt token、nginx配置代理等，项目结构也比较清晰。当然还存在很多问题，后续会继续完善更新。
