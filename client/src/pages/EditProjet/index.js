import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Forms9 from '@vb/widgets/Forms/9'
import { Redirect } from 'react-router-dom'

const EditProjet = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="EditProjet" />
      {user.role === 'admin' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <Forms9 userId={user.id} />
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

export default EditProjet
