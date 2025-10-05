"use client";
import Link from "next/link";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Première section - Logo et navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo et informations de contact */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                
                <span className="text-2xl font-bold text-white">CARE</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Service professionnel de lavage automobile qui vient à vous.
              Rapide, pratique et écologique, nous prenons soin de votre
              véhicule à domicile.
            </p>

            {/* Informations de contact */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300">+33 6 75 32 98 76</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300">yohannbeeharry262@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300">Service en Île-de-France</span>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3">
              
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
             
            </div>
          </div>

          {/* Navigation - Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/reservation"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Lavage Basic
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Nettoyage Premium
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Détailing Complet
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Abonnements
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation - Entreprise */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Entreprise
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Notre Équipe
                </Link>
              </li>
              <li>
                <Link
                  href="/zones"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Zones de Service
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation - Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/reservation"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Réserver en ligne
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Centre d'aide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Deuxième section - Horaires, zones et réservation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Horaires de service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Horaires de service
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Lun-Ven: 7h00 - 19h00</li>
              <li>Samedi: 8h00 - 18h00</li>
              <li>Dimanche: 9h00 - 17h00</li>
            </ul>
          </div>

          {/* Zones de service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Zones de service
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Paris et petite couronne</li>
              <li>Banlieue Nord</li>
              <li>Banlieue Sud</li>
              <li>Dans un rayon de 25 km</li>
            </ul>
          </div>

          {/* Réservation rapide */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Réservation rapide
            </h3>
            <p className="text-gray-300 mb-4">
              Besoin d'un lavage aujourd'hui ? Appelez-nous pour vérifier les
              disponibilités.
            </p>
            <Link
              href="/reservation"
              className="inline-flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
              <span>Réservation rapide</span>
            </Link>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mb-6"></div>

        {/* Section finale - Copyright et liens légaux */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2025 Care - Service de Lavage Automobile. Tous droits réservés.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/terms"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Conditions d'utilisation
            </Link>
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/cancellation"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Politique d'annulation
            </Link>
          </div>
        </div>
      </div>

      {/* Bouton d'aide flottant */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center shadow-lg transition-colors">
          <QuestionMarkCircleIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </footer>
  );
}
