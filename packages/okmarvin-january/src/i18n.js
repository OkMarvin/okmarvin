const obj = {
  'Topics:': {
    zh: '主题：'
  },
  'Topic:': {
    zh: '主题'
  },
  'Learn More': {
    zh: '查看更多'
  },
  'NEWER': {
    zh: '新一篇'
  },
  'OLDER': {
    zh: '旧一篇'
  }
}
export default function (msgid, locale = 'en') {
  if (!obj[msgid]) return msgid
  if (obj[msgid] && !obj[msgid][locale]) return msgid
  return obj[msgid][locale]
}
