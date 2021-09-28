import React from 'react'
import { Helmet } from 'react-helmet'
import Typography6 from '@vb/widgets/Typography/6'
import { history } from 'index'
import ControlsButton from '@vb/widgets/Controls/Button'

const ConsulterProjet = () => {
  return (
    <div>
      <Helmet title="ConsulterProjet" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Typography6 />
            </div>
            <a
              href="#"
              className="p-4 mb-4"
              onClick={(e) => {
                e.preventDefault()
                history.push('/Projet')
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

export default ConsulterProjet
