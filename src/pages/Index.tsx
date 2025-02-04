import { Calendar, Globe, Facebook, Instagram } from "lucide-react";
import SocialLink from "@/components/SocialLink";

const Index = () => {
  return (
    <div className="min-h-screen w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Profile Section */}
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-white shadow-lg">
        <img
          src="/placeholder.svg"
          alt="Oasis Gymnastics"
          className="w-full h-full object-cover"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Oasis Gymnastics</h1>
      <p className="text-gray-600 mb-8 text-center">
        Connect with us and stay updated on classes, events, and more!
      </p>

      {/* Links Section */}
      <div className="w-full space-y-4">
        <SocialLink
          href="https://portal.iclasspro.com/oasisgymnastics"
          icon={Calendar}
          label="Book a Class"
          color="#2DD4BF"
        />
        
        <SocialLink
          href="https://oasisgym.com/"
          icon={Globe}
          label="Visit Website"
          color="#8B5CF6"
        />
        
        <SocialLink
          href="https://www.facebook.com/oasisgym"
          icon={Facebook}
          label="Follow on Facebook"
          color="#1877F2"
        />
        
        <SocialLink
          href="https://www.instagram.com/oasis.gym/"
          icon={Instagram}
          label="Follow on Instagram"
          color="#E4405F"
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500">
        © 2024 Oasis Gymnastics. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;