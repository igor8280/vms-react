export default [
  {
    path: '/',
    exact: true,
    component: require('../../components/Dashboard/Dashboard'),
    name: 'dashboard'
  },
  {
    path: '/countries',
    component: require('../../containers/Countries/Countries'),
    name: 'countries'
  },
  {
    path: '/countries/:id',
    component: require('../../containers/Countries/CountriesForm'),
    name: 'countries-edit'
  },
  {
    path: '/countries/create',
    component: require('../../containers/Countries/CountriesForm'),
    name: 'countries-create'
  },
  {
    path: '/languages',
    component: require('../../containers/Languages/Languages'),
    name: 'languages'
  }
  // {
  //   path: '/languages/:id',
  //   component: require('../../containers/Languages/LanguagesForm'),
  //   name: 'languages-edit'
  // },
  // {
  //   path: '/languages/create',
  //   component: require('../../containers/Languages/LanguagesForm'),
  //   name: 'languages-create'
  // }
];
