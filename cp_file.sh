# 需要 cp 的目录
fileURL="vue-common-template"
# 目标目录
outURL="/mnt/d/temp/development/"
buildCmd="yarn build:stage"

function getVar() {
  case $1 in
    'prod')
        outURL="/mnt/d/temp/prod/"
        buildCmd="yarn build"
        ;;
    *)
        outURL="/mnt/d/temp/development/"
        buildCmd="yarn build:stage"
  esac
}

# 获取到变量
getVar $1

# 删除之前的目录文件
if [ -f $fileURL.zip ]; then
  rm $fileURL.zip
fi

if $buildCmd; then
  # 压缩文件
  zip -r $fileURL.zip $fileURL
  if [ -f $fileURL.zip ]; then
    # 复制文件
    cp $fileURL.zip $outURL$fileURL-$(date +%Y%m%d%H%M%S).zip
  else
    echo "打包文件不存在"
  fi
fi

