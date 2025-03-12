
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
  }
  // Add other gym locations here following the same structure
];
