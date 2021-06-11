# 项目目录
filename="vue-common-template"
# 打包命令
buildCmd="yarn build:stage"

function getVar() {
  case $1 in
    'prod')
        buildCmd="yarn build"
        ;;
    *)
        buildCmd="yarn build:stage"
  esac
}

getVar $1

yarn install
if [ $filename ] && $buildCmd; then
echo $filename;
  # scp -P xxxx -r $filename/*  NGINX/$filename/;
fi