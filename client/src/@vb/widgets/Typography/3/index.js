import { React, useState, useEffect } from 'react'

import { Tag, Typography } from 'antd'

const { Text } = Typography

const CustomTypography = () => {
  const [recl] = useState(JSON.parse(localStorage.getItem('recl')))
  console.log(recl)
  useEffect(() => {
    return () => {
      localStorage.removeItem('recl')
    }
  }, [])
  return (
    <div>
      <dl className="row">
        <dt className="col-sm-3 mt-3">Client</dt>
        <dd className="col-sm-9 mt-3">{recl?.client?.name}</dd>

        <dt className="col-sm-3 mt-3">Responsable</dt>
        <dd className="col-sm-9 mt-3">{recl?.responsable?.name}</dd>

        <dt className="col-sm-3 mt-3">Object</dt>
        <dd className="col-sm-9 mt-3">{recl?.object}</dd>

        <dt className="col-sm-3 mt-3">Description</dt>
        <dd className="col-sm-9 mt-3">{recl?.context}</dd>

        <dt className="col-sm-3 mt-3">Importance</dt>
        <dd className="col-sm-9 mt-3">
          <Tag color={recl?.type === 'important' ? 'volcano' : '#f50'}>
            {recl?.type.toUpperCase()}
          </Tag>
        </dd>

        <dt className="col-sm-3 mt-3">Status</dt>
        <dd className="col-sm-9 mt-3">
          <Text type={recl?.status === 'solved' ? 'success' : ''} strong>
            {recl?.status.toUpperCase()}
          </Text>
        </dd>
        <dt className="col-sm-3 mt-3">Image</dt>
        {recl.snapshots.src ? (
          <dd className="col-sm-9 mt-3">
            <img
              src={`http://localhost:5000/${recl?.snapshots.src}`}
              alt="recl_img"
              height="200px"
              width="200px"
            />
          </dd>
        ) : (
          <dd className="col-sm-9 mt-3">no snapshots</dd>
        )}
      </dl>
    </div>
  )
}

export default CustomTypography
