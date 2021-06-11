# 项目目录
filename="dist"
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
# 删除之前的目录文件
if [ -f $fileURL.zip ]; then
  rm $fileURL.zip
fi

if $buildCmd; then
  # 压缩文件
  zip -r $fileURL.zip $fileURL
fi
