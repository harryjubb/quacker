import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

const api = (window as any).api

export default function App() {

  const [shortcuts, setShortcuts] = useState([])

  useEffect(() => {
    if (api.shortcutRefresh) {
      api.shortcutRefresh(shortcuts)
    } else {
      console.log('no shortcutRefresh')
    }
  })

  return (
    <Container>
      <Row>
        <Col>
          <h3>Shortcuts</h3>
          <Button size="sm" variant="success" onClick={() => setShortcuts([...shortcuts, { shortcut: '', action: '' }])}>Add</Button>
          {
            shortcuts.map((shortcut, index) => {
              return <div key={index}>
                <input
                  value={shortcut.shortcut}
                  onChange={event => setShortcuts([...shortcuts.slice(0, index), { shortcut: event.target.value, action: 'none' }, ...shortcuts.slice(index + 1)])}
                />
                <input
                  value={shortcut.action}
                  onChange={event => setShortcuts([...shortcuts.slice(0, index), { shortcut: shortcut.shortcut, action: event.target.value }, ...shortcuts.slice(index + 1)])}
                />
              </div>
            })
          }
        </Col>
      </Row>
    </Container>
  )
}