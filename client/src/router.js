import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // VB:REPLACE-START:ROUTER-CONFIG
  {
    path: '/dashboard',
    Component: lazy(() => import('pages/dashboard')),
    exact: true,
  },
  {
    path: '/EditProduit',
    Component: lazy(() => import('pages/EditProduit')),
    exact: true,
  },
  {
    path: '/AjouterProduit',
    Component: lazy(() => import('pages/ajouterProduit')),
    exact: true,
  },
  {
    path: '/AjouterProjet',
    Component: lazy(() => import('pages/ajouterProjet')),
    exact: true,
  },
  {
    path: '/ConsulterProduit',
    Component: lazy(() => import('pages/ConsulterProduit')),
    exact: true,
  },
  {
    path: '/EditProjet',
    Component: lazy(() => import('pages/EditProjet')),
    exact: true,
  },
  {
    path: '/EditProfile',
    Component: lazy(() => import('pages/EditProfile')),
    exact: true,
  },
  {
    path: '/client',
    Component: lazy(() => import('pages/client')),
    exact: true,
  },
  {
    path: '/Reclamation',
    Component: lazy(() => import('pages/Reclamation')),
    exact: true,
  },
  {
    path: '/ajouterReclamation',
    Component: lazy(() => import('pages/Ajouter Reclamation')),
    exact: true,
  },
  {
    path: '/ajouterFacture',
    Component: lazy(() => import('pages/Ajouter facture')),
    exact: true,
  },
  {
    path: '/ajouterDevis',
    Component: lazy(() => import('pages/Ajouter devis')),
    exact: true,
  },
  {
    path: '/Facture',
    Component: lazy(() => import('pages/Facture')),
    exact: true,
  },
  {
    path: '/Devis',
    Component: lazy(() => import('pages/Devis')),
    exact: true,
  },
  {
    path: '/create',
    Component: lazy(() => import('pages/create')),
    exact: true,
  },
  {
    path: '/Consulter',
    Component: lazy(() => import('pages/ConsulterDevis')),
    exact: true,
  },
  {
    path: '/consulterProjet',
    Component: lazy(() => import('pages/consulterProjet')),
    exact: true,
  },
  {
    path: '/ConsulterReclamation',
    Component: lazy(() => import('pages/ConsulterReclamation')),
    exact: true,
  },
  {
    path: '/Projet',
    Component: lazy(() => import('pages/Projet')),
    exact: true,
  },
  {
    path: '/Produit',
    Component: lazy(() => import('pages/Produit')),
    exact: true,
  },
  {
    path: '/ReponseReclamation',
    Component: lazy(() => import('pages/ReponseReclamation')),
    exact: true,
  },
  {
    path: '/editClient',
    Component: lazy(() => import('pages/editClient')),
    exact: true,
  },

  // VB:REPLACE-END:ROUTER-CONFIG
  {
    path: '/auth/login/admin',
    Component: lazy(() => import('pages/auth/login-admin')),
    exact: true,
  },
  {
    path: '/auth/login/client',
    Component: lazy(() => import('pages/auth/login-client')),
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true,
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={(state) => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    {/* VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT */}
                    <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
