// src/data/cardData.ts

export interface CardData {
  id: string;
  Name: string;
  icon: string;
  subIcon?: string;
}

export const cardData: CardData[] = [
  {
    id: '1',
    Name: 'Report an Accident',
    icon: 'FaClipboard',
  },
  {
    id: '2',
    Name: 'Insure My Car',
    icon: 'FaHandHolding',
    subIcon: 'FaCar',
  },
  {
    id: '3',
    Name: 'Quick Renew',
    icon: 'FaSyncAlt',
  },
  {
    id: '4',
    Name: 'Road Assistance',
    icon: 'FaTruckPickup',
  },
];
