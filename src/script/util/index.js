export const getRedirectPath = ({
  type,
  avatar
}) => {
  // 根据用户信息 返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = (type === 'boss') ? '/boss' : '/genuis'
  if (!avatar) {
    url = `${url}info`
  }
  return url
}
