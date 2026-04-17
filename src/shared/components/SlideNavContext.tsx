import { createContext, useContext, useState, type ReactNode } from 'react';

export interface SlideNavState {
  activeStep: number;
  maxSteps: number;
  onPrev: () => void;
  onNext: () => void;
}

interface SlideNavContextValue {
  nav: SlideNavState | null;
  setNav: (nav: SlideNavState | null) => void;
}

const SlideNavCtx = createContext<SlideNavContextValue>({
  nav: null,
  setNav: () => {},
});

export function SlideNavProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState<SlideNavState | null>(null);
  return <SlideNavCtx.Provider value={{ nav, setNav }}>{children}</SlideNavCtx.Provider>;
}

export function useSlideNav() {
  return useContext(SlideNavCtx);
}
