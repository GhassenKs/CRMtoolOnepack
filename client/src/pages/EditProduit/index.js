import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Forms8 from '@vb/widgets/Forms/8'
import { Redirect } from 'react-router-dom'

const EditProduit = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <Helmet title="EditProduit" />
      {user.role === 'admin' ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <Forms8 />
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

export default EditProduit
