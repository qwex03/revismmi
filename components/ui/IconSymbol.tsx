import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Import du type SymbolViewProps de expo-symbols
import { SymbolViewProps } from 'expo-symbols';

// Définition du mapping entre les symboles SF et Material Icons
const MAPPING: Partial<Record<SymbolViewProps['name'], React.ComponentProps<typeof MaterialIcons>['name']>> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'book': 'book',
  'person.fill': 'person',
  'plus.circle.fill': 'add-circle',
  'person.3.fill': 'group',
};

export type IconSymbolName = keyof typeof MAPPING;

/**
 * Un composant d'icône qui utilise les SFSymbols natifs sur iOS, et les MaterialIcons sur Android et le web.
 * Cela garantit un aspect cohérent à travers les plateformes et optimise l'utilisation des ressources.
 *
 * Les `name` d'icônes sont basés sur SFSymbols et nécessitent un mappage manuel vers MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
