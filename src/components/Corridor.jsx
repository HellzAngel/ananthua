import React, { useRef, useState, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const Door = ({ position, rotation, label, onClick, texture }) => {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.setScalar(1.05)
      meshRef.current.position.z = 0.1 // Pop out slightly on hover (local Z)
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1)
      meshRef.current.position.z = 0.02 // Default offset to prevent z-fighting
    }
  })
  
  return (
    <group position={position} rotation={rotation}>
      <mesh 
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        position={[0, 0, 0.02]}
      >
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial map={texture} color={hovered ? "#ffcfd2" : "#ffffff"} />
      </mesh>

      <Text position={[0, 2.5, 0.1]} fontSize={0.35} color="#2c2c2c">
        {label}
      </Text>
    </group>
  )
}

const CorridorSegment = ({ onDoorClick, position, wallTexture, floorTexture, doorTexture }) => {
  const frontDoorRef = useRef()

  useFrame(({ camera }) => {
    if (frontDoorRef.current) {
      // Calculate distance from camera to this segment's front door
      const doorZ = position[2] + 9
      const dist = camera.position.z - doorZ
      
      // Swing open when within 4 units
      if (dist > 0 && dist < 4) {
        const openProgress = 1 - (dist / 4) // goes 0 -> 1
        // Swing inwards (-Math.PI/2)
        frontDoorRef.current.rotation.y = -openProgress * (Math.PI / 2)
      } else if (dist <= 0) {
        frontDoorRef.current.rotation.y = -Math.PI / 2
      } else {
        frontDoorRef.current.rotation.y = 0
      }
    }
  })

  return (
    <group position={position}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 30]} />
        <meshBasicMaterial map={floorTexture} color="#ffffff" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]}>
        <boxGeometry args={[0.2, 5, 30]} />
        <meshBasicMaterial map={wallTexture} color="#ffffff" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2.5, 0]}>
        <boxGeometry args={[0.2, 5, 30]} />
        <meshBasicMaterial map={wallTexture} color="#ffffff" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[10, 30]} />
        <meshBasicMaterial map={floorTexture} color="#ffffff" />
      </mesh>

      <group position={[-4.8, 3, 2]}>
        <Text rotation={[0, Math.PI / 2, 0]} fontSize={0.4} color="#3d3d3d">
          ANANTHU'S SPACE
        </Text>
      </group>

      {/* Poster 1 */}
      <group position={[-4.8, 2, -8]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.2, 1.6]} />
          <meshBasicMaterial color="#fcfcfc" />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.3, 1.7]} />
          <meshBasicMaterial color="#3d3d3d" wireframe />
        </mesh>
        <Text position={[0, 0, 0.06]} fontSize={0.15} color="#3d3d3d" maxWidth={1} textAlign="center">
          SKETCH IDEA 01
        </Text>
      </group>

      {/* Poster 2 (Sticky Note) */}
      <group position={[4.8, 1.5, -10]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0.05]} rotation={[0, 0, 0.1]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial color="#f1f2b5" />
        </mesh>
        <Text position={[0, 0, 0.06]} rotation={[0, 0, 0.1]} fontSize={0.12} color="#3d3d3d" maxWidth={0.6}>
          Don't forget to draw...
        </Text>
      </group>

      {/* Entrance Wall */}
      <group position={[0, 0, 9]}>
        <mesh position={[-3.5, 2.5, 0]}>
          <boxGeometry args={[3, 5, 0.2]} />
          <meshBasicMaterial map={wallTexture} color="#ffffff" />
        </mesh>
        <mesh position={[3.5, 2.5, 0]}>
          <boxGeometry args={[3, 5, 0.2]} />
          <meshBasicMaterial map={wallTexture} color="#ffffff" />
        </mesh>
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[4, 1, 0.2]} />
          <meshBasicMaterial map={wallTexture} color="#ffffff" />
        </mesh>
        
        {/* The Swinging Front Door — fills the doorway */}
        <group position={[-2, 2, 0.05]} ref={frontDoorRef}>
          <mesh position={[2, 0, 0]}>
            <planeGeometry args={[4, 4]} />
            <meshBasicMaterial map={doorTexture} color="#ffffff" />
            
            <Text position={[0, 0.8, 0.01]} fontSize={0.6} color="#3d3d3d">
              ananthu
            </Text>
            <Text position={[0, 0, 0.01]} fontSize={0.25} color="#ff4757">
              Creative 3D Portfolio
            </Text>
            <Text position={[0, -1.2, 0.01]} fontSize={0.15} color="#2c2c2c">
              Scroll to push door...
            </Text>
          </mesh>
        </group>
      </group>

      <group position={[4.8, 2, -3]}>
        <Text rotation={[0, -Math.PI / 2, 0]} fontSize={0.3} color="#3d3d3d">
          WELCOME TO MY BRAIN
        </Text>
      </group>

      {/* Left Wall Doors */}
      <Door 
        position={[-4.8, 2, 6]} rotation={[0, Math.PI / 2, 0]} 
        label="ABOUT ME" onClick={() => onDoorClick('about')} texture={doorTexture}
      />
      <Door 
        position={[-4.8, 2, -2]} rotation={[0, Math.PI / 2, 0]} 
        label="EDUCATION" onClick={() => onDoorClick('education')} texture={doorTexture}
      />
      <Door 
        position={[-4.8, 2, -10]} rotation={[0, Math.PI / 2, 0]} 
        label="WEBSITE" onClick={() => onDoorClick('work')} texture={doorTexture}
      />

      {/* Right Wall Doors */}
      <Door 
        position={[4.8, 2, 2]} rotation={[0, -Math.PI / 2, 0]} 
        label="SKILLS" onClick={() => onDoorClick('skills')} texture={doorTexture}
      />
      <Door 
        position={[4.8, 2, -6]} rotation={[0, -Math.PI / 2, 0]} 
        label="EXPERIENCE" onClick={() => onDoorClick('experience')} texture={doorTexture}
      />
      <Door 
        position={[4.8, 2, -14]} rotation={[0, -Math.PI / 2, 0]} 
        label="GET IN TOUCH" onClick={() => onDoorClick('contact')} texture={doorTexture}
      />
    </group>
  )
}

const Corridor = ({ onDoorClick }) => {
  const wallTexture = useTexture('/wall.png')
  const floorTexture = useTexture('/wood_floor.png')
  const doorTexture = useTexture('/door.png')

  useEffect(() => {
    if (wallTexture) {
      wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping
      wallTexture.repeat.set(3, 1)
    }
    if (floorTexture) {
      floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
      floorTexture.repeat.set(1, 3)
    }
  }, [wallTexture, floorTexture])

  return (
    <group>
      <CorridorSegment position={[0, 0, 30]} onDoorClick={onDoorClick} wallTexture={wallTexture} floorTexture={floorTexture} doorTexture={doorTexture} />
      <CorridorSegment position={[0, 0, 0]} onDoorClick={onDoorClick} wallTexture={wallTexture} floorTexture={floorTexture} doorTexture={doorTexture} />
      <CorridorSegment position={[0, 0, -30]} onDoorClick={onDoorClick} wallTexture={wallTexture} floorTexture={floorTexture} doorTexture={doorTexture} />
    </group>
  )
}

export default Corridor
