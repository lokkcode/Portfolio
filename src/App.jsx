import BackToTop from './components/Backtotop'
import Navbar from './components/Navbar'  
import Hero from './components/Hero'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}

export default App