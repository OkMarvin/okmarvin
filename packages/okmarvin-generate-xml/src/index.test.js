const render = require('./index')
test('should return raw string', () => {
  expect(render('123', {})).toBe('123')
})
test('should compile template with data', () => {
  expect(render('<%= data.name %>', { name: 'sam' })).toBe('sam')
})
test('should format the date', () => {
  expect(
    render('<%= format(data.date, "YYYY/MM/DD") %>', {
      date: new Date('2018-01-09')
    })
  ).toBe('2018/01/09')
})
