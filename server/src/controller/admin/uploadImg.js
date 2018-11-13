const fs = require("fs");
if (think.env != "development") {
  const gm = require("gm");
}

module.exports = class extends think.Controller {
  async indexAction() {
    think.logger.info("123")
    this.header("Access-Control-Allow-Origin", "*");
    let file = this.file("img");
    let savepath = think.ROOT_PATH + "/www/static/uploadImg/";
    let filepath = file.path; //文件路径
    let filename = file.name; //文件名
    let suffix = filename.substr(filename.lastIndexOf(".") + 1); //文件后缀
    let newfilename = Math.random().toString(36).substr(2) + "." + suffix;
    //读文件
    let datas = fs.readFileSync(filepath);
    //写文件
    fs.writeFileSync(savepath + newfilename, datas);

    // 图片压缩
    if (think.env != "development") {
      gm(savepath + newfilename)
        .resize(1000, 1000, '>') //设置压缩后的w/h
        .setFormat(suffix)
        .quality(70) //设置压缩质量: 0-100
        .strip()
        .autoOrient()
        .write(savepath + newfilename,
          function (err) {
            if (err) {
              think.logger.info("图频上传压缩错误结果：", res)
            } else {
              think.logger.info("图片上传成功，文件名:", newfilename)
            }
          })
    }
    let newpath = "/static/uploadImg/" + newfilename;
    this.success(newpath, "上传成功！")
  }
}
