"use client";

import { useState } from "react";

interface ToggleSliderProps {
  /** Les deux options à afficher */
  options: [string, string];
  /** Option sélectionnée par défaut (0 ou 1) */
  defaultOption?: 0 | 1;
  /** Callback appelé quand l'option change */
  onChange?: (selectedIndex: number, selectedLabel: string) => void;
  /** Couleur du texte actif (classe Tailwind) */
  activeTextColor?: string;
  /** Couleur du texte inactif (classe Tailwind) */
  inactiveTextColor?: string;
  /** Couleur de fond du container (classe Tailwind) */
  backgroundColor?: string;
  /** Couleur de fond du slider (classe Tailwind) */
  sliderColor?: string;
  /** Taille du padding horizontal des boutons */
  paddingX?: string;
  /** Taille du padding vertical des boutons */
  paddingY?: string;
  /** Taille du texte */
  fontSize?: string;
  /** Classes CSS additionnelles pour le container */
  className?: string;
}

/**
 * Composant ToggleSlider réutilisable
 *
 * @example
 * ```tsx
 * <ToggleSlider
 *   options={["Option 1", "Option 2"]}
 *   defaultOption={0}
 *   onChange={(index, label) => console.log(index, label)}
 *   activeTextColor="text-cyan-600"
 * />
 * ```
 */
export default function ToggleSlider({
  options,
  defaultOption = 0,
  onChange,
  activeTextColor = "text-cyan-600",
  inactiveTextColor = "text-gray-500",
  backgroundColor = "bg-gray-100",
  sliderColor = "bg-white",
  paddingX = "px-6",
  paddingY = "py-3",
  fontSize = "text-sm",
  className = "",
}: ToggleSliderProps) {
  const [selected, setSelected] = useState<0 | 1>(defaultOption);

  const handleSelect = (index: 0 | 1) => {
    setSelected(index);
    onChange?.(index, options[index]);
  };

  return (
    <div
      className={`inline-flex items-center ${backgroundColor} rounded-full p-1 shadow-inner ${className}`}
    >
      {/* Background slider animé */}
      <div
        className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] ${sliderColor} rounded-full shadow-md transition-all duration-300 ease-out`}
        style={{
          left: selected === 0 ? "4px" : "calc(50% + 0px)",
        }}
      />

      {/* Bouton Option 1 */}
      <button
        onClick={() => handleSelect(0)}
        className={`relative z-10 ${paddingX} ${paddingY} ${fontSize} font-semibold rounded-full transition-colors duration-300 ${
          selected === 0
            ? activeTextColor
            : `${inactiveTextColor} hover:text-gray-700`
        }`}
      >
        {options[0]}
      </button>

      {/* Bouton Option 2 */}
      <button
        onClick={() => handleSelect(1)}
        className={`relative z-10 ${paddingX} ${paddingY} ${fontSize} font-semibold rounded-full transition-colors duration-300 ${
          selected === 1
            ? activeTextColor
            : `${inactiveTextColor} hover:text-gray-700`
        }`}
      >
        {options[1]}
      </button>
    </div>
  );
}

/**
 * Version contrôlée du ToggleSlider (pour gérer l'état depuis le parent)
 */
interface ControlledToggleSliderProps
  extends Omit<ToggleSliderProps, "defaultOption" | "onChange"> {
  /** Index de l'option sélectionnée (0 ou 1) */
  selected: 0 | 1;
  /** Callback appelé quand l'option change */
  onSelect: (selectedIndex: 0 | 1, selectedLabel: string) => void;
}

export function ControlledToggleSlider({
  options,
  selected,
  onSelect,
  activeTextColor = "text-cyan-600",
  inactiveTextColor = "text-gray-500",
  backgroundColor = "bg-gray-100",
  sliderColor = "bg-white",
  paddingX = "px-6",
  paddingY = "py-3",
  fontSize = "text-sm",
  className = "",
}: ControlledToggleSliderProps) {
  return (
    <div
      className={`relative inline-flex items-center ${backgroundColor} rounded-full p-1 shadow-inner ${className}`}
    >
      {/* Background slider animé */}
      <div
        className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] ${sliderColor} rounded-full shadow-md transition-all duration-300 ease-out`}
        style={{
          left: selected === 0 ? "4px" : "calc(50% + 0px)",
        }}
      />

      {/* Bouton Option 1 */}
      <button
        onClick={() => onSelect(0, options[0])}
        className={`relative z-10 ${paddingX} ${paddingY} ${fontSize} font-semibold rounded-full transition-colors duration-300 ${
          selected === 0
            ? activeTextColor
            : `${inactiveTextColor} hover:text-gray-700`
        }`}
      >
        {options[0]}
      </button>

      {/* Bouton Option 2 */}
      <button
        onClick={() => onSelect(1, options[1])}
        className={`relative z-10 ${paddingX} ${paddingY} ${fontSize} font-semibold rounded-full transition-colors duration-300 ${
          selected === 1
            ? activeTextColor
            : `${inactiveTextColor} hover:text-gray-700`
        }`}
      >
        {options[1]}
      </button>
    </div>
  );
}
