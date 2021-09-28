import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Forms10 from '@vb/widgets/Forms/10'
import { Redirect } from 'react-router-dom'

const AjouterProduit = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="Ajouter Produit" />
      {user.role === 'admin' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <Forms10 />
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

export default AjouterProduit
