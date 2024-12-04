import React, { FC, Fragment, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { RoutePath, routesConfiguration } from 'routes';

import MainLayout from './MainLayout';

import 'resources/user/user.handlers';

interface PageConfigProps {
  children: ReactElement;
}

const PageConfig: FC<PageConfigProps> = ({ children }) => {
  const { route } = useRouter();

  const { layout } = routesConfiguration[route as RoutePath] || {};
  const Layout = layout ? MainLayout : Fragment;

  return <Layout>{children}</Layout>;
};

export default PageConfig;
