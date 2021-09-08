import { orientation } from 'react-native-sensors'
import { renderHook } from '@testing-library/react-hooks'
import useDeviceOrientationValue from '../src'

const unsubscribe = jest.fn()
jest.mock('react-native-sensors', () => ({
  __esModule: true,
  orientation: {
    subscribe: jest.fn((cb) => {
      cb({ qw: 0, qx: 0, qy: 0, qz: 0 })
      return {
        unsubscribe,
      }
    }),
  },
}))

it('should throw error with invalid limit param', () => {
  // @ts-ignore
  const { result } = renderHook(() => useDeviceOrientationValue({ limit: 'a' }))
  expect(result.error).toBeInstanceOf(TypeError)
})

it('should throw error with invalid sensitivityX param', () => {
  // @ts-ignore
  const { result } = renderHook(() => useDeviceOrientationValue({ sensitivityX: 'x' }))
  expect(result.error).toBeInstanceOf(TypeError)
})

it('should throw error with invalid sensitivityY param', () => {
  // @ts-ignore
  const { result } = renderHook(() => useDeviceOrientationValue({ sensitivityY: 'y' }))
  expect(result.error).toBeInstanceOf(TypeError)
})

it('should subscribe and unsubscribe orientation event', () => {
  const { unmount } = renderHook(() => useDeviceOrientationValue())
  expect(orientation.subscribe).toHaveBeenCalledTimes(1)

  unmount()

  expect(unsubscribe).toHaveBeenCalledTimes(1)
})

it('should return desired value', () => {
  const { result } = renderHook(() => useDeviceOrientationValue())

  expect(result.current.rotation).toBeInstanceOf(Object)

  expect(result.current.rotation).toHaveProperty('x')
  expect(result.current.rotation).toHaveProperty('y')

  expect(typeof result.current.subscribe).toBe('function')
  expect(typeof result.current.unsubscribe).toBe('function')
})
