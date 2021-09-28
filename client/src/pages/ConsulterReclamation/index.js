import React from 'react'
import { Helmet } from 'react-helmet'
import { history } from 'index'
import Typography3 from '@vb/widgets/Typography/3'
import ControlsButton from '@vb/widgets/Controls/Button'

const ConsulterReclamation = () => {
  return (
    <div>
      <Helmet title="ConsulterReclamation" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Typography3 />
            </div>
            <a
              href="#"
              className="p-4 mb-4"
              onClick={(e) => {
                e.preventDefault()
                history.goBack()
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

export default ConsulterReclamation
