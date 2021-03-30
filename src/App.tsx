import React, { ReactElement, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import FormControl from 'react-bootstrap/esm/FormControl'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import Row from 'react-bootstrap/esm/Row'

import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-github"
import { API, Shortcut } from './types'

// Add ContextBridge typing
declare global {
  interface Window {
    api: API
  }
}

const { api } = window

export default (): ReactElement => {

  const [initialStateLoaded, setInitialStateLoaded] = useState(false)
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([])

  api.handleInitialShortcuts((initialShortcuts: Shortcut[]) => {
      setShortcuts(initialShortcuts)
      setInitialStateLoaded(true)
  })

  useEffect(() => {
    if (initialStateLoaded) {
      api.setShortcuts(shortcuts)
    }
  })

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <h3>Shortcuts</h3>
          {
            initialStateLoaded ? <>
              <Button size="sm" variant="success" onClick={() => setShortcuts([...shortcuts, { name: 'New shortcut', shortcut: '', secrets: '{ "secret": "value" }', action: '// Your code here' }])}>Add</Button>
              {
                shortcuts.map((shortcut, index) => {
                  return <Card className="mt-3" key={index}>
                    <Card.Header>{shortcut.name || 'Untitled Shortcut'}</Card.Header>
                    <Card.Body>
                      <label htmlFor={`name-${index}`}>Name</label>
                      <InputGroup className="mb-3">
                        <FormControl
                          id={`name-${index}`}
                          placeholder="Untitled shortcut"
                          aria-label="Shortcut"
                          value={shortcut.name}
                          onChange={event => setShortcuts([...shortcuts.slice(0, index), { ...shortcut, name: event.target.value }, ...shortcuts.slice(index + 1)])}
                        />
                      </InputGroup>
                      <label htmlFor={`shortcut-${index}`}>Shortcut <small className="text-muted">Using <a href="https://www.electronjs.org/docs/api/accelerator#accelerator">Accelerator</a> syntax</small></label>
                      <InputGroup className="mb-3">
                        <FormControl
                          id={`shortcut-${index}`}
                          placeholder="E.g. Ctrl+Super+Alt+Shift+Q"
                          aria-label="Shortcut"
                          value={shortcut.shortcut}
                          onChange={event => setShortcuts([...shortcuts.slice(0, index), { ...shortcut, shortcut: event.target.value }, ...shortcuts.slice(index + 1)])}
                        />
                      </InputGroup>
                      <label htmlFor={`secrets_editor_${index}`}>Secrets <small className="text-muted">JSON object containing data that are never imported / exported with shortcuts</small></label>
                      <AceEditor
                        name={`secrets_editor_${index}`}
                        className="mb-3"
                        mode="json"
                        theme="github"
                        value={shortcut.secrets}
                        width="100%"
                        height="5rem"
                        tabSize={2}
                        onChange={event => setShortcuts([...shortcuts.slice(0, index), { ...shortcut, action: event }, ...shortcuts.slice(index + 1)])}
                        editorProps={{ $blockScrolling: true }}
                      />
                      <label htmlFor={`action_editor_${index}`}>Action <small className="text-muted">Javascript code: use <code>secrets</code> to retrieve secrets</small></label>
                      <AceEditor
                        name={`action_editor_${index}`}
                        className="mb-3"
                        mode="javascript"
                        theme="github"
                        value={shortcut.action}
                        width="100%"
                        height="10rem"
                        tabSize={2}
                        onChange={event => setShortcuts([...shortcuts.slice(0, index), { ...shortcut, action: event }, ...shortcuts.slice(index + 1)])}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true
                        }}
                      />
                      <Button size="sm" variant="danger" onClick={() => setShortcuts([...shortcuts.slice(0, index), ...shortcuts.slice(index + 1)])}>Delete</Button>
                    </Card.Body>
                  </Card>
                })
              }
            </> : <>Loading...</>
          }
        </Col>
      </Row>
    </Container>
  )
}