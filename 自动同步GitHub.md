# （一键/自动）将本地文件同步到GitHub

在学习的过程中，经常使用git将代码提交到github，有时对自己的代码多次补充，需要经常打开terminal再输入git命令提交。

在记笔记的过程中，由于我使用的是typora，并没有云端功能，导致可能会将记录丢失。使用GitHub仓库来储存自己的笔记是一个不错的选择，但每次的修改都push一次实在是繁琐。

在多次感受到这样的繁琐时，于是决定了解一下有没有可能写一个脚本自动将本地的文件提交到GitHub仓库



## Step 1

创建GitHub仓库，将项目文件夹在terminal中打开，输入git命令：

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/用户名/仓库名.git
git push -u origin main
```



## Step 2

此时项目已经提交到了GitHub，可以检查是否提交成功，成功提交后可以开始编写脚本

```bash
cd 项目地址
git add .
git commit -m "save"
git push -u origin main
```

将脚本随意命名，保存为.sh文件即可



## Step 3

给脚本添加权限  参照[chmod用法](https://blog.csdn.net/qq646748739/article/details/81166776)

没有特殊情况，图方便可以直接使用：

``````bash
sudo chmod 777 项目地址
``````



## Step 4

将文件默认打开方式改为 Terminal(终端) ，即可每次打开该文件时自动push到GitHub

或者使用crontab定时上传，参考[Mac上crontab的使用](https://blog.csdn.net/zhenhanhong_tony/article/details/52658055)、[cron表达式生成器](https://cron.qqe2.com/)

