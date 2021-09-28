export default async function getMenuData() {
  return [
    // VB:REPLACE-START:MENU-CONFIG
    {
      title: 'Dashboard',
      key: '__dashboard',
      url: '/dashboard',
      icon: 'fe fe-home',
    },
    {
      title: 'Clients',
      key: '9qprl9',
      url: '/client',
      icon: 'fe fe-users',
      roles: ['admin'],
    },
    {
      title: 'Projets',
      key: 'w4es6',
      url: '/Projet',
      icon: 'fe fe-code',
      roles: ['admin', 'client'],
    },
    {
      title: 'Produits',
      key: 'n40xho',
      url: '/Produit',
      icon: 'fe fe-package',
      roles: ['admin'],
    },
    {
      title: 'Reclamations',
      key: '6z7t6c',
      url: '/Reclamation',
      icon: 'fe fe-clipboard',
      roles: ['admin', 'client'],
    },
    {
      title: 'Factures et devis',
      key: 'us0aen',
      icon: 'fe fe-dollar-sign',
      roles: ['admin', 'client'],
      children: [
        {
          title: 'Factures',
          key: 'factures',
          url: '/Facture',
        },
        {
          title: 'Devis',
          key: 'devis',
          url: '/Devis',
        },
      ],
    },
    // VB:REPLACE-END:MENU-CONFIG
  ]
}
