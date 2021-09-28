import { React, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import TablesAntd11 from '@vb/widgets/TablesAntd/11'
import { useSelector } from 'react-redux'
import ControlsButton from '@vb/widgets/Controls/Button'
import { history } from 'index'

const Projet = () => {
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (user.role !== 'admin') history.push('#/Projet')
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <Helmet title="Projet" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {user.role === 'admin' && (
                <div className="d-flex mb-4">
                  <a href="#/ajouterProjet">
                    <ControlsButton data={{ title: 'Ajouter Projet', type: 'primary' }} />
                  </a>
                </div>
              )}
              <TablesAntd11 userRole={user.role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projet
