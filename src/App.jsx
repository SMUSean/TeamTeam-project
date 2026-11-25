import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Footer } from "./Components/navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Ecosystem from "./pages/Ecosystem";
import Gallery from "./pages/Gallery";
import NaturalBurial from "./pages/NaturalBurial";
import Contact from "./pages/Contact";
import Ecommerce from "./pages/Ecommerce";
import FaunaFloraFunga from "./pages/FaunaFloraFunga";
import SiteMap from "./pages/SiteMap.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { warmAppCache } from "./utils/assetCache";

const ROUTE_COMPONENTS = [
  { path: "/", Component: Home },
  { path: "/about", Component: About },
  { path: "/ecosystem", Component: Ecosystem },
  { path: "/gallery", Component: Gallery },
  { path: "/faunaflorafunga", Component: FaunaFloraFunga },
  { path: "/naturalburial", Component: NaturalBurial },
  { path: "/contacts", Component: Contact },
  { path: "/ecommerce", Component: Ecommerce },
  { path: "/sitemap", Component: SiteMap },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
];

const NAV_ORDER = [
  "/",
  "/about",
  "/ecosystem",
  "/gallery",
  "/faunaflorafunga",
  "/naturalburial",
  "/contacts",
  "/ecommerce",
  "/sitemap",
];

const PREMOUNT_PATHS = [
  "/",
  "/about",
  "/ecosystem",
  "/gallery",
  "/faunaflorafunga",
  "/naturalburial",
  "/contacts",
  "/ecommerce",
];

function App() {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const [visitedPaths, setVisitedPaths] = useState(() => new Set([currentPath]));
  const prevPathRef = useRef(currentPath);

  useEffect(() => {
    setVisitedPaths((prev) => {
      if (prev.has(currentPath)) return prev;
      const next = new Set(prev);
      next.add(currentPath);
      return next;
    });
  }, [currentPath]);

  const prevPath = prevPathRef.current;
  const oldIdx = NAV_ORDER.indexOf(prevPath);
  const newIdx = NAV_ORDER.indexOf(currentPath);
  const direction =
    prevPath !== currentPath && oldIdx !== -1 && newIdx !== -1
      ? newIdx > oldIdx
        ? 1
        : -1
      : 0;

  useEffect(() => {
    prevPathRef.current = currentPath;
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [currentPath]);

  useEffect(() => {
    warmAppCache();

    const preMount = () => {
      setVisitedPaths((prev) => {
        const next = new Set(prev);
        PREMOUNT_PATHS.forEach((p) => next.add(p));
        return next;
      });
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preMount, { timeout: 1000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = window.setTimeout(preMount, 500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const enterClass =
    direction > 0
      ? "tab-enter-right"
      : direction < 0
      ? "tab-enter-left"
      : "tab-enter-fade";

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="grow bg-light-border dark:bg-dark-background overflow-x-clip">
        {ROUTE_COMPONENTS.map(({ path, Component }) => {
          if (!visitedPaths.has(path) && currentPath !== path) return null;
          const isActive = currentPath === path;
          return (
            <div key={path} className={isActive ? `block ${enterClass}` : "hidden"}>
              <Component />
            </div>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}

export default App;

