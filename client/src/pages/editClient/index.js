import Form7 from '@vb/widgets/Forms/7'
import { Helmet } from 'react-helmet'
import { React, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { history } from 'index'

const EditClient = () => {
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (user.role !== 'admin') history.push('/auth/404')
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <Helmet title="EditClient" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Form7 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditClient
