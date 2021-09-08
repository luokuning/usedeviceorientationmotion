import { Quaternion, Euler } from 'three'
import { orientation } from 'react-native-sensors'
import { useRef, useState, useEffect } from 'react'

type Props = {
  /**
   * Max Angle
   */
  limit?: number
  /**
   * X axis sensitivity to response to device orientation event
   */
  sensitivityX?: number
  /**
   * Y axis sensitivity to response to device orientation event
   */
  sensitivityY?: number
}

export default function useDeviceOrientationValue({
  limit = 15,
  sensitivityX = 180,
  sensitivityY = 90,
}: Props = {}) {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  })
  const subscription = useRef<{ unsubscribe: () => void }>()
  const initRotation = useRef<{ x: number; y: number }>()

  if (
    typeof limit !== 'number' ||
    typeof sensitivityX !== 'number' ||
    typeof sensitivityY !== 'number'
  ) {
    throw new TypeError('limit, sensitivityX, sensitivityY must be number')
  }

  const limitRotateDegree = (degree: number) => {
    if (degree > 0) {
      if (degree > limit) {
        return limit + (degree - limit) * 0.01
      }
      return degree
    }

    if (degree > -limit) {
      return degree
    }
    return -limit - Math.abs(degree + limit) * 0.01
  }

  const subscribe = () => {
    if (subscription.current) {
      return
    }

    subscription.current = orientation.subscribe(({ qx, qy, qz, qw }) => {
      // Use of quaternion to avoid gimbal lock
      const q = new Quaternion(qx, qy, qz, qw).conjugate()
      const e = new Euler().setFromQuaternion(q, 'XYZ')

      const [pitch, roll] = e.toArray()
      const x = Math.ceil(
        limitRotateDegree((pitch - (initRotation.current?.x ?? 0)) * sensitivityX),
      )
      const y = Math.ceil(limitRotateDegree(roll * sensitivityY))
      if (!initRotation.current) {
        initRotation.current = {
          x: pitch,
          y: roll,
        }
      }

      setRotation({
        x: -x,
        y,
      })
    })
  }

  const unsubscribe = () => {
    if (subscription.current) {
      subscription.current.unsubscribe()
    }
    subscription.current = undefined
  }

  useEffect(() => {
    subscribe()

    return unsubscribe
  }, [])

  return {
    rotation,
    subscribe,
    unsubscribe,
  }
}
