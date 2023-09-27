import getSearchParam from '@/utils/url/get-search-param';
import removeSearchParam from '@/utils/url/remove-search-param';

import { getOpenId } from '@/api/login';
import alert from '@/utils/alert';
import config from '@/config';

/**
 * 在执行到需要openId的代码时，如果openId依然是undefined或null，则调用此程序
 * 显示错误信息并重载当前网页，重新登录流程。
 */
function processError() {
  alert.show('提示', '无法正确获取微信授权，稍后将自动刷新页面重试', () => {
    // 把当前页面网址参数中的code去除，并转换为标准形式
    const url = removeSearchParam('code');
    console.debug('The URL of current page without "code" parameter is: {0}', url);
    window.location.href = url;
  });
}

/**
 * 获取微信授权码，并跳转至微信授权页面，授权成功会重新跳回本页面并带上授权码参数
 */
async function getAuthorizeCode() {
  const locationHref = window.location.href;
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.wxAppId}&redirect_uri=${encodeURIComponent(locationHref)}&response_type=code&scope=snsapi_base#wechat_redirect`;
  window.location.href = url;
}

// 微信登陆，获取当前用户的微信open ID。
async function wechatLogin() {
  console.debug('WechatLogin.wechatLogin');
  // 检查参数是否带有微信授权码
  const code = getSearchParam('code');
  if (!code) {
    // 获取微信授权码，并跳转至微信授权页面，授权成功会重新跳回本页面并带上授权码参数
    await getAuthorizeCode();
    return Promise.reject(new Error('微信授权码已失效'));
  } else {
    // 利用微信授权码获取微信 Open ID
    return getOpenId(code).then((res) => {
      if (!res.data?.openid) {
        processError();
        return null;
      }
      return Promise.resolve(res);
    }).catch(() => {
      processError();
    });
  }
}

export {
  wechatLogin as default,
  wechatLogin,
  processError,
};
