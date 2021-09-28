import React from 'react'
import { connect } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Switch, Select, Slider, Input, Collapse, Radio } from 'antd'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({
  isSidebarOpen: settings.isSidebarOpen,
  isMenuCollapsed: settings.isMenuCollapsed,
  isMenuShadow: settings.isMenuShadow,
  isMenuUnfixed: settings.isMenuUnfixed,
  menuLayoutType: settings.menuLayoutType,
  menuColor: settings.menuColor,
  authPagesColor: settings.authPagesColor,
  isAuthTopbar: settings.isAuthTopbar,
  isTopbarFixed: settings.isTopbarFixed,
  isTopbarSeparated: settings.isTopbarSeparated,
  isContentMaxWidth: settings.isContentMaxWidth,
  isAppMaxWidth: settings.isAppMaxWidth,
  isGrayBackground: settings.isGrayBackground,
  isGrayTopbar: settings.isGrayTopbar,
  isCardShadow: settings.isCardShadow,
  isSquaredBorders: settings.isSquaredBorders,
  isBorderless: settings.isBorderless,
  routerAnimation: settings.routerAnimation,
  locale: settings.locale,
  theme: settings.theme,
  primaryColor: settings.primaryColor,
  leftMenuWidth: settings.leftMenuWidth,
  logo: settings.logo,
  layoutMenu: settings.layoutMenu,
  flyoutMenuColor: settings.flyoutMenuColor,
  layoutBreadcrumbs: settings.layoutBreadcrumbs,
  layoutFooter: settings.layoutFooter,
  layoutTopbar: settings.layoutTopbar,
  version: settings.version,
  flyoutMenuType: settings.flyoutMenuType,
  isPreselectedOpen: settings.isPreselectedOpen,
})

const Sidebar = ({
  dispatch,
  isSidebarOpen,
  isMenuCollapsed,
  isMenuShadow,
  isMenuUnfixed,
  menuLayoutType,
  menuColor,
  authPagesColor,
  isAuthTopbar,
  isTopbarFixed,
  isTopbarSeparated,
  isContentMaxWidth,
  isAppMaxWidth,
  isGrayBackground,
  isGrayTopbar,
  isCardShadow,
  isSquaredBorders,
  isBorderless,
  routerAnimation,
  locale,
  theme,
  leftMenuWidth,
  logo,
  layoutMenu,
  flyoutMenuColor,
  layoutBreadcrumbs,
  layoutFooter,
  layoutTopbar,
  version,
  flyoutMenuType,
}) => {
  const changeSetting = (setting, value) => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting,
        value,
      },
    })
  }

  const toggleSettings = (e) => {
    e.preventDefault()
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isSidebarOpen',
        value: !isSidebarOpen,
      },
    })
  }

  const colorPickerHandler = (e, setting, value) => {
    e.preventDefault()
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting,
        value,
      },
    })
  }

  const ColorPicker = ({ colors, value, setting }) => {
    return (
      <div className="clearfix">
        {colors.map((item) => {
          return (
            <a
              href="#"
              key={item}
              onClick={(e) => colorPickerHandler(e, setting, item)}
              className={classNames(`${style.vb__sidebar__select__item}`, {
                [style.vb__sidebar__select__item__active]: value === item,
                [style.vb__sidebar__select__item__black]: item === 'dark',
                [style.vb__sidebar__select__item__white]: item === 'white',
                [style.vb__sidebar__select__item__gray]: item === 'gray',
                [style.vb__sidebar__select__item__blue]: item === 'blue',
                [style.vb__sidebar__select__item__img]: item === 'image',
              })}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <div
        className={classNames(style.vb__sidebar, {
          [style.vb__sidebar__toggled]: isSidebarOpen,
        })}
      >
        <PerfectScrollbar>
          <div className={style.vb__sidebar__inner}>
            <a
              href="#"
              className={`fe fe-x ${style.vb__sidebar__close}`}
              onClick={toggleSettings}
            />
            <h5 className="mb-4">
              <strong>Settings</strong>
            </h5>
            <Collapse accordion bordered={false} defaultActiveKey={['1']} onChange={() => {}}>
              <Collapse.Panel header="Application Settings" key="1">
                <div className="pt-2 mb-2">
                  <h6>
                    <strong>CRM Dashboard</strong>
                  </h6>
                  <Input
                    value={logo}
                    onChange={(e) => {
                      const { value } = e.target
                      changeSetting('logo', value)
                    }}
                  />
                </div>
                <div className="pt-2 mb-2">
                  <h6>
                    <strong>Router Animation</strong>
                  </h6>
                  <Select
                    defaultValue={routerAnimation}
                    style={{ width: '100%' }}
                    onChange={(value) => changeSetting('routerAnimation', value)}
                  >
                    <Select.Option value="none">None</Select.Option>
                    <Select.Option value="slide-fadein-up">Slide Up</Select.Option>
                    <Select.Option value="slide-fadein-right">Slide Right</Select.Option>
                    <Select.Option value="fadein">Fade In</Select.Option>
                    <Select.Option value="zoom-fadein">Zoom</Select.Option>
                  </Select>
                </div>
                <div className="pt-2 mb-2">
                  <h6>
                    <strong>Internationalization</strong>
                  </h6>
                  <Select
                    style={{ width: '100%' }}
                    value={locale}
                    onChange={(value) => changeSetting('locale', value)}
                  >
                    <Select.Option value="en-US">English (en-US)</Select.Option>
                    <Select.Option value="fr-FR">French (fr-FR)</Select.Option>
                    <Select.Option value="ru-RU">Русский (ru-RU)</Select.Option>
                    <Select.Option value="zh-CN">简体中文 (zh-CN)</Select.Option>
                  </Select>
                </div>
              </Collapse.Panel>
              <Collapse.Panel header="Layout Settings" key="2">
                <div className="pt-2 mb-3">
                  <h6>
                    <strong>Visual Builder Style</strong>
                  </h6>
                  <div className="pt-1 clearfix">
                    <Radio.Group
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        const { value } = e.target
                        changeSetting('version', value)
                      }}
                      defaultValue={version}
                    >
                      <div className="row">
                        <div className="col-6">
                          <div className="mb-2">
                            <Radio value="fluent">Fluent (System Default Font)</Radio>
                          </div>
                          <div className="mb-2">
                            <Radio value="clean">Clean (Mukta Font)</Radio>
                          </div>
                          <div className="mb-2">
                            <Radio value="air">Air (Source Sans Font)</Radio>
                          </div>
                        </div>
                      </div>
                    </Radio.Group>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Dark Theme</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={theme === 'dark'}
                          onChange={(value) => changeSetting('theme', value ? 'dark' : 'default')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Content Max-Width</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isContentMaxWidth}
                          onChange={(value) => changeSetting('isContentMaxWidth', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Layout Max-Width</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isAppMaxWidth}
                          onChange={(value) => changeSetting('isAppMaxWidth', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Layout Gray Bg</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isGrayBackground}
                          onChange={(value) => changeSetting('isGrayBackground', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Card Squared Borders</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isSquaredBorders}
                          onChange={(value) => changeSetting('isSquaredBorders', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Card Shadow</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isCardShadow}
                          onChange={(value) => changeSetting('isCardShadow', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Card Borderless</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isBorderless}
                          onChange={(value) => changeSetting('isBorderless', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Auth Layout Topbar</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isAuthTopbar}
                          onChange={(value) => changeSetting('isAuthTopbar', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-3 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Auth Layout Bg</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixColorPicker}>
                        <ColorPicker
                          setting="authPagesColor"
                          value={authPagesColor}
                          colors={['white', 'gray', 'image']}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse.Panel>
              <Collapse.Panel header="Menu Settings" key="3">
                <div className="pt-2 mb-2">
                  <h6>
                    <strong>Menu Variant</strong>
                  </h6>
                  <div className="pt-1 clearfix">
                    <Radio.Group
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        const { value } = e.target
                        changeSetting('layoutMenu', value)
                      }}
                      defaultValue={layoutMenu}
                    >
                      <div className="row">
                        <div className="col-6">
                          <div className="mb-2">
                            <Radio value="classic">Classic</Radio>
                          </div>
                          <div className="mb-2">
                            <Radio value="flyout">Flyout</Radio>
                          </div>
                          <div className="mb-2">
                            <Radio value="simply">Simply</Radio>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mb-2">
                            <Radio value="noMenu">None</Radio>
                          </div>
                        </div>
                      </div>
                    </Radio.Group>
                  </div>
                </div>
                {(layoutMenu === 'classic' || layoutMenu === 'flyout') && (
                  <div>
                    <div className="pt-2 mb-2">
                      <h6>
                        <strong>Menu Layout Type</strong>
                      </h6>
                      <div className="pt-1 clearfix">
                        <Radio.Group
                          style={{ width: '100%' }}
                          onChange={(e) => {
                            const { value } = e.target
                            changeSetting('menuLayoutType', value)
                          }}
                          defaultValue={menuLayoutType}
                        >
                          <div className="row">
                            <div className="col-6">
                              <div className="mb-2">
                                <Radio value="left">Left</Radio>
                              </div>
                              <div className="mb-2">
                                <Radio value="top">Top</Radio>
                              </div>
                            </div>
                          </div>
                        </Radio.Group>
                      </div>
                    </div>
                    {layoutMenu === 'flyout' && (
                      <div className="pt-2 mb-2">
                        <h6>
                          <strong>Sub Menu Type</strong>
                        </h6>
                        <div className="pt-1 clearfix">
                          <Radio.Group
                            style={{ width: '100%' }}
                            onChange={(e) => {
                              const { value } = e.target
                              changeSetting('flyoutMenuType', value)
                            }}
                            defaultValue={flyoutMenuType}
                          >
                            <div className="row">
                              <div className="col-6">
                                <div className="mb-2">
                                  <Radio value="flyout">Flyout</Radio>
                                </div>
                                <div className="mb-2">
                                  <Radio value="default">Default</Radio>
                                </div>
                                <div className="mb-2">
                                  <Radio value="compact">Compact</Radio>
                                </div>
                              </div>
                            </div>
                          </Radio.Group>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {(layoutMenu === 'classic' ||
                  layoutMenu === 'flyout' ||
                  layoutMenu === 'simply') && (
                  <div>
                    <div className="pt-2 mb-2">
                      <div className="row">
                        <div className="col-auto mr-auto">
                          <h6>
                            <strong>Menu Color</strong>
                          </h6>
                        </div>
                        <div className="col-auto">
                          <div className={style.vb__sidebar__fixColorPicker}>
                            <ColorPicker
                              setting="menuColor"
                              value={menuColor}
                              colors={['white', 'gray', 'dark']}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {layoutMenu === 'flyout' && (
                  <div>
                    {(flyoutMenuType === 'flyout' || flyoutMenuType === 'compact') && (
                      <div className="pt-2 mb-2">
                        <div className="row">
                          <div className="col-auto mr-auto">
                            <h6>
                              <strong>Flyout Color</strong>
                            </h6>
                          </div>
                          <div className="col-auto">
                            <div className={style.vb__sidebar__fixColorPicker}>
                              <ColorPicker
                                setting="flyoutMenuColor"
                                value={flyoutMenuColor}
                                colors={['white', 'gray', 'dark', 'blue']}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {(layoutMenu === 'classic' || layoutMenu === 'flyout') && (
                  <div>
                    <div className="pt-2 mb-2">
                      <div className="row">
                        <div className="col-auto mr-auto">
                          <h6>
                            <strong>Menu Collapsed</strong>
                          </h6>
                        </div>
                        <div className="col-auto">
                          <div className={style.vb__sidebar__fixSwitch}>
                            <Switch
                              checked={isMenuCollapsed}
                              onChange={(value) => changeSetting('isMenuCollapsed', value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 mb-2">
                      <div className="row">
                        <div className="col-auto mr-auto">
                          <h6>
                            <strong>Menu Unfixed</strong>
                          </h6>
                        </div>
                        <div className="col-auto">
                          <div className={style.vb__sidebar__fixSwitch}>
                            <Switch
                              checked={isMenuUnfixed}
                              onChange={(value) => changeSetting('isMenuUnfixed', value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 mb-2">
                      <div className="row">
                        <div className="col-auto mr-auto">
                          <h6>
                            <strong>Menu Shadow</strong>
                          </h6>
                        </div>
                        <div className="col-auto">
                          <div className={style.vb__sidebar__fixSwitch}>
                            <Switch
                              checked={isMenuShadow}
                              onChange={(value) => changeSetting('isMenuShadow', value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {menuLayoutType === 'left' && (
                      <div className="pt-2 mb-2">
                        <h6>
                          <strong>Menu Width</strong>
                        </h6>
                        <div className="pt-1 clearfix">
                          <Slider
                            value={leftMenuWidth}
                            min={256}
                            max={330}
                            onChange={(value) => changeSetting('leftMenuWidth', value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Collapse.Panel>
              <Collapse.Panel header="Topbar Settings" key="4">
                <div className="pt-2 mb-2">
                  <h6>
                    <strong>Topbar Variant</strong>
                  </h6>
                  <Radio.Group
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      const { value } = e.target
                      changeSetting('layoutTopbar', value)
                    }}
                    defaultValue={layoutTopbar}
                  >
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="v1">Variant 1</Radio>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="none">None</Radio>
                        </div>
                      </div>
                    </div>
                  </Radio.Group>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Topbar Separated</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isTopbarSeparated}
                          onChange={(value) => changeSetting('isTopbarSeparated', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Topbar Fixed</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isTopbarFixed}
                          onChange={(value) => changeSetting('isTopbarFixed', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-2">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6>
                        <strong>Topbar Gray Bg</strong>
                      </h6>
                    </div>
                    <div className="col-auto">
                      <div className={style.vb__sidebar__fixSwitch}>
                        <Switch
                          checked={isGrayTopbar}
                          onChange={(value) => changeSetting('isGrayTopbar', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse.Panel>
              <Collapse.Panel header="Breadcrumbs Settings" key="5">
                <div className="pt-2 mb-2">
                  <h6>
                    <strong>Breadcrumbs Variant</strong>
                  </h6>
                  <Radio.Group
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      const { value } = e.target
                      changeSetting('layoutBreadcrumbs', value)
                    }}
                    defaultValue={layoutBreadcrumbs}
                  >
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="v1">Variant 1</Radio>
                        </div>
                        <div className="mb-2">
                          <Radio value="v2">Variant 2</Radio>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="noBreadcrumbs">None</Radio>
                        </div>
                      </div>
                    </div>
                  </Radio.Group>
                </div>
              </Collapse.Panel>
              <Collapse.Panel header="Footer Settings" key="6">
                <div className="pt-2 mb-1">
                  <h6>
                    <strong>Footer Variant</strong>
                  </h6>
                  <Radio.Group
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      const { value } = e.target
                      changeSetting('layoutFooter', value)
                    }}
                    defaultValue={layoutFooter}
                  >
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="v1">Variant 1</Radio>
                        </div>
                        <div className="mb-2">
                          <Radio value="v2">Variant 2</Radio>
                        </div>
                        <div className="mb-2">
                          <Radio value="v3">Variant 3</Radio>
                        </div>
                        <div className="mb-2">
                          <Radio value="v4">Variant 4</Radio>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="noFooter">None</Radio>
                        </div>
                      </div>
                    </div>
                  </Radio.Group>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Sidebar)
