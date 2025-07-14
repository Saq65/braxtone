
export interface CardData {
    id: string;
    image?: string;
    heading?: string;
    paragraph: string;
}

export const InsuranceData: CardData[] = [
     {
        id: '1',
        image: '/asesst/images/dania-smile.png',
        heading: 'Hi, my name is Dania!',
        paragraph: 'Please Choose Your Service',
    },
    {
        id: '2',
        image: '/asesst/images/dania-smile.png',
        heading: '15 Seconds could save you 15% or more',
        paragraph: 'Choose Your Insurance Coverage',
    }
    
];
