import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Forms11 from '@vb/widgets/Forms/11'
import { Redirect } from 'react-router-dom'

const AjouterProjet = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="Ajouter Projet" />
      {user.role === 'admin' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <Forms11 />
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

export default AjouterProjet
