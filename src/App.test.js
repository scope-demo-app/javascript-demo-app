import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

describe('app tests', () => {
  it('can navigate through the tabs', () => {
    const { getByText } = render(<App />)

    const tab1 = getByText('Tab 1')
    expect(tab1).toBeInTheDocument()
    fireEvent.click(tab1)

    const panel1 = getByText('Panel 1')
    expect(panel1).toBeVisible()

    const tab2 = getByText('Tab 2')
    expect(tab2).toBeInTheDocument()
    fireEvent.click(tab2)

    const panel2 = getByText('Panel 2')
    expect(panel2).not.toBeVisible()

    const tab3 = getByText('Tab 3')
    expect(tab3).toBeInTheDocument()
    fireEvent.click(tab3)

    const panel3 = getByText('Panel 3')
    expect(panel3).toBeVisible()
  })
})
