export interface Formation {
  title: string;
  period: string;
  school?: string;
  note?: string;
}

export const formations: Formation[] = [
  {
    title: 'BTS SIO · option SISR',
    period: '2025 — 2027',
    school: 'Faculté des métiers de l’Essonne',
    note: 'Formation en cours',
  },
  {
    title: 'Bachelor Marketing international',
    period: '2024',
    school: 'ESSCA',
    note: 'En alternance',
  },
  {
    title: 'BTS NDRC',
    period: '2021 — 2023',
    school: 'Faculté des métiers de l’Essonne',
    note: 'En alternance',
  },
  {
    title: 'Baccalauréat scientifique',
    period: '2020',
  },
];
