export const routes = {
  home: {
    path: '/home',
    name: 'home',
  },
  address: {
    path: '/address',
    name: 'address',
    children: {
      search: {
        path: 'search',
        name: 'address-search',
      },
    },
  },
  city: {
    path: '/city',
    name: 'city',
    children: {
      search: {
        path: 'search',
        name: 'city-search',
      },
    },
  },
  shopSearch: {
    path: '/shop/search',
    name: 'shop-search',
  },
}
