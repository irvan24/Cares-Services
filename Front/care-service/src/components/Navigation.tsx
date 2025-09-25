export default function Navigation() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-bold">CARE</span>
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-cyan-400 transition-colors">
              Accueil
            </a>
            <a
              href="/#services"
              className="hover:text-cyan-400 transition-colors"
            >
              Services
            </a>
            <a
              href="/#formules"
              className="hover:text-cyan-400 transition-colors"
            >
              Formules
            </a>
            <a href="/#about" className="hover:text-cyan-400 transition-colors">
              À Propos
            </a>
            <a
              href="/reservation"
              className="hover:text-cyan-400 transition-colors"
            >
              Réservation
            </a>
            <a
              href="/#contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Contact & CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>01 23 45 67 89</span>
            </div>
            <a
              href="/reservation"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Connexion
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
