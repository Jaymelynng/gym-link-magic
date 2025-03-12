
export interface GymLocation {
  id: string;
  name: string;
  logo: string;
  description: string;
  links: {
    trial?: string;
    booking?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
  };
}

export const gyms: GymLocation[] = [
  {
    id: "oasis",
    name: "Oasis Gymnastics",
    logo: "/lovable-uploads/eb62c5bf-e16a-4938-8107-8a49aeaf4c47.png",
    description: "Connect with us and stay updated on classes, events, and more!",
    links: {
      trial: "https://forms.office.com/r/113hiFhnx6",
      booking: "https://portal.iclasspro.com/oasisgymnastics",
      website: "https://oasisgym.com/",
      facebook: "https://www.facebook.com/oasisgym",
      instagram: "https://www.instagram.com/oasis.gym/"
    }
  },
  {
    id: "capital-cedar-park",
    name: "Capital Gymnastics - Cedar Park",
    logo: "/lovable-uploads/916f75a6-af36-4fe3-9cb9-9c5eb0cc4972.png",
    description: "Developing champions in life through the sport of gymnastics!",
    links: {
      trial: "https://forms.office.com/r/capital-trial",
      booking: "https://portal.iclasspro.com/capitalgymnastics",
      website: "https://capitalgymnastics.com/",
      facebook: "https://www.facebook.com/capitalgymnastics",
      instagram: "https://www.instagram.com/capital.gymnastics/"
    }
  },
  {
    id: "capital-pflugerville",
    name: "Capital Gymnastics - Pflugerville",
    logo: "/lovable-uploads/916f75a6-af36-4fe3-9cb9-9c5eb0cc4972.png",
    description: "Join our Pflugerville location for top-quality gymnastics training!",
    links: {
      trial: "https://forms.office.com/r/capital-pflugerville-trial",
      booking: "https://portal.iclasspro.com/capitalpflugerville",
      website: "https://capitalgymnastics.com/pflugerville/",
      facebook: "https://www.facebook.com/capitalpflugerville",
      instagram: "https://www.instagram.com/capital.pflugerville/"
    }
  },
  {
    id: "capital-round-rock",
    name: "Capital Gymnastics - Round Rock",
    logo: "/lovable-uploads/916f75a6-af36-4fe3-9cb9-9c5eb0cc4972.png",
    description: "Experience excellence in gymnastics at our Round Rock facility!",
    links: {
      trial: "https://forms.office.com/r/capital-roundrock-trial",
      booking: "https://portal.iclasspro.com/capitalroundrock",
      website: "https://capitalgymnastics.com/roundrock/",
      facebook: "https://www.facebook.com/capitalroundrock",
      instagram: "https://www.instagram.com/capital.roundrock/"
    }
  },
  {
    id: "rowland-ballard-atascocita",
    name: "Rowland Ballard - Atascocita",
    logo: "/lovable-uploads/918ce073-a02a-41ef-a571-5d76cd092986.png",
    description: "Building strong athletes and confident kids at our Atascocita location!",
    links: {
      trial: "https://forms.office.com/r/rb-atascocita-trial",
      booking: "https://portal.iclasspro.com/rbatascocita",
      website: "https://www.rbgym.com/atascocita/",
      facebook: "https://www.facebook.com/rbatascocita",
      instagram: "https://www.instagram.com/rb.atascocita/"
    }
  },
  {
    id: "rowland-ballard-kingwood",
    name: "Rowland Ballard - Kingwood",
    logo: "/lovable-uploads/918ce073-a02a-41ef-a571-5d76cd092986.png",
    description: "Excellence in gymnastics training at our Kingwood facility!",
    links: {
      trial: "https://forms.office.com/r/rb-kingwood-trial",
      booking: "https://portal.iclasspro.com/rbkingwood",
      website: "https://rbkingwood.com/",
      facebook: "https://www.facebook.com/rbkingwood",
      instagram: "https://www.instagram.com/rb.kingwood/"
    }
  },
  {
    id: "houston-gymnastics",
    name: "Houston Gymnastics Academy",
    logo: "/lovable-uploads/2126afe4-d2a8-48f0-8951-8406825788fd.png",
    description: "Houston's premier gymnastics training center for all skill levels!",
    links: {
      trial: "https://forms.office.com/r/hga-trial",
      booking: "https://portal.iclasspro.com/houstongymnastics",
      website: "https://houstongymnastics.com/",
      facebook: "https://www.facebook.com/houstongymnastics",
      instagram: "https://www.instagram.com/houston.gymnastics/"
    }
  },
  {
    id: "estrella",
    name: "Estrella Gymnastics",
    logo: "/lovable-uploads/28dee08f-e249-48a3-9487-7f5291c298ff.png",
    description: "Helping young stars shine through the sport of gymnastics!",
    links: {
      trial: "https://forms.office.com/r/estrella-trial",
      booking: "https://portal.iclasspro.com/estrellagym",
      website: "https://estrellagym.com/",
      facebook: "https://www.facebook.com/estrellagym",
      instagram: "https://www.instagram.com/estrella.gym/"
    }
  },
  {
    id: "scottsdale",
    name: "Scottsdale Gymnastics",
    logo: "/lovable-uploads/5cbcd171-aae1-4e4a-850f-8c286cc79261.png",
    description: "Scottsdale's top destination for gymnastics training and fun!",
    links: {
      trial: "https://forms.office.com/r/scottsdale-trial",
      booking: "https://portal.iclasspro.com/scottsdalegymnastics",
      website: "https://scottsdalegymnastics.com/",
      facebook: "https://www.facebook.com/scottsdalegymnastics",
      instagram: "https://www.instagram.com/scottsdale.gymnastics/"
    }
  },
  {
    id: "tigar",
    name: "Tigar Gymnastics",
    logo: "/lovable-uploads/66d4a6ad-2c30-4b68-b5af-a5e5169dbf06.png",
    description: "Unleash your inner champion at Tigar Gymnastics!",
    links: {
      trial: "https://forms.office.com/r/tigar-trial",
      booking: "https://portal.iclasspro.com/tigargym",
      website: "https://tigargym.com/",
      facebook: "https://www.facebook.com/tigargym",
      instagram: "https://www.instagram.com/tigar.gym/"
    }
  }
];
