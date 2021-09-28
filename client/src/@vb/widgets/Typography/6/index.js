import { React, useState, useEffect } from 'react'

const CustomTypography = () => {
  const [projet] = useState(JSON.parse(localStorage.getItem('projet')))
  useEffect(() => {
    return () => {
      localStorage.removeItem('projet')
    }
  }, [])

  return (
    <div>
      <dl className="row">
        <dt className="col-sm-3 mt-3">title</dt>
        <dd className="col-sm-9 mt-3">{projet?.title}</dd>
        <dt className="col-sm-3 mt-3">Client</dt>
        <dd className="col-sm-9 mt-3">{projet?.client?.name}</dd>

        <dt className="col-sm-3 mt-3">Responsable</dt>
        <dd className="col-sm-9 mt-3">{projet?.responsable?.name}</dd>

        <dt className="col-sm-3 mt-3">price</dt>
        <dd className="col-sm-9 mt-3">{projet?.price}</dd>

        <dt className="col-sm-3 mt-3">Invoices</dt>
        <dd className="col-sm-9 mt-3">
          {projet?.invoices?.map((i, index) => (
            <div key={index}>{i}</div>
          ))}
        </dd>
        <dt className="col-sm-3 mt-3">Category</dt>
        <dd className="col-sm-9 mt-3">{projet?.category}</dd>
        <dt className="col-sm-3 mt-3">Bills</dt>
        <dd className="col-sm-9 mt-3">
          {projet?.bills?.map((b, index) => (
            <div key={index}>{b}</div>
          ))}
        </dd>
        <dt className="col-sm-3 mt-3">Description</dt>
        <dd className="col-sm-9 mt-3">{projet?.description}</dd>
      </dl>
    </div>
  )
}

export default CustomTypography
