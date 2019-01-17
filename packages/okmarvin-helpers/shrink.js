module.exports = ({
  title,
  date,
  datePublished,
  permalink,
  data = Object.create(null),
  template
}) => {
  return { title, date, datePublished, permalink, data, template }
}
