
export interface CardData {
  id: string;
  Name: string;
  icon: string;
  image: string;
  subIcon?: string;
}

export const cardData: CardData[] = [
  {
    id: '1',
    Name: 'Report an Accident',
    icon: 'FaClipboard',
    image: '/asesst/images/car4.png',
  },
  {
    id: '2',
    Name: 'Insure My Car',
    icon: 'FaHandHolding',
    subIcon: 'FaCar',
    image: '/asesst/images/car1.png',
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
    image: '/asesst/images/car2.png',

  },

];

export const cardData2: CardData[] = [
  {
    id: '1',
    Name: 'Autofill with OCR',
    icon: 'FaClipboard',
    image: '/asesst/images/l1.png',
  },
  {
    id: '2',
    Name: 'Manually enter my data',
    icon: 'FaHandHolding',
    subIcon: 'FaCar',
    image: '/asesst/images/l2.png',
  }
];
