# 🌌 Dylan Ilg – Personal Portfolio Website

An interactive 3D portfolio built with **React, Vite, and Three.js (via @react-three/fiber)**.  
This project showcases my skills, projects, and contact information in a unique space-themed environment with smooth scene rotation and animations.

## 🚀 Features

- **3D Interactive Scene**  
  - Rotating planet with orbiting ships (X-Wing, TIE Fighter, Millennium Falcon).  
  - Responsive to scroll/drag for an immersive feel.  

- **Sections**  
  - 🏠 **Home** – Hero banner introducing me.  
  - 👤 **About** – My story and tech stack with icons.  
  - 💻 **Projects** – Cards highlighting GitHub repos and work.  
  - 📬 **Contact** – Links to email, LinkedIn, and Instagram with copy-to-clipboard email support.  

- **UI & Styling**  
  - TailwindCSS for fast, modern styling.  
  - Framer Motion animations for smooth transitions.  
  - Glassmorphism & neo-brutalism styles for a unique look.  

- **Performance**  
  - Vite for blazing-fast dev/build.  
  - Suspense fallback loader for models.  
  - Modularized React components with context-based scene rotation management.  

---

## 🛠 Tech Stack

**Frontend:** React, React Router, Vite, TailwindCSS, Framer Motion  
**3D & Animation:** Three.js (@react-three/fiber, @react-three/drei), React Spring  
**Icons:** React Icons  
**Tooling:** ESLint, Prettier, PostCSS, Git/GitHub  

---

## 📦 Installation & Setup

Clone the repo:

```bash
git clone https://github.com/dylan-ilg/your-repo-name.git
cd your-repo-name
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Build for production:

bash
Copy code
npm run build
Preview production build:

bash
Copy code
npm run preview
📂 Project Structure
php
Copy code
├── public/              # Static assets (images, models)
├── src/
│   ├── Components/      # UI components (Navbar, HeroBanner, Loader, etc.)
│   ├── Pages/           # About, Projects, Contact, Home
│   ├── helpers/         # Scene rotation context & helpers
│   ├── models/          # 3D models (glTF)
│   ├── App.jsx          # Root component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind + global styles
├── index.html           # Entry HTML
├── tailwind.config.js   # Tailwind config
├── vite.config.js       # Vite config
├── package.json         # Dependencies & scripts
└── README.md
👨‍💻 About Me
I’m Dylan Ilg, a Computer Science student at UNC Charlotte (Software Engineering concentration, graduating Aug 2025).
I enjoy building creative, scalable applications across full-stack web development, Android apps, and interactive 3D interfaces.

📍 Based in Charlotte, NC (Open to Remote)

💼 LinkedIn

💻 GitHub

📜 License
This project is open-sourced under the MIT License.
Feel free to fork and customize for your own portfolio!
