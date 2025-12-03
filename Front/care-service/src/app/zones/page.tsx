"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { MapPinIcon } from "@heroicons/react/24/solid";

const cities = [
  "Annet-sur-Marne",
  "Arnouville",
  "Aulnay-sous-Bois",
  "Bailly-Romainvilliers",
  "Boissy-Saint-Léger",
  "Bonneuil-sur-Marne",
  "Bouleurs",
  "Boutigny",
  "Brie-Comte-Robert",
  "Brou-sur-Chantereine",
  "Bry-sur-Marne",
  "Bussy-Saint-Georges",
  "Bussy-Saint-Martin",
  "Carnetin",
  "Chalifert",
  "Champigny-sur-Marne",
  "Chanteloup-en-Brie",
  "Chauconin-Neufmontiers",
  "Chaumes-en-Brie",
  "Chelles",
  "Chennevières-sur-Marne",
  "Chessy",
  "Claye-Souilly",
  "Clichy-sous-Bois",
  "Collégien",
  "Compans",
  "Conches-sur-Gondoire",
  "Coupvray",
  "Courquetaine",
  "Courtry",
  "Crécy-la-Chapelle",
  "Croissy-Beaubourg",
  "Dampmart",
  "Drancy",
  "Dugny",
  "Émerainville",
  "Esbly",
  "Favières",
  "Ferrières-en-Brie",
  "Fontenay-sous-Bois",
  "Fontenay-Trésigny",
  "Fublaines",
  "Gagny",
  "Gonesse",
  "Gournay-sur-Marne",
  "Gressy",
  "Gretz-Armainvilliers",
  "Guermantes",
  "Isles-lès-Villenoy",
  "Joinville-le-Pont",
  "Jossigny",
  "La Haute-Maison",
  "La Queue-en-Brie",
  "Lagny-sur-Marne",
  "Le Blanc-Mesnil",
  "Le Bourget",
  "Le Perreux-sur-Marne",
  "Le Pin",
  "Le Plessis-Trévise",
  "Lesches",
  "Lésigny",
  "Livry-Gargan",
  "Magny-le-Hongre",
  "Maisons-Alfort",
  "Mareuil-lès-Meaux",
  "Marne-la-Vallée",
  "Meaux",
  "Melun",
  "Mitry-Mory",
  "Montévrain",
  "Montfermeil",
  "Montry",
  "Mortcerf",
  "Nanteuil-lès-Meaux",
  "Neufmoutiers-en-Brie",
  "Neuilly-Plaisance",
  "Neuilly-sur-Marne",
  "Nogent-sur-Marne",
  "Noisiel",
  "Noisy-le-Grand",
  "Ormesson-sur-Marne",
  "Ozoir-la-Ferrière",
  "Penchard",
  "Poincy",
  "Pomponne",
  "Pontault-Combault",
  "Pontcarré",
  "Presles-en-Brie",
  "Provins",
  "Quincy-Voisins",
  "Roissy-en-Brie",
  "Rozay-en-Brie",
  "Saint-Fiacre",
  "Saint-Germain-sur-Morin",
  "Saint-Mandé",
  "Saint-Maur-des-Fossés",
  "Saint-Thibault-des-Vignes",
  "Sancy",
  "Sarcelles",
  "Serris",
  "Sevran",
  "Soignolles-en-Brie",
  "Sucy-en-Brie",
  "Thorigny-sur-Marne",
  "Torcy",
  "Tournan-en-Brie",
  "Trilbardou",
  "Trilport",
  "Vaires-sur-Marne",
  "Varreddes",
  "Vaucourtois",
  "Villeneuve-le-Comte",
  "Villeneuve-Saint-Denis",
  "Villenoy",
  "Villeparisis",
  "Villepinte",
  "Villiers-le-Bel",
  "Villiers-sur-Morin",
  "Voinsles",
];

export default function ZonesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-full mb-6">
            <MapPinIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Zones de Service
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nous intervenons dans toute l&apos;Île-de-France, principalement en
            Seine-et-Marne (77). Découvrez nos zones d&apos;intervention.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1rWQx-_9qQ7z5Q7Q7Q7Q7Q7Q7Q7Q7Q7Q&ehbc=2E312F"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Cities List Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight">
              Retrouvez nous aussi ici !
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Cliquez sur une ville pour voir son emplacement
            </p>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cities.map((city) => (
              <a
                key={city}
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  city + ", France"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg hover:bg-cyan-50 transition-all duration-300 border border-gray-100 hover:border-cyan-200"
              >
                <MapPinIcon className="w-5 h-5 text-cyan-500 group-hover:text-cyan-600 flex-shrink-0" />
                <span className="text-gray-700 group-hover:text-cyan-700 font-medium underline-offset-2 group-hover:underline">
                  {city}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Votre ville n&apos;est pas dans la liste ?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Contactez-nous pour vérifier si nous intervenons dans votre secteur.
            Nous élargissons constamment nos zones de service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservation"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-cyan-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Réserver maintenant
            </a>
            <a
              href="tel:+33756872898"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              📞 +33 7 56 87 28 98
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

