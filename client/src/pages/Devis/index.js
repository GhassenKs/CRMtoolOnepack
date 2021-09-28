import React from 'react'
import { Helmet } from 'react-helmet'
import ControlsButton from '@vb/widgets/Controls/Button'
import Table13 from '@vb/widgets/TablesAntd/13'
import { useSelector } from 'react-redux'

const Devis = () => {
  const { id, role } = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="Devis" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {role === 'admin' && (
                <div className="d-flex mb-4">
                  <a href="#/ajouterDevis">
                    <ControlsButton data={{ title: 'Ajouter un devis', type: 'primary' }} />
                  </a>
                </div>
              )}
              <Table13 userId={id} userRole={role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Devis
