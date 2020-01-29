import React from 'react'
import './App.css'
import { useTabState, Tab, TabList, TabPanel } from 'reakit/Tab'

function App() {
  const tab = useTabState()
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab} stopId="tab1" className="tab1">
          Tab 1
        </Tab>
        <Tab {...tab} stopId="tab2" disabled>
          Tab 2
        </Tab>
        <Tab {...tab} stopId="tab3">
          Tab 3
        </Tab>
      </TabList>
      <TabPanel {...tab} stopId="tab1">
        Panel 1
      </TabPanel>
      <TabPanel {...tab} stopId="tab2">
        Panel 2
      </TabPanel>
      <TabPanel {...tab} stopId="tab3">
        Panel 3
      </TabPanel>
    </>
  )
}

export default App
