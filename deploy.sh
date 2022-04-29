# 本地目录
localfile="dist"
# 项目目录
filename="serverDir"
# 打包命令
buildCmd="yarn build:stage"
# 发布命令
deployCmd="scp -P 8080 -r $localfile/* guxw@xx.xxx.cn:/data/nginx/html/$filename/"


# 生产是发布到OSS上的, 所以这部分不用到
function getVar() {
  case $1 in
    'prod')
        buildCmd="yarn build"
        deployCmd="scp -P 8080 -r $localfile/*  guxw@xx.xxx.cn:/data/nginx/html/$filename/"
        ;;
    *)
        buildCmd="yarn build:stage"
  esac
}

getVar $1

yarn
if [ $filename ] && $buildCmd; then
  echo $deployCmd;
  $deployCmd;
fi
