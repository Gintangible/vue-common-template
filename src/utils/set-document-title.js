/**
 * 更新浏览器显示的title
 */

export default function setDocumentTitle(title) {
  if (title && title !== document.title) {
    document.title = title;
  }
}
