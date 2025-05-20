import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="border-b container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl outline-dashed my-4 outline-2 outline-muted-foreground/30 rounded-2xl bg-primary/20 backdrop-blur-lg">
      <Link to="/" className="font-bold">
        Startforge Project
      </Link>

      <nav className="flex items-center gap-4">
        <>
          <Button variant="default_brutal" asChild>
            <Link to="/login">Link1</Link>
          </Button>
          <Button variant="default_brutal" asChild>
            <Link to="/register">Link2</Link>
          </Button>
        </>
      </nav>
    </header>
  );
};

export default Navbar;
