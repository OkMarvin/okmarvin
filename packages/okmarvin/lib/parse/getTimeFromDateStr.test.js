const getTimeFromDateStr = require('./getTimeFromDateStr')
test('returns date', () => {
  expect(getTimeFromDateStr('2018-10-10')).toMatchSnapshot()
})
