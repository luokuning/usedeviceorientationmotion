import { renderHook } from '@testing-library/react-hooks'
import useDeviceOrientationValue from '../src'

it('should return desired value', () => {
  const hook = renderHook(() => useDeviceOrientationValue())

  expect(hook.result.current.rotation).toHaveProperty('x')
  expect(hook.result.current.rotation).toHaveProperty('y')
})

it('should throw error when props is not valid type', () => {})
