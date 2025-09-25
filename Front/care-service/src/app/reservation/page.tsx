"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  TruckIcon,
  SparklesIcon,
  BellIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function ReservationPage() {
  const [vehicle, setVehicle] = useState<"citadine" | "berline" | "suv">(
    "citadine"
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    codePostal: "",
    ville: "",
    commentaires: "",
    service: "",
    rappel: false,
  });

  // Tableau des véhicules
  const vehicles = [
    { key: "citadine" as const, img: "/citadine1.png", label: "Citadine" },
    { key: "berline" as const, img: "/berline1.png", label: "Berline" },
    { key: "suv" as const, img: "/suv1.png", label: "SUV & Monospace" },
  ];

  // Fonction pour changer de véhicule
  const handleVehicleChange = (newVehicle: "citadine" | "berline" | "suv") => {
    if (newVehicle === vehicle) return;
    const newIndex = vehicles.findIndex((v) => v.key === newVehicle);
    setCurrentIndex(newIndex);
    setVehicle(newVehicle);
  };

  // Fonction pour navigation avec flèches
  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? vehicles.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setVehicle(vehicles[newIndex].key);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === vehicles.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setVehicle(vehicles[newIndex].key);
  };

  // Fonction pour gérer les changements du formulaire
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setClientInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Générer les créneaux horaires disponibles
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9h
    const endHour = 17; // 17h
    const lunchBreak = { start: 12, end: 14 }; // Pause déjeuner

    for (let hour = startHour; hour < endHour; hour++) {
      // Skip lunch break
      if (hour >= lunchBreak.start && hour < lunchBreak.end) continue;

      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Fonction pour soumettre le formulaire et envoyer la réservation
  const handleSubmitReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Veuillez sélectionner une date et une heure.");
      return;
    }

    // Envoyer directement la réservation
    await handleConfirmReservation();
  };

  // Fonction pour confirmer définitivement la réservation
  const handleConfirmReservation = async () => {
    try {
      // Sauvegarder les données de réservation
      const reservationData = {
        vehicle: vehicle,
        selectedPlan: selectedPlan,
        clientInfo: clientInfo,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        timestamp: new Date().toISOString(),
        totalPrice:
          plans[vehicle]?.find((p) => p.label === selectedPlan)?.price || 0,
      };

      console.log("Envoi de la réservation vers N8n:", reservationData);

      // Envoi vers votre API backend qui transmet à N8n
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      const response = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Réservation envoyée avec succès:", result);

        // Afficher un message de confirmation
        alert(
          `Réservation envoyée avec succès !\n\nVotre réservation pour le ${selectedDate} à ${selectedTime} a été transmise au technicien.\n\nUn technicien vous contactera dans les 2h pour confirmer le créneau.\n\nMerci de votre confiance !`
        );

        // Optionnel: Rediriger vers une page de confirmation
        // window.location.href = '/confirmation';
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de l'envoi de la réservation"
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réservation:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erreur inconnue";
      alert(
        `Erreur lors de l'envoi de la réservation: ${errorMessage}\n\nVeuillez réessayer ou nous contacter directement.`
      );
    }
  };

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
        label: "Lavage Basic",
        price: 25,
        duration: "30 min",
        features: [
          "Lavage extérieur à la main",
          "Nettoyage jantes",
          "Lavage vitres",
          "Brillant pneus basic",
          "Séchage serviette",
        ],
      },
      {
        label: "Nettoyage Premium",
        price: 45,
        duration: "60 min",
        features: [
          "Lavage extérieur complet",
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
        label: "Lavage Basic",
        price: 30,
        duration: "35 min",
        features: [
          "Lavage extérieur à la main",
          "Nettoyage jantes",
          "Lavage vitres",
          "Brillant pneus basic",
          "Séchage serviette",
        ],
      },
      {
        label: "Nettoyage Premium",
        price: 55,
        duration: "75 min",
        features: [
          "Lavage extérieur complet",
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
          "Lavage + cire protectrice",
          "Shampoing sièges/tapis",
          "Rénovation plastiques",
          "Désinfection vapeur",
          "Finition professionnelle",
        ],
      },
    ],
    suv: [
      {
        label: "Lavage Basic",
        price: 35,
        duration: "40 min",
        features: [
          "Lavage extérieur à la main",
          "Nettoyage jantes",
          "Lavage vitres",
          "Brillant pneus basic",
          "Séchage serviette",
        ],
      },
      {
        label: "Nettoyage Premium",
        price: 65,
        duration: "90 min",
        features: [
          "Lavage extérieur complet",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* SVG Filter pour l'animation blob */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">CARE</span>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Accueil
              </Link>
              <Link
                href="/#services"
                className="hover:text-cyan-400 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/#formules"
                className="hover:text-cyan-400 transition-colors"
              >
                Formules
              </Link>
              <Link href="/reservation" className="text-cyan-400 font-semibold">
                Réservation
              </Link>
              <Link
                href="/#contact"
                className="hover:text-cyan-400 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Contact */}
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        <div>
          {/* Titre et Description */}

          {/* ÉTAPE 1: Sélection du type de véhicule */}
          <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {/* En-tête de l'étape */}
              <div className="text-center mb-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full mb-8 shadow-2xl">
                  <span className="text-white font-black text-2xl">1</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                  Choisissez votre type de véhicule :
                </h2>
                <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Sélectionnez le type de véhicule pour voir les tarifs
                  correspondants
                </p>
              </div>

              {/* Sélection des véhicules */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
                {vehicles.map(({ key, img, label }) => (
                  <button
                    key={key}
                    onClick={() => handleVehicleChange(key)}
                    className={`group relative px-10 py-6 rounded-3xl transition-all duration-300 transform hover:scale-105 ${
                      vehicle === key
                        ? "bg-cyan-600 text-white shadow-2xl ring-4 ring-cyan-400"
                        : "bg-transparent text-gray-800 hover:bg-gray-100 border-2 border-gray-300"
                    }`}
                  >
                    <span className="font-black text-xl tracking-wide">
                      {label}
                    </span>
                    {vehicle === key && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-cyan-600 text-sm font-black">
                          ✓
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Carrousel des véhicules */}
              <div className="flex justify-center items-center relative overflow-hidden">
                <div className="relative w-full max-w-4xl h-[500px] overflow-hidden">
                  {/* Masque de flou gauche */}
                  <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                  {/* Masque de flou droit */}
                  <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                  <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {vehicles.map(({ key, img, label }) => (
                      <div
                        key={key}
                        className="w-full h-full flex-shrink-0 flex items-center justify-center"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={img}
                            alt={label}
                            fill
                            className="object-contain transition-all duration-300 transform hover:scale-105"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flèches de navigation */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 transition-all duration-300 shadow-lg hover:scale-110 z-20"
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
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 transition-all duration-300 shadow-lg hover:scale-110 z-20"
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

              {/* Indicateurs de position */}
            </div>

            {/* Chat icon en bas à droite */}
            <div className="fixed bottom-6 right-6 z-20">
              <button className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ÉTAPE 2: Choix de la formule détaillée */}
          <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-20">
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl">
                    2
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
                    Choisissez votre formule
                  </h2>
                </div>
                <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Sélectionnez la formule qui correspond le mieux à vos besoins
                </p>
              </div>

              {/* Cartes détaillées des formules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans[vehicle].map((plan, idx) => (
                  <div
                    key={plan.label}
                    className={`relative bg-white border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                      selectedPlan === plan.label
                        ? "border-green-300 ring-4 ring-green-200 lg:scale-105 shadow-xl"
                        : idx === 1
                        ? "border-cyan-300 ring-4 ring-cyan-200 lg:scale-105 shadow-xl"
                        : "border-gray-200 hover:border-cyan-300 shadow-lg"
                    }`}
                  >
                    {selectedPlan === plan.label && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-cyan-500 rounded-full shadow">
                          ✓ Sélectionné
                        </span>
                      </div>
                    )}
                    {idx === 1 && selectedPlan !== plan.label && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-cyan-500 rounded-full shadow">
                          Le Plus Populaire
                        </span>
                      </div>
                    )}
                    <h3 className="text-3xl font-black text-gray-900 mb-6">
                      {plan.label}
                    </h3>
                    <div className="mb-8">
                      <div className="flex items-baseline space-x-2 mb-4">
                        <span className="text-5xl font-black text-cyan-500">
                          {plan.price}€
                        </span>
                        <span className="text-xl text-gray-500">/ lavage</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-500">
                        <ClockIcon className="w-6 h-6" />
                        <span className="text-lg font-medium">
                          {plan.duration}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
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
                          <span className="text-lg text-gray-700 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setSelectedPlan(plan.label)}
                      className={`blob-btn w-full inline-block text-center ${
                        selectedPlan === plan.label
                          ? "blob-btn--green"
                          : idx === 1
                          ? "blob-btn--blue"
                          : ""
                      }`}
                    >
                      {selectedPlan === plan.label
                        ? "✓ Formule Sélectionnée"
                        : "Choisir cette Formule"}
                      <span className="blob-btn__inner">
                        <span className="blob-btn__blobs">
                          <span className="blob-btn__blob"></span>
                          <span className="blob-btn__blob"></span>
                          <span className="blob-btn__blob"></span>
                          <span className="blob-btn__blob"></span>
                        </span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ÉTAPE 3: Sélection de la date et heure */}
          <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-20">
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl">
                    3
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
                    Choisissez votre créneau
                  </h2>
                </div>
                <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Sélectionnez la date et l'heure qui vous conviennent le mieux
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                  {/* En-tête du calendrier */}
                  <div className="bg-cyan-600 rounded-t-xl p-4 mb-0">
                    <div className="flex items-center justify-between">
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
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
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <h3 className="text-xl font-bold text-white">
                        Septembre 2025
                      </h3>
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Calendrier hebdomadaire */}
                  <div className="grid grid-cols-7 gap-4 p-6 bg-gray-50 rounded-b-xl">
                    {/* Jours de la semaine */}
                    {[
                      { day: 17, name: "MERCREDI", available: true },
                      { day: 18, name: "JEUDI", available: true },
                      { day: 19, name: "VENDREDI", available: true },
                      { day: 20, name: "SAMEDI", available: true },
                      { day: 21, name: "DIMANCHE", available: false },
                      { day: 22, name: "LUNDI", available: true },
                      { day: 23, name: "MARDI", available: true },
                    ].map((dayInfo, index) => (
                      <div key={index} className="text-center">
                        {/* En-tête du jour */}
                        <div
                          className={`mb-4 ${
                            dayInfo.day === 17
                              ? "bg-cyan-600 text-white rounded-full w-12 h-12 mx-auto flex items-center justify-center text-lg font-bold"
                              : "text-gray-700"
                          }`}
                        >
                          <div>
                            <div
                              className={`text-2xl font-bold ${
                                dayInfo.day === 17
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {dayInfo.day}
                            </div>
                            <div
                              className={`text-xs font-medium ${
                                dayInfo.day === 17
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            >
                              {dayInfo.name}
                            </div>
                          </div>
                        </div>

                        {/* Créneaux horaires */}
                        <div className="space-y-2">
                          {!dayInfo.available ? (
                            <div className="text-gray-400 text-lg font-medium py-8">
                              Fermé
                            </div>
                          ) : (
                            timeSlots.map((time) => {
                              // Simuler quelques créneaux indisponibles pour le mardi
                              const isUnavailable =
                                dayInfo.day === 23 &&
                                ["09:00", "10:00", "11:00", "12:00"].includes(
                                  time
                                );

                              return (
                                <button
                                  key={time}
                                  onClick={() => {
                                    if (!isUnavailable) {
                                      setSelectedDate(
                                        `2025-09-${dayInfo.day
                                          .toString()
                                          .padStart(2, "0")}`
                                      );
                                      setSelectedTime(time);
                                    }
                                  }}
                                  disabled={isUnavailable}
                                  className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    selectedDate ===
                                      `2025-09-${dayInfo.day
                                        .toString()
                                        .padStart(2, "0")}` &&
                                    selectedTime === time
                                      ? "bg-cyan-600 text-white shadow-lg"
                                      : isUnavailable
                                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                      : "bg-white text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 border border-gray-200"
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sélection actuelle */}
                  {selectedDate && selectedTime && (
                    <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200 mt-6">
                      <div className="flex items-center justify-center space-x-2 text-cyan-800">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-semibold">
                          Créneau sélectionné :{" "}
                          {new Date(selectedDate).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          à {selectedTime}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Avantages */}

          {/* ÉTAPE 4: Récapitulatif et Réservation */}
          <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-20">
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl">
                    4
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
                    Finalisez votre réservation
                  </h2>
                </div>
                <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Vérifiez vos choix et réservez votre créneau
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Récapitulatif des choix */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <span>Récapitulatif de votre réservation</span>
                    </div>
                  </h3>

                  <div className="space-y-6">
                    {/* Véhicule sélectionné */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-cyan-200">
                      <h4 className="text-xl font-bold text-cyan-900 mb-3 flex items-center space-x-2">
                        <TruckIcon className="w-5 h-5" />
                        <span>Véhicule sélectionné</span>
                      </h4>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                          <Image
                            src={
                              vehicles.find((v) => v.key === vehicle)?.img ||
                              "/citadine1.png"
                            }
                            alt={vehicle}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            {vehicles.find((v) => v.key === vehicle)?.label}
                          </p>
                          <p className="text-sm text-gray-600">
                            Type de véhicule
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Formule sélectionnée */}
                    {selectedPlan && (
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-cyan-200">
                        <h4 className="text-xl font-bold text-cyan-900 mb-3 flex items-center space-x-2">
                          <SparklesIcon className="w-5 h-5" />
                          <span>Formule sélectionnée</span>
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-semibold text-gray-800">
                              {selectedPlan}
                            </p>
                            <p className="text-sm text-gray-600">
                              Formule de lavage
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-cyan-600">
                              {
                                plans[vehicle]?.find(
                                  (p) => p.label === selectedPlan
                                )?.price
                              }
                              €
                            </p>
                            <p className="text-sm text-gray-600">
                              {
                                plans[vehicle]?.find(
                                  (p) => p.label === selectedPlan
                                )?.duration
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informations de réservation */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-cyan-200">
                      <h4 className="text-xl font-bold text-cyan-900 mb-3 flex items-center space-x-2">
                        <CalendarIcon className="w-5 h-5" />
                        <span>Créneau sélectionné</span>
                      </h4>
                      {selectedDate && selectedTime ? (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-cyan-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-cyan-800 font-semibold">
                                {new Date(selectedDate).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                              <p className="text-cyan-600 text-sm">
                                à {selectedTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-cyan-600">
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium">
                              Créneau confirmé
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-cyan-700 mb-4">
                            Sélectionnez votre date et heure dans le formulaire
                            à droite.
                          </p>
                          <div className="flex items-center space-x-2 text-cyan-600">
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
                            <span className="text-sm font-medium">
                              En attente de sélection
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    {selectedPlan && (
                      <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-2xl p-6 border border-blue-900">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-blue-900">
                            Total:
                          </h4>
                          <p className="text-3xl font-black text-cyan-600">
                            {
                              plans[vehicle]?.find(
                                (p) => p.label === selectedPlan
                              )?.price
                            }
                            €
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Prix TTC - Paiement sur place
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Formulaire client */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  {!showCalendly ? (
                    <>
                      {/* En-tête du formulaire */}
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <ClipboardDocumentListIcon className="w-8 h-8 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            Vos informations
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Remplissez vos informations pour finaliser votre
                            réservation.
                          </p>
                        </div>
                      </div>

                      <form
                        onSubmit={handleSubmitReservation}
                        className="space-y-6"
                      >
                        {/* Prénom et Nom */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="prenom"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Prénom *
                            </label>
                            <input
                              type="text"
                              id="prenom"
                              name="prenom"
                              value={clientInfo.prenom}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                              placeholder="Votre prénom"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="nom"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Nom *
                            </label>
                            <input
                              type="text"
                              id="nom"
                              name="nom"
                              value={clientInfo.nom}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                              placeholder="Votre nom"
                            />
                          </div>
                        </div>

                        {/* Email et Téléphone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={clientInfo.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                              placeholder="votre@email.com"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="telephone"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Téléphone *
                            </label>
                            <input
                              type="tel"
                              id="telephone"
                              name="telephone"
                              value={clientInfo.telephone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                              placeholder="06 12 34 56 78"
                            />
                          </div>
                        </div>

                        {/* Adresse */}
                        <div>
                          <label
                            htmlFor="adresse"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Adresse *
                          </label>
                          <input
                            type="text"
                            id="adresse"
                            name="adresse"
                            value={clientInfo.adresse}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                            placeholder="123 Rue de la Paix"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="codePostal"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Code postal *
                            </label>
                            <input
                              type="text"
                              id="codePostal"
                              name="codePostal"
                              value={clientInfo.codePostal}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                              placeholder="75001"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="ville"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Ville *
                            </label>
                            <input
                              type="text"
                              id="ville"
                              name="ville"
                              value={clientInfo.ville}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                              placeholder="Paris"
                            />
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            htmlFor="commentaires"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Message / Instructions spéciales
                          </label>
                          <textarea
                            id="commentaires"
                            name="commentaires"
                            value={clientInfo.commentaires}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900"
                            placeholder="Instructions particulières, accès, etc."
                          />
                        </div>

                        {/* Bouton de réservation */}
                        <button
                          type="submit"
                          disabled={
                            !selectedPlan || !selectedDate || !selectedTime
                          }
                          className={`blob-btn w-full inline-block text-center ${
                            selectedPlan && selectedDate && selectedTime
                              ? "blob-btn--blue"
                              : "opacity-50 cursor-not-allowed"
                          }`}
                        >
                          {selectedPlan && selectedDate && selectedTime
                            ? "Envoyer la réservation"
                            : "Complétez toutes les étapes"}
                          <span className="blob-btn__inner">
                            <span className="blob-btn__blobs">
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                            </span>
                          </span>
                        </button>

                        {/* Disclaimer */}
                        <p className="text-xs text-gray-500 text-center">
                          En cliquant sur "Envoyer la réservation", vous
                          acceptez notre politique de confidentialité. Vos
                          informations seront transmises au technicien pour le
                          service.
                        </p>
                      </form>
                    </>
                  ) : (
                    <>
                      {/* Calendrier simple */}
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
                          <CalendarIcon className="w-6 h-6 text-cyan-600" />
                          <span>Choisissez votre créneau</span>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Sélectionnez la date et l'heure qui vous conviennent.
                        </p>

                        {/* Bouton pour revenir au formulaire */}
                        <button
                          onClick={() => setShowCalendly(false)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                        >
                          ← Modifier mes informations
                        </button>
                      </div>

                      {/* Sélection de date */}
                      <div className="mb-6">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Date souhaitée *</span>
                          </div>
                        </label>
                        <input
                          type="date"
                          id="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                        />
                      </div>

                      {/* Sélection d'heure */}
                      <div className="mb-6">
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>Heure souhaitée *</span>
                          </div>
                        </label>
                        <select
                          id="time"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                        >
                          <option value="">Sélectionnez une heure</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Bouton de confirmation */}
                      <button
                        onClick={handleSubmitReservation}
                        disabled={!selectedDate || !selectedTime}
                        className={`blob-btn w-full inline-block text-center ${
                          selectedDate && selectedTime
                            ? "blob-btn--blue"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {selectedDate && selectedTime
                          ? "Envoyer la réservation"
                          : "Sélectionnez date et heure"}
                        <span className="blob-btn__inner">
                          <span className="blob-btn__blobs">
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                          </span>
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
