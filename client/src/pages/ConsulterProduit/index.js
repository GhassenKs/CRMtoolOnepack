import React from 'react'
import { Helmet } from 'react-helmet'
import Typography7 from '@vb/widgets/Typography/7'
import { history } from 'index'
import ControlsButton from '@vb/widgets/Controls/Button'

const ConsulterProduit = () => {
  return (
    <div>
      <Helmet title="ConsulterProduit" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Typography7 />
            </div>
            <a
              href="#/pages/Projet"
              className="p-4 mb-4"
              onClick={(e) => {
                e.preventDefault()
                history.push('/Produit')
              }}
            >
              <ControlsButton data={{ title: 'Retour', type: 'primary' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsulterProduit
