export enum ScopeType {
  PUBLIC = 'PUBLIC',
}

export enum LayoutType {
  MAIN = 'MAIN',
}

export enum RoutePath {
  // Private paths
  Home = '/',
  Profile = '/profile',

  NotFound = '/404',
}

type RoutesConfiguration = {
  [routePath in RoutePath]: {
    scope?: ScopeType;
    layout?: LayoutType;
  };
};

export const routesConfiguration: RoutesConfiguration = {
  [RoutePath.Home]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Profile]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MAIN,
  },

  [RoutePath.NotFound]: {},
};
