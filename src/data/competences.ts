import type { IconName } from '../components/types';

export interface CompetenceGroup {
  title: string;
  icon: IconName;
  description: string;
  skills: string[];
}

// Compétences tirées des expériences et projets renseignés par Ethan.
export const competenceGroups: CompetenceGroup[] = [
  {
    title: 'Systèmes & support',
    icon: 'server',
    description: 'Administration et assistance au quotidien.',
    skills: ['Gestion de parc informatique', 'Windows Server', 'Support utilisateurs', 'Gestion de tickets'],
  },
  {
    title: 'Réseaux & accès',
    icon: 'network',
    description: 'Connectivité, authentification et maintenance.',
    skills: ['Maintenance réseau', 'Wi-Fi public et privé', 'FreeRADIUS', 'Active Directory'],
  },
  {
    title: 'Journalisation',
    icon: 'radar',
    description: 'Collecte de journaux des équipements réseau.',
    skills: ['ELK Stack', 'Centralisation des logs réseau'],
  },
  {
    title: 'Services & hébergement',
    icon: 'folder',
    description: 'Messagerie et services utilisés dans mes projets et missions.',
    skills: ['Migration vers Office 365', 'OVH', 'Gestion de site internet'],
  },
];
