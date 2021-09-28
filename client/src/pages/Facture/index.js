import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import ControlsButton from '@vb/widgets/Controls/Button'
import Table14 from '@vb/widgets/TablesAntd/14'

const Facture = () => {
  const { id, role } = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="Facture" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {role === 'admin' && (
                <div className="d-flex mb-4">
                  <a href="#/ajouterFacture">
                    <ControlsButton data={{ title: 'Ajouter une facture', type: 'primary' }} />
                  </a>
                </div>
              )}
              <Table14 userId={id} userRole={role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Facture
