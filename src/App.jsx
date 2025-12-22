import React, { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './component/Header'
import Hero from './component/Hero'
import { Services } from './component/Service'
import { Footer } from './component/Footer'
import About from './component/About'
import { Code } from './component/Code'
import { TopicDetail } from './component/TopicDetail'
import { DSATable } from './component/DSATable'
import { Second } from './component/Second'
import { TechShowcase } from './component/TechShowcase'
import { FeaturedContent } from './component/FeaturedContent'
import { ScrollToTop } from './component/ScrollToTop'
import { Tech } from './component/Tech'
import { TechDetail } from './component/TechDetail'
import { ProductDetail } from './component/ProductDetail'
import { AllProducts } from './component/AllProducts'
import { Auth } from './component/Auth'
import { Profile } from './component/Profile'
import { AdminDashboard } from './component/AdminDashboard'
import { AdminDSA } from './component/AdminDSA'
import { AdminTechProducts } from './component/AdminTechProducts'
import { startTokenRefreshInterval, isAuthenticated } from './utils/auth'

const App = () => {
  const appRef = useRef(null);

  useEffect(() => {
    // Start automatic token refresh if user is authenticated
    if (isAuthenticated()) {
      startTokenRefreshInterval();
    }

    // Remove all parallax-related code and just keep basic scroll handling if needed
    const handleScroll = () => {
      // You can add any scroll-based logic here if needed
      // For example, adding/removing classes based on scroll position
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={appRef} className="relative overflow-hidden">
      {/* Clean background without parallax elements */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        {/* Subtle background elements without movement */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/5 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/5 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="fixed inset-0 -z-40 pointer-events-none 
        bg-gradient-to-b from-neutral-900/30 via-transparent to-black/40"></div>

      {/* Header is always visible */}
      <Header />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <TechShowcase />
            <FeaturedContent />
            <Footer />
          </>
        } />
        <Route path="/service" element={
          <>
            <Services />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <About />
            <Footer />
          </>
        } />
        <Route path="/code" element={
          <>
            <Code />
            <Footer />
          </>
        } />
        <Route path="/code/:id" element={
          <>
            <TopicDetail />
            <Footer />
          </>
        } />
        <Route path="/code/dsa/:level" element={
          <>
            <DSATable />
            <Footer />
          </>
        } />
        <Route path="/tech" element={
          <>
            <Tech />
            <Footer />
          </>
        } />
        <Route path="/tech/all-products" element={
          <>
            <AllProducts />
            <Footer />
          </>
        } />
        <Route path="/tech/:category" element={
          <>
            <TechDetail />
            <Footer />
          </>
        } />
        <Route path="/tech/:category/:productId" element={
          <>
            <ProductDetail />
            <Footer />
          </>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dsa" element={<AdminDSA />} />
        <Route path="/admin/tech-products" element={<AdminTechProducts />} />
      </Routes>
    </div>
  )
}

export default App