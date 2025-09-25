import Link from "next/link";

export default function Navigation() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-bold">CARE</span>
              <div className="w-3 h-3 bg-cyan-400 rounded-full" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Accueil
            </Link>
            <Link href="/#services" className="hover:text-cyan-400 transition-colors">
              Services
            </Link>
            <Link href="/#formules" className="hover:text-cyan-400 transition-colors">
              Formules
            </Link>
            <Link href="/#about" className="hover:text-cyan-400 transition-colors">
              À Propos
            </Link>
            <Link href="/reservation" className="hover:text-cyan-400 transition-colors">
              Réservation
            </Link>
            <Link href="/#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Contact & CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {/* lien tel = <a> car externe */}
              <a href="tel:0123456789" className="hover:text-cyan-400 transition-colors">
                01 23 45 67 89
              </a>
            </div>

            <Link
              href="/reservation"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}