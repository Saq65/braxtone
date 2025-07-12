
export interface CardData {
  id: string;
  Name: string;
  icon: string;
  image?: string;
  subIcon?: string;
}

export const cardData: CardData[] = [
  {
    id: '1',
    Name: 'Report an Accident',
    icon: 'FaClipboard',
    image: '/asesst/images/car1.png',
  },
  {
    id: '2',
    Name: 'Insure My Car',
    icon: 'FaHandHolding',
    subIcon: 'FaCar',
    image: '/asesst/images/car2.png',
  },
  {
    id: '3',
    Name: 'Quick Renew',
    icon: 'FaSyncAlt',
    image: '/asesst/images/car3.png',
  },
  {
    id: '4',
    Name: 'Road Assistance',
    icon: 'FaTruckPickup',
    image: '/asesst/images/car4.png',
  },
];
