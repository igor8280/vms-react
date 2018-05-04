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
    path: '/languages',
    component: require('../../containers/Languages/List'),
    name: 'languages'
  }
];
