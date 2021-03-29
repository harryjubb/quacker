import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import FormControl from 'react-bootstrap/esm/FormControl'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import Row from 'react-bootstrap/esm/Row'

import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-github"

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
              return <Card  className="mt-3" key={index}>
                <Card.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Shortcut"
                    aria-label="Shortcut"
                    value={shortcut.shortcut}
                    onChange={event => setShortcuts([...shortcuts.slice(0, index), { shortcut: event.target.value, action: 'none' }, ...shortcuts.slice(index + 1)])}
                  />
                </InputGroup>
                <AceEditor
                  mode="javascript"
                  theme="github"
                  value={shortcut.action}
                  onChange={event => setShortcuts([...shortcuts.slice(0, index), { shortcut: shortcut.shortcut, action: event }, ...shortcuts.slice(index + 1)])}
                  name={`editor_${index}`}
                  editorProps={{ $blockScrolling: true }}
                />,
                </Card.Body>
              </Card>
            })
          }
        </Col>
      </Row>
    </Container>
  )
}