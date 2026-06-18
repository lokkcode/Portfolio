import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'


function App() { 
  return (
    <div className="font-sans pt-20" style={{ backgroundColor: '#0a0a0a', color: '#f1f1f1' }}>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      
    </div>
  )
}

export default App