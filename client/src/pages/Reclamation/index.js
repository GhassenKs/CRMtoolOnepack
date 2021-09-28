import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import ControlsButton from '@vb/widgets/Controls/Button'
import Table12 from '@vb/widgets/TablesAntd/12'

const Reclamation = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="Reclamation" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {user.role === 'client' && (
                <div className="d-flex mb-4">
                  <a href="#/ajouterReclamation">
                    <ControlsButton data={{ title: 'Ajouter une reclamation', type: 'primary' }} />
                  </a>
                </div>
              )}
              <Table12 userRole={user.role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reclamation
