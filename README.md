# 🎨 Ananthu — Immersive 3D Portfolio

An interactive, scroll-driven 3D portfolio built with **React Three Fiber** and **Three.js**, inspired by [itomdev.com](https://itomdev.com/). Walk through an infinite hand-drawn corridor, push open a swinging entrance door, and explore six interactive rooms — all inside your browser.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Infinite Scroll Corridor** | Seamlessly looping 3D hallway — scroll forever without hitting a dead end |
| **Swinging Entrance Door** | The front door physically swings open as you scroll towards it |
| **6 Interactive Doors** | Click any door to fly the camera inside and view content |
| **Mouse Parallax** | Move your mouse to look around the corridor in real-time |
| **Live Website Gallery** | An embedded webview showcasing 6 live deployed projects |
| **Hand-Drawn Aesthetic** | Custom sketch textures for walls, floor, and doors |
| **Smooth GSAP Animations** | Cinematic camera fly-through transitions powered by GreenSock |
| **Fog Depth** | Atmospheric fog that reveals content as you approach |
| **Loading Screen** | Animated pencil-sketch loading screen with progress bar |
| **Responsive Design** | Fully responsive overlays and touch-friendly on mobile |

---

## 🚪 The Doors

| Door | Wall | Content |
|---|---|---|
| **About Me** | Left | Professional summary, education & certifications |
| **Skills** | Right | Visual skill badges — Python, Django, Vue.js, Docker & more |
| **Education** | Left | MCA from Marian College, BCA from Holycross College |
| **Experience** | Right | Work history at TCS and Atemon with role details |
| **Website** | Left | Live iframe gallery of 6 deployed web projects |
| **Get In Touch** | Right | Phone, email, GitHub, LinkedIn & portfolio links |

---

## 🛠️ Tech Stack

- **React 18** — Component architecture & state management
- **Three.js** — 3D rendering engine
- **React Three Fiber** — React renderer for Three.js
- **Drei** — Useful R3F helpers (ScrollControls, Text, useTexture)
- **GSAP** — Smooth camera animations & transitions
- **Vite** — Lightning-fast dev server & bundler
- **Lucide React** — Icon library

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/HellzAngel/ananthua.git
cd ananthua

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
ananthu/
├── public/
│   ├── wall.png          # Hand-drawn wall texture
│   ├── wood_floor.png    # Sketched wood plank floor texture
│   ├── floor.png         # Alternative floor texture
│   └── door.png          # Hand-drawn door texture
├── src/
│   ├── components/
│   │   ├── Corridor.jsx      # 3D corridor geometry, doors & textures
│   │   ├── Scene.jsx         # Camera path, scroll logic & mouse parallax
│   │   ├── LoadingScreen.jsx # Animated loading screen
│   │   └── PaperOverlay.jsx  # Paper texture overlay effect
│   ├── App.jsx           # Main app — room content, audio, UI layers
│   ├── index.css         # Global styles & responsive design
│   └── main.jsx          # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🌐 Live Projects Showcased

- [Sapthamantra](https://hellzangel.github.io/sapthamantra/)
- [MusiFy](https://hellzangel.github.io/MusiFy/)
- [MovieSeer](https://hellzangel.github.io/MovieSeer/)
- [Ananthu Web](https://hellzangel.github.io/ananthu-web/)
- [Vithu](https://vithu-eosin.vercel.app/)
- [Chayakada](https://chayakada-jet.vercel.app/)

---

## 👤 About the Developer

**Ananthu A Nair** — Innovative developer with 4.6+ years of experience in Python, Django, Flask, Vue.js, CKAN & PySpark. System Engineer at Tata Consultancy Services. RedHat Certified System Administrator.

- 📧 ananthu.nair34@gmail.com
- 📱 7560953886
- 🐙 [GitHub](https://github.com/HellzAngel)
- 💼 [LinkedIn](https://www.linkedin.com/in/ananthu-a-nair-bb1571175/)
- 🌐 [Portfolio](https://hellzangel.github.io/Ananthu_dev/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
