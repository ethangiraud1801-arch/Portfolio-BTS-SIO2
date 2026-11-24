export const profile = {
  name: 'Ethan GIRAUD',
  email: 'ethangiraud1801@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ethangiraud/',
  github: '',
  cv: '', // Exemple : /documents/cv-ethan-giraud.pdf
};

// Ajouter les PDF dans public/documents/, puis indiquer ici /documents/nom-du-fichier.pdf.
export const projects = [

  {
    id: 'projet-2',
    title: 'Centralisation de logs avec ELK Stack',
    summary: 'Centralisation des journaux des équipements réseau au moyen de la pile ELK.',
    skills: ['ELK Stack', 'Journaux réseau'],
    pdf: '',
    isPlaceholder: false,
  },
  
  {
    id: 'projet-1',
    title: 'Point d’accès Wi-Fi public et privé',
    summary: 'Configuration d’un point d’accès Wi-Fi Unify avec deux réseaux, public et privé, et authentification via FreeRADIUS en liaison avec Active Directory.',
    skills: ['Wi-Fi', 'FreeRADIUS', 'Active Directory'],
    pdf: '',
    isPlaceholder: false,
  },
  
  {
    id: 'projet-3',
    title: 'Migration de messagerie vers Office 365',
    summary: 'Migration des e-mails et du domaine d’une TPE depuis OVH vers Office 365, pour 15 adresses e-mail.',
    skills: ['OVH', 'Office 365', 'Migration de messagerie'],
    pdf: '',
    isPlaceholder: false,
  },
  {
    id: 'projet-4',
    title: 'Projet 4 — à venir',
    summary: 'Le sujet et la documentation de ce projet seront ajoutés prochainement.',
    skills: [],
    pdf: '',
    isPlaceholder: true,
  },
  {
    id: 'projet-5',
    title: 'Projet 5 — à venir',
    summary: 'Le sujet et la documentation de ce projet seront ajoutés prochainement.',
    skills: [],
    pdf: '',
    isPlaceholder: true,
  },
  {
    id: 'projet-6',
    title: 'Projet 6 — à venir',
    summary: 'Le sujet et la documentation de ce projet seront ajoutés prochainement.',
    skills: [],
    pdf: '',
    isPlaceholder: true,
  },
];
