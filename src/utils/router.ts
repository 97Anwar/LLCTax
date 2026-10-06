import { ActiveTab } from '../types';
import { STATE_RULES } from '../data/stateRules';

export interface RouteState {
  tab: ActiveTab;
  stateId: string;
  path: string;
  guideSlug?: string;
}

export function getStateUrl(stateId: string): string {
  return `/states/${stateId}`;
}

export function getGuideUrl(guideSlug: string): string {
  return `/guides/${guideSlug}`;
}

export function getRouteUrl(tab: ActiveTab, stateId?: string, guideSlug?: string): string {
  switch (tab) {
    case 'calculator':
      return '/';
    case 'states':
      return '/states';
    case 'state-detail':
      return stateId ? `/states/${stateId}` : '/states';
    case 'comparison':
      return '/compare';
    case 'matrix':
      return '/matrix';
    case 'deadlines':
      return '/deadlines';
    case 'methodology':
      return '/methodology';
    case 'guides':
      return '/guides';
    case 'guide-detail':
      return guideSlug ? `/guides/${guideSlug}` : '/guides';
    case 'privacy':
      return '/privacy';
    case 'terms':
      return '/terms';
    case 'disclaimer':
      return '/disclaimer';
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    default:
      return '/';
  }
}

export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return {
      tab: 'calculator',
      stateId: 'california',
      path: '/',
    };
  }

  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const urlParams = new URLSearchParams(window.location.search);
  const paramState = urlParams.get('state')?.toLowerCase();

  // Check /states/:stateId
  const stateMatch = path.match(/^\/states\/([a-z0-9_]+)$/);
  if (stateMatch && STATE_RULES[stateMatch[1]]) {
    return {
      tab: 'state-detail',
      stateId: stateMatch[1],
      path,
    };
  }

  // Check direct /:stateId (e.g. /california, /delaware, /florida)
  const directStateMatch = path.match(/^\/([a-z0-9_]+)$/);
  if (directStateMatch && STATE_RULES[directStateMatch[1]]) {
    return {
      tab: 'state-detail',
      stateId: directStateMatch[1],
      path: `/states/${directStateMatch[1]}`,
    };
  }

  if (path === '/states') {
    return {
      tab: 'states',
      stateId: paramState && STATE_RULES[paramState] ? paramState : 'california',
      path: '/states',
    };
  }

  if (path === '/compare' || path === '/comparison') {
    return {
      tab: 'comparison',
      stateId: paramState && STATE_RULES[paramState] ? paramState : 'delaware',
      path: '/compare',
    };
  }

  if (path === '/matrix') {
    return {
      tab: 'matrix',
      stateId: 'california',
      path: '/matrix',
    };
  }

  if (path === '/deadlines') {
    return {
      tab: 'deadlines',
      stateId: 'california',
      path: '/deadlines',
    };
  }

  if (path === '/methodology') {
    return {
      tab: 'methodology',
      stateId: 'california',
      path: '/methodology',
    };
  }

  // Check /guides/:guideSlug
  const guideMatch = path.match(/^\/guides\/([a-z0-9-]+)$/);
  if (guideMatch) {
    return {
      tab: 'guide-detail',
      stateId: 'california',
      path,
      guideSlug: guideMatch[1],
    };
  }

  if (path === '/guides') {
    return {
      tab: 'guides',
      stateId: 'california',
      path: '/guides',
    };
  }

  if (path === '/privacy') {
    return {
      tab: 'privacy',
      stateId: 'california',
      path: '/privacy',
    };
  }

  if (path === '/terms') {
    return {
      tab: 'terms',
      stateId: 'california',
      path: '/terms',
    };
  }

  if (path === '/disclaimer') {
    return {
      tab: 'disclaimer',
      stateId: 'california',
      path: '/disclaimer',
    };
  }

  if (path === '/about') {
    return {
      tab: 'about',
      stateId: 'california',
      path: '/about',
    };
  }

  if (path === '/contact') {
    return {
      tab: 'contact',
      stateId: 'california',
      path: '/contact',
    };
  }

  // Fallback to calculator
  return {
    tab: 'calculator',
    stateId: paramState && STATE_RULES[paramState] ? paramState : 'california',
    path: '/',
  };
}

export const parseCurrentUrl = parseCurrentRoute;

export function navigate(path: string) {
  if (typeof window !== 'undefined') {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function listenToRouteChanges(callback: (route: RouteState) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handlePopState = () => {
    callback(parseCurrentRoute());
  };

  window.addEventListener('popstate', handlePopState);
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}
