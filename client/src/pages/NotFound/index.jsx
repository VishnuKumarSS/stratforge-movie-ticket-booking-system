import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
      <p className="text-xl mb-8 text-muted-foreground">Page not found</p>
      <Button variant="default" asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
