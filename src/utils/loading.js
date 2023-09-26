import { Toast } from 'vant';

let loadingCount = 0;

function startLoading() {
  Toast.loading({
    forbidClick: true
  });
}

function clearLoading() {
  Toast.clear();
}

function showLoading() {
  if (loadingCount === 0) {
    startLoading();
  }
  loadingCount++;
}

function hideLoading() {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount--;
  if (loadingCount === 0) {
    clearLoading();
  }
}

export {
  showLoading,
  hideLoading,
};
