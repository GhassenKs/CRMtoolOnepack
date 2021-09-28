import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsWpWrite from '@vb/widgets/AppPartials/WpWrite'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const AjouterReclamation = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="Ajouter Reclamation" />
      {user.role === 'client' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <AppPartialsWpWrite id={user.id} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/auth/404" />
      )}
    </div>
  )
}

export default AjouterReclamation
