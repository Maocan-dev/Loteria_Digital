
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-loteria-dark-blue text-loteria-beige py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-loteria-light-blue text-sm">
            © {new Date().getFullYear()} Lotería Digital - A traditional game in digital form
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
