import React from 'react'
import { render } from '@testing-library/react'

import RestaurantCard from './RestaurantCard'

describe('demotest', () => {
  it('can show code path', () => {
    const { queryByText } = render(<RestaurantCard />)
    expect(queryByText('Card')).toBeNull()
  })
})
