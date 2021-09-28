import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsGithubWrite from '@vb/widgets/AppPartials/GithubWrite'

const ReponseReclamation = () => {
  return (
    <div>
      <Helmet title="ReponseReclamation" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <AppPartialsGithubWrite />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReponseReclamation
