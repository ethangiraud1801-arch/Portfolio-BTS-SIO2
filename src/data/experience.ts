import technoclicToolsData from './technoclic-tools.json';

export interface Tool {
  name: string;
  logo?: string; // Exemple : /logos/ninjaone.svg
}

export interface Experience {
  organisation: string;
  location?: string;
  role?: string;
  period: string;
  description?: string;
  missions: string[];
  tools?: Tool[];
}

export const technoclicTools: Tool[] = technoclicToolsData;

export const experiences: Experience[] = [
  {
    organisation: 'Technoclic',
    period: 'Août 2025 — aujourd’hui',
    missions: [
      'Gestion du parc informatique',
      'Interventions de maintenance réseau',
      'Support et gestion des tickets',
      'Gestion d’un parc de serveurs Windows',
    ],
    tools: technoclicTools,
  },
  {
    organisation: 'ProTravaux',
    period: 'Juin 2022 — août 2024',
    missions: [
      'Vente de menuiseries en B2B',
      'Création et gestion d’un site internet',
      'Marketing digital',
    ],
  },
  {
    organisation: 'Showrooms3D',
    period: 'Octobre 2021 — juin 2022',
    missions: [
      'Vente de formations à la modélisation 3D sur Blender destinées aux architectes',
    ],
  },
];

