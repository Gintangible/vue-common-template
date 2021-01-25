# sudo apt-get install jq
JQ_EXEC=`which jq`
FILE_PATH=package.json
filename=$(cat $FILE_PATH | ${JQ_EXEC} .name | sed 's/\"//g')
yarn install
if [ $filename ] && yarn build:stage; then
echo $filename;
  # scp -P xxxx -r $filename/*  NGINX/$filename/;
fi