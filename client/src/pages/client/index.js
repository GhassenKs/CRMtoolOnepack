import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import ControlsButton from '@vb/widgets/Controls/Button'
import TablesAntd2 from '@vb/widgets/TablesAntd/2'
import { Redirect } from 'react-router-dom'

const Client = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="client" />
      {user.role === 'admin' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body d-flex">
                <a href="#/create">
                  <ControlsButton data={{ title: 'Ajouter un client', type: 'primary' }} />
                </a>
              </div>
              <div className="card-body">
                <TablesAntd2 />
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

export default Client
