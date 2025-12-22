import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { FiUser, FiLogOut } from "react-icons/fi";
import sauron from "../assets/the-sauron.png";
import { isAuthenticated, getUser, logout } from "../utils/auth.js";

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status on mount and location change
  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser());
    } else {
      setUser(null);
    }
  }, [location]);

  const handleNavigation = (item) => {
    // Route-based navigation
    if (item.route) {
      navigate(item.route);
    }
    setNavOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  const navItems = [
    { id: "home", label: "Home", route: "/" },
    // { id: "service", label: "Services", route: "/service" },
    { id: "code", label: "Code", route: "/code" },
    { id: "tech", label: "Tech", route: "/tech" },
    { id: "about", label: "About", route: "/about" }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
      ? "bg-white/5 backdrop-blur-sm border-b border-white/10"
      : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-white/20">
              <img
                className="w-full h-full object-cover"
                src={sauron}
                alt="The Sauron"
              />
            </div>
            <span className="text-white font-medium text-lg">the Sauron</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="text-neutral-400 hover:text-white transition-colors duration-200 text-lg"
              >
                {item.label}
              </button>
            ))}

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 text-white hover:border-cyan-500/50 transition-all duration-300"
                >
                  <FiUser size={16} />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-neutral-300 hover:bg-white/5 hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      <FiUser size={16} />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 flex items-center gap-2"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-neutral-300 transition-colors duration-200"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            {navOpen ? <RiCloseLine size={20} /> : <RiMenu3Line size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/5 overflow-y-auto transition-all duration-300 ${navOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-6 py-4 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="block w-full text-left text-neutral-300 py-3 hover:text-white transition-colors duration-200 text-lg"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-4 mt-4 border-t border-white/10">
              {user ? (
                <>
                  <div className="px-3 py-2 mb-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-500/30">
                    <div className="flex items-center gap-2 text-white">
                      <FiUser size={16} />
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setNavOpen(false);
                    }}
                    className="block w-full text-left text-neutral-300 py-3 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <FiUser size={16} />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setNavOpen(false);
                    }}
                    className="block w-full text-left text-red-400 py-3 hover:text-red-300 transition-colors duration-200 flex items-center gap-2"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate('/auth');
                    setNavOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};