import React from 'react'
import UserMenu from './UserMenu'
import style from './style.module.scss'
import Actions from './Actions'

const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div />
      <div className="d-flex">
        <div className="mt-1 mr-4">
          <Actions />
        </div>
        <UserMenu />
      </div>
    </div>
  )
}

export default TopBar
