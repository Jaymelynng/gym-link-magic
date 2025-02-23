
import { Calendar, Globe, Facebook, Instagram, Gift } from "lucide-react";
import SocialLink from "@/components/SocialLink";

const Index = () => {
  return (
    <div className="min-h-screen w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Profile Section */}
      <div className="w-64 mb-6">
        <img
          src="/lovable-uploads/eb62c5bf-e16a-4938-8107-8a49aeaf4c47.png"
          alt="Oasis Gymnastics"
          className="w-full h-auto"
        />
      </div>
      
      <p className="text-gray-600 mb-8 text-center">
        Connect with us and stay updated on classes, events, and more!
      </p>

      {/* Links Section */}
      <div className="w-full space-y-4">
        <SocialLink
          href="https://portal.iclasspro.com/oasisgymnastics"
          icon={Gift}
          label="Book a Free Trial"
          color="#F43F5E"
        />
        
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
          color="#EC4899"
        />
        
        <SocialLink
          href="https://www.instagram.com/oasis.gym/"
          icon={Instagram}
          label="Follow on Instagram"
          color="#2DD4BF"
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
