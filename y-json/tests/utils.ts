import _ from 'lodash'
import * as Y from 'yjs'

export type RandomArr = RandomValue[]
export type RandomPrimitive = string | number | boolean
export type RandomValue = RandomPrimitive | RandomArr | RandomObj
export type RandomObj = { [key: string]: RandomValue }

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const generateArray = (): RandomArr => _.range(0, _.random(0, 10, false)).map(() => generateValue())

const generatePrimitive = (): RandomPrimitive =>
  _.sample([..._.range(0, 5), 'abc', 'def', 'acb', 'adc', '', false, true]) ?? 0

export const generateValue = (): RandomValue => {
  const index = _.random(0, 25, false)
  if (index < 2) {
    return generateArray()
  } else if (index < 5) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return generateObject()
  }
  return generatePrimitive()
}

export const generateObject = (): RandomObj => {
  const entries: [string, RandomValue][] = _.range(0, _.random(0, 5, false)).map((it, index) => {
    return [`${index}`, generateValue()]
  })
  return Object.fromEntries(entries)
}

export const generateLongString = (): string =>
  _.range(10, _.random(20, 200))
    .map(() => _.sample(['a', 'b', 'c', '1', '2', '3']))
    .join()

export const makeDoc = (): Y.Doc => new Y.Doc()

export const makeYMap = (): Y.Map<unknown> => makeDoc().getMap('test-map')

export const makeYArray = (): Y.Array<unknown> => makeDoc().getArray('test-array')
