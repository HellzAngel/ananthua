import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Loader, PerspectiveCamera } from '@react-three/drei'
import Scene from './components/Scene'
import PaperOverlay from './components/PaperOverlay'
import LoadingScreen from './components/LoadingScreen'
import { Volume2, VolumeX, Menu } from 'lucide-react'

function App() {
  const [isMuted, setIsMuted] = useState(true)
  const [loading, setLoading] = useState(true)
  const [activeRoom, setActiveRoom] = useState(null)
  const [activeSite, setActiveSite] = useState('https://hellzangel.github.io/sapthamantra/')
  const audioRef = useRef(null)

  const websites = [
    { name: 'Sapthamantra', url: 'https://hellzangel.github.io/sapthamantra/' },
    { name: 'MusiFy', url: 'https://hellzangel.github.io/MusiFy/' },
    { name: 'MovieSeer', url: 'https://hellzangel.github.io/MovieSeer/' },
    { name: 'Ananthu Web', url: 'https://hellzangel.github.io/ananthu-web/' },
    { name: 'Vithu', url: 'https://vithu-eosin.vercel.app/' },
    { name: 'Chayakada', url: 'https://chayakada-jet.vercel.app/' }
  ]

  useEffect(() => {
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log('Audio play blocked:', e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMuted])

  return (
    <div className="app-container">
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      
      <PaperOverlay />
      
      <div className="canvas-container">
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 1.6, 5]} fov={window.innerWidth < 768 ? 90 : 75} />
          
          <Suspense fallback={null}>
            <ScrollControls pages={4} damping={0.3} enabled={!activeRoom} infinite>
              <Scene activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
              
              {/* HTML Content that moves with scroll if needed */}
              <Scroll html>
                <div style={{ width: '100vw', height: '400vh', pointerEvents: 'none' }}>
                  {/* We can place floating labels here if we want them to be HTML */}
                </div>
              </Scroll>
            </ScrollControls>
          </Suspense>

          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        </Canvas>
      </div>

      <div className="ui-layer">
        <div className="top-nav">
          <h1 className="logo-text">ananthu</h1>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>

      </div>

      {activeRoom && (
        <div className="room-content-overlay">
          <button className="hand-drawn-btn close-btn" onClick={() => setActiveRoom(null)}>X CLOSE</button>
          <div className="room-content" style={activeRoom === 'work' ? { maxWidth: '90vw', width: '100%', padding: '1rem' } : {}}>
            {activeRoom === 'about' && (
              <div>
                <h2>ABOUT ANANTHU</h2>
                <p style={{ textAlign: 'left', fontSize: '1.2rem', lineHeight: '1.6' }}>
                  I am an innovative developer with over 4.5 years of experience, specializing in Python, Pandas, Django, Flask, Vue.js, CKAN, and PySpark. 
                  I hold a Master of Computer Applications (MCA) from Marian College and am a RedHat Certified System Administrator. 
                  My passion lies in bridging powerful backend systems with intuitive user experiences and leveraging modern frameworks to craft scalable, efficient code.
                </p>
              </div>
            )}
            {activeRoom === 'experience' && (
              <div style={{ textAlign: 'left', maxHeight: '60vh', overflowY: 'auto' }}>
                <h2>EXPERIENCE</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '1.5rem' }}>
                    <strong>System Engineer @ Tata Consultancy Services</strong> <br/><span style={{fontSize: '0.9rem', color: '#666'}}>(04/2021 to Current)</span><br/>
                    Utilised CKAN for effective data management, developed Django & Flask interfaces, implemented Docker for containerised deployment, and integrated Solr for optimised full-text search. Automated data processing with Python batch scripts and used PySpark for data validation. Developed and maintained responsive Vue.js web interfaces.
                  </li>
                  <li style={{ marginBottom: '1.5rem' }}>
                    <strong>Full Stack Developer @ Atemon</strong> <br/><span style={{fontSize: '0.9rem', color: '#666'}}>(05/2020 to 01/2021)</span><br/>
                    Designed and developed web applications using Python and Django. Implemented PostgreSQL databases and built responsive dynamic UI components using HTML, CSS, and JavaScript.
                  </li>
                </ul>
              </div>
            )}
            {activeRoom === 'skills' && (
              <div>
                <h2>SKILLS</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '1rem' }}>
                  {['Python', 'Vue.js', 'Flask', 'Batch Scripting', 'SQL', 'Docker', 'HTML5', 'Javascript', 'OOP', 'Rest API', 'PostgreSQL', 'CKAN', 'Django', 'GIT', 'CSS', 'PySpark', 'Linux'].map(skill => (
                    <span key={skill} style={{ padding: '8px 12px', border: '2px solid #3d3d3d', borderRadius: '5px', fontFamily: 'Kalam', fontSize: '1.2rem', backgroundColor: '#fff9e6' }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {activeRoom === 'education' && (
              <div style={{ textAlign: 'left' }}>
                <h2>EDUCATION</h2>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                  <li style={{ marginBottom: '1.5rem' }}>
                    <strong style={{ fontSize: '1.3rem' }}>Master Of Computer Application</strong><br/>
                    <span style={{color: '#666', fontSize: '1.1rem'}}>Marian College Autonomous, Kuttikanam (2020)</span>
                  </li>
                  <li style={{ marginBottom: '1.5rem' }}>
                    <strong style={{ fontSize: '1.3rem' }}>Bachelor of Computer Application</strong><br/>
                    <span style={{color: '#666', fontSize: '1.1rem'}}>Holycross College, Puttady (2018)</span>
                  </li>
                </ul>
              </div>
            )}
            {activeRoom === 'work' && (
              <div style={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ marginBottom: '10px' }}>LIVE PROJECTS</h2>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '10px', WebkitOverflowScrolling: 'touch' }}>
                  {websites.map(site => (
                    <button 
                      key={site.name}
                      onClick={() => setActiveSite(site.url)}
                      style={{
                        background: activeSite === site.url ? '#ff4757' : 'transparent',
                        color: activeSite === site.url ? 'white' : '#3d3d3d',
                        border: '2px solid #3d3d3d',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s'
                      }}
                    >
                      {site.name}
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, border: '4px solid #3d3d3d', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff', position: 'relative' }}>
                  <iframe 
                    src={activeSite} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    title="Portfolio Site"
                  />
                </div>
              </div>
            )}
            {activeRoom === 'contact' && (
              <div>
                <h2>GET IN TOUCH</h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Phone: 7560953886</p>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Email: ananthu.nair34@gmail.com</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="https://github.com/HellzAngel" target="_blank" className="hand-drawn-btn">GitHub</a>
                  <a href="https://www.linkedin.com/in/ananthu-a-nair-bb1571175/" target="_blank" className="hand-drawn-btn">LinkedIn</a>
                  <a href="https://hellzangel.github.io/Ananthu_dev/" target="_blank" className="hand-drawn-btn">Website</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" />
      <button className="audio-toggle" onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <div className="noise-overlay" />
    </div>
  )
}

export default App
