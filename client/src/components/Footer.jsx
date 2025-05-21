import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-b container mx-auto flex h-16 items-center justify-between px-4 outline-dashed my-4 outline-2 outline-muted-foreground/30 rounded-2xl bg-primary/20 backdrop-blur-lg">
      <p className="text-muted-foreground text-sm">
        &copy; {currentYear} Stratforge Assignment by Vishnu. All rights
        reserved.
      </p>
      <p className="text-muted-foreground text-sm"></p>
    </footer>
  );
};

export default Footer;
