export const routes = {
  // EZ2ERP Routes
  mainDashboard: "/",
  login: '/login',
  inventory: {
    products: '/inventory/products',
    createProduct: '/inventory/products/create',
    // productDetails: (slug: string) => `/inventory/products/${slug}`,
    ediProduct: (slug: string) => `/inventory/products/${slug}/edit`,
    productCategories: '/inventory/product-categories'
  },
  profile: '#',
  profileSettings: '#'
};
