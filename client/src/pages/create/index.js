import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Forms4 from '@vb/widgets/Forms/4'
import { Redirect } from 'react-router-dom'

const Create = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="create" />
      {user.role === 'admin' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <Forms4 />
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

export default Create
