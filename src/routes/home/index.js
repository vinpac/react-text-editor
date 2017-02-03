import React from 'react';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import HomeView from './HomeView';

export default {
  path: '/',
  action() {
    return {
      component: <DefaultLayout view={HomeView} />,
    };
  },
};
