import React from 'react'
import { Helmet } from 'react-helmet'
import Emails3 from '@vb/widgets/Emails/3'

const ConsulterDevis = () => {
  return (
    <div>
      <Helmet title="ConsulterFacture" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Emails3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsulterDevis
