"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/admin");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Section gauche - Formulaire de connexion */}
      <div className="flex-1 bg-black flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 p-2">
              <Image
                src="/care.png"
                alt="CARE Services"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-gray-400 text-lg">
              Connectez-vous à votre espace administrateur
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse email"
                required
                className="w-full px-4 py-4 bg-transparent border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
                className="w-full px-4 py-4 bg-transparent border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Connexion..." : "Continue"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm leading-relaxed">
              En continuant, vous acceptez les{" "}
              <span className="underline cursor-pointer hover:text-white transition-colors">
                Conditions d'utilisation
              </span>{" "}
              et la{" "}
              <span className="underline cursor-pointer hover:text-white transition-colors">
                Politique de confidentialité
              </span>{" "}
              de Care Service.
            </p>
          </div>
        </div>
      </div>

      {/* Section droite - Image */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 z-10">
          <Image
            src="/carsoap.jpg"
            alt="Service de lavage auto professionnel"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Éléments décoratifs flottants */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-2xl backdrop-blur-sm transform rotate-12 z-20" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/20 rounded-xl backdrop-blur-sm transform -rotate-12 z-20" />
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-white/5 rounded-3xl backdrop-blur-sm transform rotate-6 z-20" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-emerald-400/15 rounded-2xl backdrop-blur-sm transform -rotate-6 z-20" />

        {/* Texte superposé */}
        <div className="absolute bottom-20 left-20 z-30">
          <h2 className="text-white text-2xl font-bold mb-2">
            Administration Care Service
          </h2>
          <p className="text-white/80 text-lg">
            Gérez votre plateforme de lavage auto
          </p>
        </div>
      </div>
    </div>
  );
}
