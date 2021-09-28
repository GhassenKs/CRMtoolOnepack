import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import Form1 from '@vb/widgets/Forms/1'
import { Redirect } from 'react-router-dom'

const AjouterDevis = () => {
  const { role, id } = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="Ajouter Devis" />
      {role === 'admin' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <Form1 type="devis" userId={id} />
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

export default AjouterDevis
