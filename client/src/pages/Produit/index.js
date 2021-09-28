import { React, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import TablesAntd10 from '@vb/widgets/TablesAntd/10'
import { useSelector } from 'react-redux'
import ControlsButton from '@vb/widgets/Controls/Button'
import { history } from 'index'

const Produit = () => {
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (user.role !== 'admin') history.push('/auth/404')
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <Helmet title="Produit" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {user.role === 'admin' && (
                <div className="d-flex mb-4">
                  <a href="#/ajouterProduit">
                    <ControlsButton data={{ title: 'Ajouter Produit', type: 'primary' }} />
                  </a>
                </div>
              )}
              <TablesAntd10 userRole={user.role} userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Produit
