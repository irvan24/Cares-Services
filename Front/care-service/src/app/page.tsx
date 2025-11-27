"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  PhoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  const [vehicle, setVehicle] = useState<"citadine" | "berline" | "suv">(
    "citadine"
  );
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [vehicleIndex, setVehicleIndex] = useState(0);
  const vehicleScrollRef = useRef<HTMLDivElement>(null);
  const [valueIndex, setValueIndex] = useState(0);
  const valueScrollRef = useRef<HTMLDivElement>(null);
  const [servicesIndex, setServicesIndex] = useState(0);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const [formulaIndex, setFormulaIndex] = useState(0);
  const formulaScrollRef = useRef<HTMLDivElement>(null);

  // États pour le carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Données des images du carousel
  const carouselImages = [
    {
      src: "/carsoap.jpg",
      alt: "Service de lavage auto professionnel",
      badge: {
        title: "Service Premium",
        subtitle: "Produits écologiques",
      },
    },
    {
      src: "/IMG_4453.JPG",
      alt: "Nettoyage extérieur avec mousse",
      badge: {
        title: "Nettoyage Extérieur",
        subtitle: "Nettoyage en profondeur",
      },
    },
    {
      src: "/IMG_4460.JPG",
      alt: "Nettoyage intérieur professionnel",
      badge: {
        title: "Nettoyage Intérieur",
        subtitle: "Habitacle impeccable",
      },
    },
  ];

  // Hook pour l'Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-card-index") || "0"
            );
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.3, // Se déclenche quand 30% de la carte est visible
        rootMargin: "0px 0px -50px 0px", // Délai avant déclenchement
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Réinitialiser l'index des formules quand le véhicule change
  useEffect(() => {
    setFormulaIndex(0);
  }, [vehicle]);

  // Auto-play du carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 4000); // Change d'image toutes les 4 secondes

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);
  const plans: Record<
    string,
    {
      label: string;
      price: number;
      duration: string;
      features: string[];
    }[]
  > = {
    citadine: [
      {
        label: "Nettoyage Basic",
        price: 25,
        duration: "30 min",
        features: [
          "Nettoyage extérieur à la main",
          "Nettoyage jantes",
          "Nettoyage vitres",
          "Brillant pneus basic",
          "Séchage serviette",
        ],
      },
      {
        label: "Nettoyage Premium",
        price: 45,
        duration: "60 min",
        features: [
          "Nettoyage extérieur complet",
          "Aspiration habitacle",
          "Dépoussiérage tableau de bord",
          "Nettoyage vitres intérieur/extérieur",
          "Brillant pneus premium",
        ],
      },
      {
        label: "Détailing Complet",
        price: 85,
        duration: "120 min",
        features: [
          "Lavage + cire protectrice",
          "Shampoing sièges/tapis",
          "Rénovation plastiques",
          "Désinfection vapeur",
          "Finition professionnelle",
        ],
      },
    ],
    berline: [
      {
        label: "Nettoyage Basic",
        price: 30,
        duration: "35 min",
        features: [
          "Nettoyage extérieur à la main",
          "Nettoyage jantes",
          "Nettoyage vitres",
          "Brillant pneus basic",
          "Séchage serviette",
        ],
      },
      {
        label: "Nettoyage Premium",
        price: 55,
        duration: "75 min",
        features: [
          "Nettoyage extérieur complet",
          "Aspiration habitacle",
          "Dépoussiérage tableau de bord",
          "Nettoyage vitres intérieur/extérieur",
          "Brillant pneus premium",
        ],
      },
      {
        label: "Détailing Complet",
        price: 99,
        duration: "140 min",
        features: [
          "Nettoyage + cire protectrice",
          "Shampoing sièges/tapis",
          "Rénovation plastiques",
          "Désinfection vapeur",
          "Finition professionnelle",
        ],
      },
    ],
    suv: [
      {
        label: "Nettoyage Basic",
        price: 35,
        duration: "40 min",
        features: [
          "Nettoyage extérieur à la main",
          "Nettoyage jantes",
          "Nettoyage vitres",
          "Brillant pneus basic",
          "Séchage serviette",
        ],
      },
      {
        label: "Nettoyage Premium",
        price: 65,
        duration: "90 min",
        features: [
          "Nettoyage extérieur complet",
          "Aspiration habitacle",
          "Dépoussiérage tableau de bord",
          "Nettoyage vitres intérieur/extérieur",
          "Brillant pneus premium",
        ],
      },
      {
        label: "Détailing Complet",
        price: 120,
        duration: "160 min",
        features: [
          "Lavage + cire protectrice",
          "Shampoing sièges/tapis",
          "Rénovation plastiques",
          "Désinfection vapeur",
          "Finition professionnelle",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen py-16 lg:py-20">
        {/* Mobile Layout - Structure Apple */}
        <div className="lg:hidden flex flex-col items-center justify-center min-h-screen space-y-12">
          {/* Text Content - Centered */}
          <div className="flex flex-col items-center text-center space-y-8 max-w-md">
            <h1 className="text-5xl font-bold leading-none">
              <span className="text-gray-800">Lavage Auto</span>
              <br />
              <span className="text-cyan-500">Professionnel</span>
              <br />
              <span className="text-emerald-400">À Domicile</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Service rapide qui vient chez vous. Votre voiture impeccable sans
              quitter votre domicile.
            </p>

            {/* CTA Buttons - Centered */}
            <div className="flex flex-col gap-4 w-full max-w-sm pt-4">
              <Link
                href="/reservation"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 px-8 rounded-full transition-colors text-lg text-center"
              >
                Réserver
              </Link>
              <Link
                href="#services"
                className="w-full border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold py-4 px-8 rounded-full transition-colors text-lg text-center"
              >
                En savoir plus
              </Link>
            </div>
          </div>

          {/* Image - Full Width Below */}
          <div className="w-full aspect-[4/5] relative mt-8">
            <Image
              src={carouselImages[0].src}
              alt={carouselImages[0].alt}
              fill
              className="object-cover rounded-3xl"
              priority
            />
          </div>
        </div>

        {/* Desktop Layout - Original */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-12 [&>*:last-child]:mb-0">
            {/* Main Heading */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold leading-none">
                <span className="text-gray-800">Lavage Auto</span>
                <br />
                <span className="text-cyan-500">Professionnel</span>
                <br />
                <span className="text-emerald-400">À Domicile</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Service rapide, professionnel et pratique de lavage automobile
                qui vient chez vous ou au bureau. Gardez votre voiture
                impeccable sans quitter votre allée.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="w-6 h-6 text-cyan-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  Réservation en 2 minutes
                </span>
              </div>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-6 h-6 text-cyan-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  Nous venons chez vous
                </span>
              </div>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <StarIcon className="w-6 h-6 text-cyan-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  Service 5 étoiles
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start items-center lg:items-start">
              <Link
                href="/reservation"
                className="blob-btn blob-btn--blue inline-flex items-center justify-center border-2 border-cyan-500 px-8 py-4 text-lg w-4/5"
              >
                <span className="flex items-center justify-center">
                  <span>Réserver un Lavage</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </span>
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </Link>

              <Link
                href="#services"
                className="blob-btn inline-flex items-center justify-center w-4/5"
              >
                Voir nos Services
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </Link>
            </div>

            {/* Statistics Section - Left side with separator line */}
            <div className="pt-12 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-500 mb-1">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">
                    Clients Satisfaits
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-500 mb-1">
                    4.9
                  </div>
                  <div className="text-sm text-gray-600">Note Moyenne</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-500 mb-1">
                    7j/7
                  </div>
                  <div className="text-sm text-gray-600">
                    Service Disponible
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Carousel */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Carousel Container */}
              <div className="w-full h-[400px] lg:h-[600px] xl:h-[700px] relative">
                {/* Images du carousel */}
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}

                {/* Badge dynamique */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg transition-all duration-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {carouselImages[currentImageIndex].badge.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {carouselImages[currentImageIndex].badge.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Indicateurs de navigation */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 1000);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>

                {/* Boutons de navigation */}
                <button
                  onClick={() => {
                    setCurrentImageIndex(
                      currentImageIndex === 0
                        ? carouselImages.length - 1
                        : currentImageIndex - 1
                    );
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 1000);
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setCurrentImageIndex(
                      currentImageIndex === carouselImages.length - 1
                        ? 0
                        : currentImageIndex + 1
                    );
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 1000);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Section Nos Services */}
      <section id="services" className="py-20 bg-gray-50 lg:bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre et Description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Services professionnels de lavage automobile conçus pour maintenir
              votre véhicule au meilleur de sa forme, avec des produits
              écologiques et des techniques éprouvées.
            </p>
          </div>

          {/* Cartes de Services - Carousel horizontal sur mobile, grid sur desktop */}
          <div className="relative">
            {/* Mobile: Carousel horizontal style Apple */}
            <div
              ref={servicesScrollRef}
              className="lg:hidden overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                marginLeft: "-1rem",
                marginRight: "-1rem",
              }}
            >
              <div
                className="flex gap-6 pl-6 pr-4"
                style={{ width: "max-content" }}
              >
                {/* Carte 1: Lavage Extérieur */}
                <div
                  ref={(el) => {
                    cardRefs.current[0] = el;
                  }}
                  data-card-index="0"
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group h-164 flex-shrink-0 ${
                    visibleCards.has(0) ? "animate-card-reveal" : ""
                  }`}
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                    scrollMarginLeft: "1.5rem",
                  }}
                >
                  <div className="relative">
                    {/* Vraie image du service */}
                    <div className="w-full h-164 relative">
                      <Image
                        src="/IMG_4453.JPG"
                        alt="Nettoyage extérieur - nettoyage pneu avec mousse"
                        fill
                        className="object-cover"
                        priority
                      />

                      {/* Icône de service en overlay */}
                      <div className="absolute top-3 right-3 w-12 h-12 bg-cyan-200 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-6 h-6 text-cyan-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Partie blanche qui monte automatiquement sur mobile, hover sur desktop */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl transition-all duration-700 h-80 ${
                      visibleCards.has(0) ? "lg:h-80" : "lg:h-24"
                    } overflow-hidden lg:group-hover:h-80`}
                  >
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Nettoyage Extérieur
                      </h3>
                      <p className="text-gray-700 mb-4 text-[16px]"></p>

                      {/* Contenu détaillé qui apparaît automatiquement sur mobile, hover sur desktop */}
                      <div
                        className={`transition-opacity duration-500 delay-300 flex-1 opacity-100 ${
                          visibleCards.has(0)
                            ? "lg:opacity-100"
                            : "lg:opacity-0"
                        } lg:group-hover:opacity-100`}
                      >
                        {/*
                        <p className="text-gray-700 mb-4 text-[16px]">
                          Nettoyage extérieur complet avec savon premium et
                          protection.
                        </p>
                        */}

                        <ul className="space-y-2">
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Lavage à la main avec savon premium
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Nettoyage jantes et pneus
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Lavage des vitres
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Application de cire protectrice
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Produits 100% français
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carte 2: Nettoyage Intérieur */}
                <div
                  ref={(el) => {
                    cardRefs.current[1] = el;
                  }}
                  data-card-index="1"
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group h-164 flex-shrink-0 ${
                    visibleCards.has(1) ? "animate-card-reveal" : ""
                  }`}
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                    scrollMarginLeft: "1.5rem",
                  }}
                >
                  <div className="relative">
                    {/* Vraie image du service */}
                    <div className="w-full h-164 relative">
                      <Image
                        src="/IMG_4460.JPG"
                        alt="Nettoyage intérieur - aspiration et nettoyage"
                        fill
                        className="object-cover"
                        priority
                      />

                      {/* Icône de service en overlay */}
                      <div className="absolute top-3 right-3 w-12 h-12 bg-cyan-200 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-6 h-6 text-cyan-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Partie blanche qui monte automatiquement sur mobile, hover sur desktop */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl transition-all duration-700 h-80 ${
                      visibleCards.has(1) ? "lg:h-80" : "lg:h-24"
                    } overflow-hidden lg:group-hover:h-80`}
                  >
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Nettoyage Intérieur
                      </h3>

                      {/* Contenu détaillé qui apparaît automatiquement sur mobile, hover sur desktop */}
                      <div
                        className={`transition-opacity duration-500 delay-300 flex-1 opacity-100 ${
                          visibleCards.has(1)
                            ? "lg:opacity-100"
                            : "lg:opacity-0"
                        } lg:group-hover:opacity-100`}
                      >
                        <p className="text-gray-700 mb-4 text-[16px]"></p>

                        <ul className="space-y-2">
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Aspiration sièges et tapis
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Nettoyage tableau de bord
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Traitement du cuir
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Parfum d'ambiance
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Produits 100% français
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carte 3: Détailing Complet */}
                <div
                  ref={(el) => {
                    cardRefs.current[2] = el;
                  }}
                  data-card-index="2"
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group h-164 flex-shrink-0 ${
                    visibleCards.has(2) ? "animate-card-reveal" : ""
                  }`}
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                    scrollMarginLeft: "1.5rem",
                  }}
                >
                  <div className="relative">
                    {/* Vraie image du service */}
                    <div className="w-full h-164 relative">
                      <Image
                        src="/IMG_4453.JPG"
                        alt="Détailing complet - nettoyage professionnel"
                        fill
                        className="object-cover"
                        priority
                      />

                      {/* Icône de service en overlay */}
                      <div className="absolute top-3 right-3 w-12 h-12 bg-cyan-200 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-6 h-6 text-cyan-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Partie blanche qui monte automatiquement sur mobile, hover sur desktop */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl transition-all duration-700 h-80 ${
                      visibleCards.has(2) ? "lg:h-80" : "lg:h-24"
                    } overflow-hidden lg:group-hover:h-80`}
                  >
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Détailing Complet
                      </h3>

                      {/* Contenu détaillé qui apparaît automatiquement sur mobile, hover sur desktop */}
                      <div
                        className={`transition-opacity duration-500 delay-300 flex-1 opacity-100 ${
                          visibleCards.has(2)
                            ? "lg:opacity-100"
                            : "lg:opacity-0"
                        } lg:group-hover:opacity-100`}
                      >
                        <p className="text-gray-700 mb-4 text-[16px]"></p>

                        <ul className="space-y-2">
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Tout extérieur + intérieur
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Revêtement protection peinture
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Rénovation phares
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Nettoyage moteur
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-[16px]">
                              Produits 100% français
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boutons de navigation mobile pour les services */}
              <button
                onClick={() => {
                  const newIndex = servicesIndex === 0 ? 2 : servicesIndex - 1;
                  setServicesIndex(newIndex);
                  if (servicesScrollRef.current) {
                    const scrollContainer = servicesScrollRef.current;
                    const flexContainer = scrollContainer.querySelector(
                      "div"
                    ) as HTMLElement;
                    if (flexContainer) {
                      const cardElement = flexContainer.children[
                        newIndex
                      ] as HTMLElement;
                      if (cardElement) {
                        cardElement.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "center",
                        });
                      }
                    }
                  }
                }}
                className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-10"
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.7)";
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  const newIndex = servicesIndex === 2 ? 0 : servicesIndex + 1;
                  setServicesIndex(newIndex);
                  if (servicesScrollRef.current) {
                    const scrollContainer = servicesScrollRef.current;
                    const flexContainer = scrollContainer.querySelector(
                      "div"
                    ) as HTMLElement;
                    if (flexContainer) {
                      const cardElement = flexContainer.children[
                        newIndex
                      ] as HTMLElement;
                      if (cardElement) {
                        cardElement.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "center",
                        });
                      }
                    }
                  }
                }}
                className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-10"
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.7)";
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {/* Carte 1: Lavage Extérieur - Desktop */}
              <div
                ref={(el) => {
                  cardRefs.current[0] = el;
                }}
                data-card-index="0"
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group h-164 ${
                  visibleCards.has(0) ? "animate-card-reveal" : ""
                }`}
              >
                <div className="relative">
                  {/* Vraie image du service */}
                  <div className="w-full h-164 relative">
                    <Image
                      src="/IMG_4453.JPG"
                      alt="Nettoyage extérieur - nettoyage pneu avec mousse"
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Icône de service en overlay */}
                    <div className="absolute top-3 right-3 w-12 h-12 bg-cyan-200 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-cyan-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Partie blanche qui monte automatiquement sur mobile, hover sur desktop */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl transition-all duration-700 ${
                    visibleCards.has(0) ? "h-80" : "h-24"
                  } overflow-hidden group-hover:h-80`}
                >
                  <div className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Nettoyage Extérieur
                    </h3>
                    <p className="text-gray-700 mb-4 text-[16px]"></p>

                    {/* Contenu détaillé qui apparaît automatiquement sur mobile, hover sur desktop */}
                    <div
                      className={`transition-opacity duration-500 delay-300 flex-1 ${
                        visibleCards.has(0) ? "opacity-100" : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      {/*
                      <p className="text-gray-700 mb-4 text-[16px]">
                        Nettoyage extérieur complet avec savon premium et
                        protection.
                      </p>
                      */}

                      <ul className="space-y-2">
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Lavage à la main avec savon premium
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Nettoyage jantes et pneus
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Lavage des vitres
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Application de cire protectrice
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Produits 100% français
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte 2: Nettoyage Intérieur - Desktop */}
              <div
                ref={(el) => {
                  cardRefs.current[1] = el;
                }}
                data-card-index="1"
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group h-164 ${
                  visibleCards.has(1) ? "animate-card-reveal" : ""
                }`}
              >
                <div className="relative">
                  {/* Vraie image du service */}
                  <div className="w-full h-164 relative">
                    <Image
                      src="/IMG_4460.JPG"
                      alt="Nettoyage intérieur - aspiration et nettoyage"
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Icône de service en overlay */}
                    <div className="absolute top-3 right-3 w-12 h-12 bg-cyan-200 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-cyan-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Partie blanche qui monte automatiquement sur mobile, hover sur desktop */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl transition-all duration-700 ${
                    visibleCards.has(1) ? "h-80" : "h-24"
                  } overflow-hidden group-hover:h-80`}
                >
                  <div className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Nettoyage Intérieur
                    </h3>

                    {/* Contenu détaillé qui apparaît automatiquement sur mobile, hover sur desktop */}
                    <div
                      className={`transition-opacity duration-500 delay-300 flex-1 ${
                        visibleCards.has(1) ? "opacity-100" : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      <p className="text-gray-700 mb-4 text-[16px]"></p>

                      <ul className="space-y-2">
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Aspiration sièges et tapis
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Nettoyage tableau de bord
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Traitement du cuir
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Parfum d'ambiance
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Produits 100% français
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte 3: Détailing Complet - Desktop */}
              <div
                ref={(el) => {
                  cardRefs.current[2] = el;
                }}
                data-card-index="2"
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group h-164 ${
                  visibleCards.has(2) ? "animate-card-reveal" : ""
                }`}
              >
                <div className="relative">
                  {/* Vraie image du service */}
                  <div className="w-full h-164 relative">
                    <Image
                      src="/IMG_4453.JPG"
                      alt="Détailing complet - nettoyage professionnel"
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Icône de service en overlay */}
                    <div className="absolute top-3 right-3 w-12 h-12 bg-cyan-200 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-cyan-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Partie blanche qui monte automatiquement sur mobile, hover sur desktop */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl transition-all duration-700 ${
                    visibleCards.has(2) ? "h-80" : "h-24"
                  } overflow-hidden group-hover:h-80`}
                >
                  <div className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Détailing Complet
                    </h3>

                    {/* Contenu détaillé qui apparaît automatiquement sur mobile, hover sur desktop */}
                    <div
                      className={`transition-opacity duration-500 delay-300 flex-1 ${
                        visibleCards.has(2) ? "opacity-100" : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      <p className="text-gray-700 mb-4 text-[16px]"></p>

                      <ul className="space-y-2">
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Tout extérieur + intérieur
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Revêtement protection peinture
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Rénovation phares
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Nettoyage moteur
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-[16px]">
                            Produits 100% français
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Choisissez Votre Formule */}
      <section id="formules" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre et Description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choisissez Votre Formule
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tarifs transparents sans frais cachés. Tous les services incluent
              le déplacement.
            </p>
          </div>

          {/* Sélecteur de type de véhicule */}
          <div className="mb-12">
            {/* Carousel horizontal avec navigation */}
            <div className="relative mb-20">
              <div
                ref={vehicleScrollRef}
                className="overflow-x-auto scrollbar-hide pb-4 lg:overflow-visible"
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="flex gap-6 px-4 w-max lg:w-full lg:max-w-5xl lg:mx-auto lg:justify-center lg:px-0">
                  {(
                    [
                      {
                        key: "citadine",
                        img: "/citadine1.png",
                        label: "Citadine",
                      },
                      {
                        key: "berline",
                        img: "/berline1.png",
                        label: "Berline",
                      },
                      { key: "suv", img: "/suv1.png", label: "SUV" },
                    ] as const
                  ).map(({ key, img, label }, index) => (
                    <button
                      key={key}
                      onClick={() => {
                        setVehicle(key);
                        setVehicleIndex(index);
                      }}
                      className={`group relative flex flex-col items-center gap-4 border rounded-2xl px-8 py-8 md:px-12 md:py-10 bg-white transition-all shadow-sm hover:shadow-md flex-shrink-0 w-[calc(100vw-4rem)] max-w-[380px] lg:w-[320px] lg:max-w-none ${
                        vehicle === key
                          ? "border-cyan-500 ring-2 ring-cyan-200 bg-cyan-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{
                        scrollSnapAlign: "start",
                        scrollMarginLeft: "1rem",
                      }}
                    >
                      <div className="relative w-56 h-28 md:w-80 md:h-40">
                        <Image
                          src={img}
                          alt={label}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span
                        className={`font-semibold text-base md:text-lg ${
                          vehicle === key ? "text-cyan-700" : "text-gray-800"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Boutons de navigation */}
              <button
                onClick={() => {
                  const newIndex = vehicleIndex === 0 ? 2 : vehicleIndex - 1;
                  setVehicleIndex(newIndex);
                  const vehicles = ["citadine", "berline", "suv"] as const;
                  setVehicle(vehicles[newIndex]);

                  // Scroll vers le véhicule précédent
                  if (vehicleScrollRef.current) {
                    const scrollContainer = vehicleScrollRef.current;
                    const flexContainer = scrollContainer.querySelector(
                      "div"
                    ) as HTMLElement;
                    if (flexContainer) {
                      const cardElement = flexContainer.children[
                        newIndex
                      ] as HTMLElement;
                      if (cardElement) {
                        cardElement.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "start",
                        });
                      }
                    }
                  }
                }}
                className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-10"
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.7)";
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  const newIndex = vehicleIndex === 2 ? 0 : vehicleIndex + 1;
                  setVehicleIndex(newIndex);
                  const vehicles = ["citadine", "berline", "suv"] as const;
                  setVehicle(vehicles[newIndex]);

                  // Scroll vers le véhicule suivant
                  if (vehicleScrollRef.current) {
                    const scrollContainer = vehicleScrollRef.current;
                    const flexContainer = scrollContainer.querySelector(
                      "div"
                    ) as HTMLElement;
                    if (flexContainer) {
                      const cardElement = flexContainer.children[
                        newIndex
                      ] as HTMLElement;
                      if (cardElement) {
                        cardElement.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "start",
                        });
                      }
                    }
                  }
                }}
                className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-10"
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.7)";
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Cartes dynamiques avec animation - Carousel horizontal sur mobile, grid sur desktop */}
            <div className="relative">
              {/* Mobile: Carousel horizontal style Apple */}
              <div
                ref={formulaScrollRef}
                className="lg:hidden overflow-x-auto scrollbar-hide pb-4 pt-4"
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  marginLeft: "-1rem",
                  marginRight: "-1rem",
                }}
              >
                <div
                  key={vehicle}
                  className="flex gap-6 pl-6 pr-4 transition-opacity duration-300 ease-out animate-[fadeIn_.3s_ease-out]"
                  style={{
                    width: "max-content",
                    animationName: "fadeIn",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out",
                  }}
                >
                  {plans[vehicle].map((plan, idx) => (
                    <div
                      key={plan.label}
                      className={`relative bg-white border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex-shrink-0 ${
                        idx === 1
                          ? "border-cyan-300 ring-1 ring-cyan-200 pt-12"
                          : "border-gray-200"
                      }`}
                      style={{
                        width: "calc(100vw - 4rem)",
                        maxWidth: "400px",
                        scrollSnapAlign: "start",
                        scrollMarginLeft: "1.5rem",
                      }}
                    >
                      {idx === 1 && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                          <span className="px-3 py-1 text-xs font-semibold text-white bg-cyan-500 rounded-full shadow">
                            Le Plus Populaire
                          </span>
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {plan.label}
                      </h3>
                      <div className="mb-6">
                        <div className="flex items-baseline space-x-1 mb-2">
                          <span className="text-4xl font-bold text-cyan-500">
                            {plan.price}€
                          </span>
                          <span className="text-gray-500">/ lavage</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm">{plan.duration}</span>
                        </div>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/reservation"
                        className="blob-btn w-full inline-block text-center"
                      >
                        Choisir cette Formule
                        <span className="blob-btn__inner">
                          <span className="blob-btn__blobs">
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                          </span>
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boutons de navigation mobile pour les formules */}
              <button
                onClick={() => {
                  const newIndex = formulaIndex === 0 ? 2 : formulaIndex - 1;
                  setFormulaIndex(newIndex);
                  if (formulaScrollRef.current) {
                    const scrollContainer = formulaScrollRef.current;
                    const flexContainer = scrollContainer.querySelector(
                      "div"
                    ) as HTMLElement;
                    if (flexContainer) {
                      const cardElement = flexContainer.children[
                        newIndex
                      ] as HTMLElement;
                      if (cardElement) {
                        cardElement.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "center",
                        });
                      }
                    }
                  }
                }}
                className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-10"
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.7)";
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  const newIndex = formulaIndex === 2 ? 0 : formulaIndex + 1;
                  setFormulaIndex(newIndex);
                  if (formulaScrollRef.current) {
                    const scrollContainer = formulaScrollRef.current;
                    const flexContainer = scrollContainer.querySelector(
                      "div"
                    ) as HTMLElement;
                    if (flexContainer) {
                      const cardElement = flexContainer.children[
                        newIndex
                      ] as HTMLElement;
                      if (cardElement) {
                        cardElement.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "center",
                        });
                      }
                    }
                  }
                }}
                className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-10"
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.7)";
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Desktop: Grid layout */}
              <div
                key={vehicle}
                className="hidden lg:grid lg:grid-cols-3 gap-8 transition-opacity duration-300 ease-out animate-[fadeIn_.3s_ease-out]"
                style={{
                  animationName: "fadeIn",
                  animationDuration: "300ms",
                  animationTimingFunction: "ease-out",
                }}
              >
                {plans[vehicle].map((plan, idx) => (
                  <div
                    key={plan.label}
                    className={`relative bg-white border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 ${
                      idx === 1
                        ? "border-cyan-300 ring-1 ring-cyan-200 lg:scale-105 pt-12"
                        : "border-gray-200"
                    }`}
                  >
                    {idx === 1 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-cyan-500 rounded-full shadow">
                          Le Plus Populaire
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {plan.label}
                    </h3>
                    <div className="mb-6">
                      <div className="flex items-baseline space-x-1 mb-2">
                        <span className="text-4xl font-bold text-cyan-500">
                          {plan.price}€
                        </span>
                        <span className="text-gray-500">/ lavage</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm">{plan.duration}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/reservation"
                      className="blob-btn w-full inline-block text-center"
                    >
                      Choisir cette Formule
                      <span className="blob-btn__inner">
                        <span className="blob-btn__blobs">
                          <span className="blob-btn__blob"></span>
                          <span className="blob-btn__blob"></span>
                          <span className="blob-btn__blob"></span>
                          <span className="blob-btn__blob"></span>
                        </span>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Propositions de Valeur */}
          <div className="relative">
            {/* Mobile: Carousel horizontal avec navigation */}
            <div
              ref={valueScrollRef}
              className="lg:hidden overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div
                className="flex gap-6 px-4"
                style={{
                  width: "max-content",
                }}
              >
                {/* À Votre Domicile */}
                <div
                  className="text-center flex-shrink-0"
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                    scrollMarginLeft: "1rem",
                  }}
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    À Votre Domicile
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nous venons chez vous ou au bureau
                  </p>
                </div>

                {/* Service Rapide */}
                <div
                  className="text-center flex-shrink-0"
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Service Rapide
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nettoyage rapide et efficace
                  </p>
                </div>

                {/* Éco-Responsable */}
                <div
                  className="text-center flex-shrink-0"
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Éco-responsable
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Produits biodégradables uniquement
                  </p>
                </div>

                {/* Tous Véhicules */}
                <div
                  className="text-center flex-shrink-0"
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Tous Véhicules
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Voitures, SUV, camions & motos
                  </p>
                </div>
              </div>
            </div>

            {/* Boutons de navigation mobile */}
            <button
              onClick={() => {
                const newIndex = valueIndex === 0 ? 3 : valueIndex - 1;
                setValueIndex(newIndex);
                if (valueScrollRef.current) {
                  const scrollContainer = valueScrollRef.current;
                  const flexContainer = scrollContainer.querySelector(
                    "div"
                  ) as HTMLElement;
                  if (flexContainer) {
                    const cardElement = flexContainer.children[
                      newIndex
                    ] as HTMLElement;
                    if (cardElement) {
                      cardElement.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "start",
                      });
                    }
                  }
                }
              }}
              className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-10"
              style={{
                marginTop: "0.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.7)";
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                const newIndex = valueIndex === 3 ? 0 : valueIndex + 1;
                setValueIndex(newIndex);
                if (valueScrollRef.current) {
                  const scrollContainer = valueScrollRef.current;
                  const flexContainer = scrollContainer.querySelector(
                    "div"
                  ) as HTMLElement;
                  if (flexContainer) {
                    const cardElement = flexContainer.children[
                      newIndex
                    ] as HTMLElement;
                    if (cardElement) {
                      cardElement.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "start",
                      });
                    }
                  }
                }
              }}
              className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-10"
              style={{
                marginTop: "0.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.7)";
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Desktop: Grid layout */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-8">
              {/* À Votre Domicile */}
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  À Votre Domicile
                </h3>
                <p className="text-gray-600 text-sm">
                  Nous venons chez vous ou au bureau
                </p>
              </div>

              {/* Service Rapide */}
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Service Rapide
                </h3>
                <p className="text-gray-600 text-sm">
                  Nettoyage rapide et efficace
                </p>
              </div>

              {/* Éco-Responsable */}
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Éco-responsable
                </h3>
                <p className="text-gray-600 text-sm">
                  Produits biodégradables uniquement
                </p>
              </div>

              {/* Tous Véhicules */}
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Tous Véhicules
                </h3>
                <p className="text-gray-600 text-sm">
                  Voitures, SUV, camions & motos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section id="about" className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre et Description Centrés */}
          <div className="text-left mb-8 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center justify-center gap-3">
              À Propos de nous
            </h2>
            <p className="text-base lg:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Nous sommes passionnés par le fait de garder votre voiture
              impeccable tout en vous facilitant la vie. Fondés sur les
              principes de qualité, de commodité et de satisfaction client.
            </p>
          </div>

          {/* Notre Histoire */}
          <div className="mb-8 lg:mb-16">
            {/* Mobile: Texte puis image */}
            <div className="lg:hidden space-y-4 mb-8">
              <h3 className="text-xl font-bold text-gray-900">
                Notre Histoire
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Care est né d'une idée simple: le lavage de voiture doit être
                pratique, professionnel et respectueux de l'environnement.
                Aujourd'hui, nous apportons un lavage de qualité professionnelle
                directement à votre porte.
              </p>
            </div>

            {/* Desktop: Grid layout avec texte et image côte à côte */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Colonne texte */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Notre Histoire
                </h3>
                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                  <p>
                    Care est né d'une idée simple: le lavage de voiture doit
                    être pratique, professionnel et respectueux de
                    l'environnement. En tant que propriétaires de voitures
                    occupés nous-mêmes, nous comprenions la frustration de
                    trouver du temps pour l'entretien approprié de la voiture.
                  </p>

                  <p>
                    En 2021, nous avons commencé avec une camionnette et une
                    vision de révolutionner les soins automobiles. Aujourd'hui,
                    nous sommes fiers de servir des centaines de clients
                    satisfaits dans toute la ville, en apportant un lavage de
                    voiture de qualité professionnelle directement à leur porte.
                  </p>

                  <p>
                    Notre engagement va au-delà du simple lavage de voitures.
                    Nous construisons des relations, économisons le temps de nos
                    clients et contribuons à un environnement plus propre grâce
                    à nos pratiques écologiques.
                  </p>
                </div>
              </div>

              {/* Colonne image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden">
                  <div className="relative w-full h-96">
                    <Image
                      src="/IMG_4453.JPG"
                      alt="Care Service - équipe en action"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image mobile en pleine largeur */}
            <div className="lg:hidden relative w-full">
              <div className="rounded-2xl overflow-hidden">
                <div className="relative w-full h-64">
                  <Image
                    src="/IMG_4453.JPG"
                    alt="Care Service - équipe en action"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Valeurs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre et Description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident tout ce que nous faisons
            </p>
          </div>

          {/* Cartes des Valeurs - Carousel horizontal sur mobile, grid sur desktop */}
          <div className="relative mb-20">
            {/* Mobile: Carousel horizontal style Apple */}
            <div
              className="lg:hidden overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                marginLeft: "-1rem",
                marginRight: "-1rem",
              }}
            >
              <div
                className="flex gap-6 pl-6 pr-4"
                style={{ width: "max-content" }}
              >
                {/* Carte 1: Client d'abord */}
                <div
                  className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                    scrollMarginLeft: "1.5rem",
                  }}
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                    Client d'abord
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Nous mettons nos clients au cœur de tout ce que nous
                    faisons, en nous assurant que chaque interaction dépasse les
                    attentes.
                  </p>
                </div>

                {/* Carte 2: Excellence Qualité */}
                <div
                  className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                    Excellence Qualité
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Nous utilisons uniquement des produits premium et des
                    techniques éprouvées pour des résultats constamment
                    supérieurs.
                  </p>
                </div>

                {/* Carte 3: Éco-responsable */}
                <div
                  className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                    Éco-responsable
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Notre engagement envers l'environnement nous pousse à
                    utiliser des produits de nettoyage biodégradables et
                    écologiques.
                  </p>
                </div>

                {/* Carte 4: Commodité */}
                <div
                  className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                  style={{
                    width: "calc(100vw - 4rem)",
                    maxWidth: "400px",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                    Commodité
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Nous venons chez vous, vous faisant gagner du temps et
                    rendant l'entretien de votre voiture simple et pratique.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-8">
              {/* Carte 1: Client d'abord - Desktop */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                  Client d'abord
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Nous mettons nos clients au cœur de tout ce que nous faisons,
                  en nous assurant que chaque interaction dépasse les attentes.
                </p>
              </div>

              {/* Carte 2: Excellence Qualité - Desktop */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                  Excellence Qualité
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Nous utilisons uniquement des produits premium et des
                  techniques éprouvées pour des résultats constamment
                  supérieurs.
                </p>
              </div>

              {/* Carte 3: Éco-responsable - Desktop */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                  Éco-responsable
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Notre engagement envers l'environnement nous pousse à utiliser
                  des produits de nettoyage biodégradables et écologiques.
                </p>
              </div>

              {/* Carte 4: Commodité - Desktop */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                  Commodité
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Nous venons chez vous, vous faisant gagner du temps et rendant
                  l'entretien de votre voiture simple et pratique.
                </p>
              </div>
            </div>
          </div>

          {/* Section Statistiques */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Statistique 1 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-500 mb-2">500+</div>
              <div className="text-gray-700 font-medium">
                Clients Satisfaits
              </div>
            </div>

            {/* Statistique 2 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-500 mb-2">
                2,000+
              </div>
              <div className="text-gray-700 font-medium">Voitures Lavées</div>
            </div>

            {/* Statistique 3 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-500 mb-2">4.9</div>
              <div className="text-gray-700 font-medium">Note Moyenne</div>
            </div>

            {/* Statistique 4 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-500 mb-2">3</div>
              <div className="text-gray-700 font-medium">
                Années d'Expérience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignage Client */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Carte de Témoignage */}
            <div className="bg-cyan-50 rounded-2xl p-8 shadow-lg">
              {/* Note 5 étoiles */}
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              {/* Titre */}
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Approuvé par des Centaines de Clients
              </h3>

              {/* Témoignage */}
              <blockquote className="text-lg text-gray-700 text-center leading-relaxed mb-6">
                "Care a transformé la façon dont j'entretiens ma voiture.
                Professionnel, pratique et dépassant toujours mes attentes. Je
                ne ferais confiance à personne d'autre pour mon véhicule."
              </blockquote>

              {/* Auteur */}
              <div className="text-center">
                <div className="font-bold text-gray-900 text-lg">
                  Jennifer Thompson
                </div>
                <div className="text-gray-600">Cliente depuis 2022</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contactez-nous */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre et Description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des questions sur nos services ? Besoin d'un devis personnalisé ?
              Envie de programmer un lavage ? Nous sommes là pour vous aider et
              aimerions avoir de vos nouvelles.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 ">
            {/* Colonne Gauche - Formulaire */}
            <div className="border border-grey-400 rounded-lg px-8 pt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Envoyez-nous un message
                  </h3>
                  <p className="text-gray-600">
                    Remplissez le formulaire ci-dessous et nous vous répondrons
                    dès que possible.
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3  bg-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Nécessaire
                  </label>
                  <select className="w-full px-4 py-3  bg-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black">
                    <option>Sélectionnez un service</option>
                    <option>Nettoyage Extérieur</option>
                    <option>Nettoyage Intérieur</option>
                    <option>Détailing Complet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Parlez-nous de vos besoins, de l'emplacement de service préféré, ou de toute question que vous avez..."
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="callback"
                    className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <label
                    htmlFor="callback"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Demander un rappel dans les 2 prochaines heures
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Envoyer le Message</span>
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  En soumettant ce formulaire, vous acceptez notre politique de
                  confidentialité. Nous ne partagerons jamais vos informations
                  avec des tiers.
                </p>
              </form>
            </div>

            {/* Colonne Droite - Informations de Contact */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Informations de Contact
                </h3>
                <p className="text-gray-600">
                  Prêt à réserver ou avez des questions ? Voici les meilleurs
                  moyens de nous joindre.
                </p>
              </div>

              <div className="space-y-8">
                {/* Appelez-nous */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-cyan-600"
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
                  </div>
                  <div>
                    <div className="text-cyan-600 font-medium">
                      +33 7 56 87 28 98
                    </div>
                    <div className="text-gray-600">
                      Disponible 7 jours sur 7
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-cyan-600 font-medium">
                      hello@carecarwash.com
                    </div>
                    <div className="text-gray-600">
                      Nous répondons sous 2 heures
                    </div>
                  </div>
                </div>

                {/* Zone de Service */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-900 font-medium">
                      Centre-ville & Banlieues
                    </div>
                    <div className="text-gray-600">
                      Couverture dans un rayon de 15 miles
                    </div>
                  </div>
                </div>

                {/* Horaires de Service */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-cyan-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Horaires de Service
                    </h4>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Lundi - Vendredi :</span>
                      <span className="text-gray-900 font-medium">
                        7h00 - 19h00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Samedi :</span>
                      <span className="text-gray-900 font-medium">
                        8h00 - 18h00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Dimanche :</span>
                      <span className="text-gray-900 font-medium">
                        9h00 - 17h00
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-2 text-cyan-600 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Réservation le jour même disponible jusqu'à 11h</span>
                  </div>
                </div>

                {/* Service Immédiat */}
                <div className="bg-cyan-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Besoin d'un Service Immédiat ?
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Pour les demandes urgentes ou le jour même, appelez-nous
                    directement pour une réponse plus rapide.
                  </p>
                  <a
                    href="tel:(123) 456-7890"
                    className="inline-flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
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
                    <span>Appeler : +33 7 56 87 28 98</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
