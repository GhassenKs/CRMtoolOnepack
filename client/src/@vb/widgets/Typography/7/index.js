import { React, useState, useEffect } from 'react'

const CustomTypography = () => {
  const [produit] = useState(JSON.parse(localStorage.getItem('produit')))
  console.log(produit)
  useEffect(() => {
    return () => {
      localStorage.removeItem('produit')
    }
  }, [])

  return (
    <div>
      <dl className="row">
        <dt className="col-sm-3 mt-3">title</dt>
        <dd className="col-sm-9 mt-3">{produit?.title}</dd>

        <dt className="col-sm-3 mt-3">Responsable</dt>
        <dd className="col-sm-9 mt-3">{produit?.responsable?.name}</dd>

        <dt className="col-sm-3 mt-3">price</dt>
        <dd className="col-sm-9 mt-3">{produit?.price}</dd>
        <dt className="col-sm-3 mt-3">Sale</dt>
        <dd className="col-sm-9 mt-3">{`${produit?.sale}`}</dd>
        <dt className="col-sm-3 mt-3">New</dt>
        <dd className="col-sm-9 mt-3">{`${produit?.recent}`}</dd>
        <dt className="col-sm-3 mt-3">Discount</dt>
        <dd className="col-sm-9 mt-3">{produit?.discount}</dd>
        <dt className="col-sm-3 mt-3">Date of creation</dt>
        <dd className="col-sm-9 mt-3">{produit?.dateOfCreation}</dd>
        <dt className="col-sm-3 mt-3">Users</dt>
        <dd className="col-sm-9 mt-3">{produit?.users}</dd>
        <dt className="col-sm-3 mt-3">Description</dt>
        <dd className="col-sm-9 mt-3">{produit?.description}</dd>
      </dl>
    </div>
  )
}

export default CustomTypography
