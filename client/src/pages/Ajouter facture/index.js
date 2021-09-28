import Form1 from '@vb/widgets/Forms/1'
import React from 'react'
import { useSelector } from 'react-redux'

import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'

const AjouterFacture = () => {
  const { role, id } = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="Ajouter Facture" />
      {role === 'admin' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <Form1 type="facture" userId={id} />
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

export default AjouterFacture
