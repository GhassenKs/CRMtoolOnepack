import React from 'react'
import { Helmet } from 'react-helmet'
import Forms6 from '@vb/widgets/Forms/6'

const EditProfile = () => {
  return (
    <div>
      <Helmet title="EditProfile" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Forms6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
