import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
// import { UserOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Avatar } from 'antd'
import { logoutThunk } from 'redux/user/reducers'
import styles from './style.module.scss'

const ProfileMenu = () => {
  const user = useSelector((state) => state.user)
  const [imgUrl, setImgUrl] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setImgUrl(JSON.parse(localStorage.getItem('img')))
  }, [])

  const logout = (e) => {
    e.preventDefault()
    dispatch(logoutThunk())
  }

  const menu = (
    <Menu selectable={false} style={{ width: '180px' }}>
      <Menu.Item key={1}>
        <strong>
          <FormattedMessage id="topBar.profileMenu.hello" />,{' '}
          {`${user.name}                  ` || 'Anonymous'}
        </strong>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={2}>
        <a href="#/EditProfile">
          <i className="fe fe-user mr-2" />
          <FormattedMessage id="topBar.profileMenu.editProfile" />
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={3}>
        <a href="#" onClick={logout}>
          <i className="fe fe-log-out mr-2" />
          <FormattedMessage id="topBar.profileMenu.logout" />
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className={styles.dropdown}>
        <Avatar
          className={styles.avatar}
          shape="circle"
          size="large"
          icon={
            imgUrl ? (
              <img
                src={`http://localhost:5000/${imgUrl}`}
                alt=""
                className="rounded-circle"
                height="50px"
                width="50px"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&length=1`}
                alt=""
                className="rounded-circle"
                height="50px"
                width="50px"
              />
            )
          }
        />
      </div>
    </Dropdown>
  )
}

export default ProfileMenu
