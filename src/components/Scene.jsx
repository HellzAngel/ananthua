import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import Corridor from './Corridor'

const Scene = ({ activeRoom, setActiveRoom }) => {
  const scroll = useScroll()
  const { camera } = useThree()
  const group = useRef()
  const [animatingToRoom, setAnimatingToRoom] = useState(false)
  const [previousRoom, setPreviousRoom] = useState(null)
  
  // Track mouse for parallax (desktop only — touch conflicts with scroll on mobile)
  const mouse = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })
  const isMobile = useRef(window.innerWidth < 768)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMobile.current) return
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleResize = () => {
      isMobile.current = window.innerWidth < 768
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Pre-calculate the camera path
  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.6, 10),
      new THREE.Vector3(0.5, 1.6, 5),
      new THREE.Vector3(-0.5, 1.6, 0),
      new THREE.Vector3(0.2, 1.6, -5),
      new THREE.Vector3(-0.2, 1.6, -10),
      new THREE.Vector3(0, 1.6, -20)
    ])
  }, [])

  const handleDoorClick = (room) => {
    if (animatingToRoom) return
    setAnimatingToRoom(true)
    
    let targetPos = new THREE.Vector3()
    let targetLook = new THREE.Vector3()

    if (room === 'about') {
      targetPos.set(-5.5, 1.6, 6)
      targetLook.set(-6, 1.6, 6)
    } else if (room === 'skills') {
      targetPos.set(5.5, 1.6, 2)
      targetLook.set(6, 1.6, 2)
    } else if (room === 'education') {
      targetPos.set(-5.5, 1.6, -2)
      targetLook.set(-6, 1.6, -2)
    } else if (room === 'experience') {
      targetPos.set(5.5, 1.6, -6)
      targetLook.set(6, 1.6, -6)
    } else if (room === 'work') {
      targetPos.set(-5.5, 1.6, -10)
      targetLook.set(-6, 1.6, -10)
    } else if (room === 'contact') {
      targetPos.set(5.5, 1.6, -14)
      targetLook.set(6, 1.6, -14)
    }

    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      ease: "power2.inOut"
    })

    // Create a dummy object to look at, and animate its position
    const dummyLookAt = new THREE.Vector3().copy(camera.getWorldDirection(new THREE.Vector3()).add(camera.position))
    gsap.to(dummyLookAt, {
      x: targetLook.x,
      y: targetLook.y,
      z: targetLook.z,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(dummyLookAt),
      onComplete: () => {
        setActiveRoom(room)
        setPreviousRoom(room)
        setAnimatingToRoom(false)
      }
    })
  }

  // Handle returning from a room smoothly
  useEffect(() => {
    if (!activeRoom && previousRoom) {
      setAnimatingToRoom(true)
      const offset = Math.max(0, Math.min(1, scroll.offset || 0))
      const point = path.getPointAt(offset)
      const lookAtPoint = path.getPointAt(Math.min(offset + 0.01, 1))

      if (point && lookAtPoint) {
        gsap.to(camera.position, {
          x: point.x, y: point.y, z: point.z,
          duration: 1.5, ease: "power2.inOut"
        })

        const dummyLookAt = new THREE.Vector3().copy(camera.getWorldDirection(new THREE.Vector3()).add(camera.position))
        gsap.to(dummyLookAt, {
          x: lookAtPoint.x, y: lookAtPoint.y, z: lookAtPoint.z,
          duration: 1.5, ease: "power2.inOut",
          onUpdate: () => camera.lookAt(dummyLookAt),
          onComplete: () => {
            setPreviousRoom(null)
            setAnimatingToRoom(false)
          }
        })
      }
    }
  }, [activeRoom, previousRoom, camera, path, scroll])

  useFrame((state, delta) => {
    if (activeRoom || animatingToRoom) return

    // Smooth out mouse input to prevent jerky movement
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05

    // Get scroll progress (0 to 1) and clamp it
    const offset = Math.max(0, Math.min(1, scroll.offset || 0))
    
    // Calculate position on the path
    const point = path.getPointAt(offset)
    const lookAtPoint = path.getPointAt(Math.min(offset + 0.01, 1))

    // Smoothly move camera with gentle parallax
    if (point && lookAtPoint) {
      const targetPosition = point.clone()
      targetPosition.x -= smoothMouse.current.x * 0.15
      targetPosition.y -= smoothMouse.current.y * 0.1

      camera.position.lerp(targetPosition, 0.08)
      
      // Look toward mouse direction
      const targetLookAt = lookAtPoint.clone()
      targetLookAt.x += smoothMouse.current.x * 1.5
      targetLookAt.y += smoothMouse.current.y * 0.8
      
      camera.lookAt(targetLookAt)
    }
  })

  return (
    <group ref={group}>
      <Corridor onDoorClick={handleDoorClick} />
      <color attach="background" args={['#f4f1ea']} />
      <fog attach="fog" args={['#f4f1ea', 15, 35]} />
    </group>
  )
}

export default Scene
