import React from "react";
import { Link, NavLink } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <header className="border-b container mx-auto flex h-16 items-center justify-between px-4 outline-dashed my-4 outline-2 outline-muted-foreground/30 rounded-2xl bg-primary/10 backdrop-blur-lg">
      <Link to="/" className="font-bold">
        Stratforge Movie Booking
      </Link>

      <nav className="flex items-center">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "link" }),
              isActive && "font-bold underline"
            )
          }
        >
          Movies
        </NavLink>

        <NavLink
          to="/upcoming-shows"
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "link" }),
              isActive && "font-bold underline"
            )
          }
        >
          Upcoming Shows
        </NavLink>

        <NavLink
          to="/booking-history"
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "link" }),
              isActive && "font-bold underline"
            )
          }
        >
          Booking History
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
