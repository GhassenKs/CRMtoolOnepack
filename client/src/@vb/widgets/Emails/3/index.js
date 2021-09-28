import React, { useState, useEffect } from 'react'

const Email = () => {
  const [c, setC] = useState(JSON.parse(localStorage.getItem('c')))

  useEffect(() => {
    setC(JSON.parse(localStorage.getItem('c')))

    return () => {
      localStorage.removeItem('c')
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <div
        style={{
          width: '100%',
          background: '#eceff4',
          padding: '50px 20px',
          color: '#514d6a',
          borderRadius: '5px',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0px auto', fontSize: '14px' }}>
          <div style={{ padding: '40px 40px 20px 40px', background: '#fff' }}>
            <table cellPadding="0" cellSpacing="0" style={{ width: '100%', border: '0px' }}>
              <tbody>
                <tr>
                  <td>
                    <h2
                      style={{
                        marginBottom: '20px',
                        color: '#24222f',
                        fontWeight: '600',
                      }}
                    >
                      {c.name}
                    </h2>
                    <p>
                      Client : <span style={{ color: '#a09bb9' }}>{c.client.name}</span>
                    </p>
                    <p>
                      Responsable : <span style={{ color: '#a09bb9' }}>{c.responsable.name}</span>
                    </p>
                    <p>
                      Date :{' '}
                      <span style={{ color: '#a09bb9' }}>{c.dateOfCreation.substring(0, 10)}</span>
                    </p>
                    <p>
                      Deadline :{' '}
                      <span style={{ color: '#a09bb9' }}>{c.deadline.substring(0, 10)}</span>
                    </p>
                    <br />
                    <table cellPadding="0" cellSpacing="0" style={{ width: '100%', border: '0px' }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: 'left',
                              padding: '10px 10px 10px 0px',
                              borderTop: '3px solid #514d6a',
                            }}
                          >
                            {c.items.description}
                          </td>
                          <td
                            style={{
                              width: '10%',
                              textAlign: 'center',
                              padding: '10px 10px',
                              borderTop: '3px solid #514d6a',
                            }}
                          />
                          <td
                            style={{
                              width: '20%',
                              textAlign: 'right',
                              padding: '10px 0px 10px 10px',
                              whiteSpace: 'nowrap',
                              borderTop: '3px solid #514d6a',
                            }}
                          />
                        </tr>

                        <tr>
                          <td
                            style={{
                              textAlign: 'left',
                              padding: '10px 10px 10px 0px',
                              borderTop: '3px solid #514d6a',
                            }}
                          >
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total</span>
                          </td>
                          <td
                            style={{
                              width: '10%',
                              textAlign: 'center',
                              padding: '10px 10px',
                              borderTop: '3px solid #514d6a',
                            }}
                          />
                          <td
                            style={{
                              width: '20%',
                              textAlign: 'right',
                              padding: '10px 0px 10px 10px',
                              whiteSpace: 'nowrap',
                              borderTop: '3px solid #514d6a',
                            }}
                          >
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                              {c.items.price} DT
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Email
