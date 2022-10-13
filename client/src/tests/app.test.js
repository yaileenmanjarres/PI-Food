import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import Cover from '../components/pages/cover/cover'
import Views from '../components/views/views'
import store from '../redux/store/store';
import { Provider } from 'react-redux';

test('Testing Cover', async () => {
  // ARRANGE
  render(
    <Router>
      <Cover />
    </Router>
  )

  // ASSERT
  expect(screen.getByTestId('cover')).toBeInTheDocument()
})

test('Testing Views', async () => {
  // ARRANGE
  const mockHandlePagination = jest.fn()

  render (
    <Provider store={store}> 
      <Views currentPage={1} handlePagination={mockHandlePagination}/>
    </Provider>
  )

  // ASSERT
  expect(screen.getByTestId('views')).toBeInTheDocument()
  expect(mockHandlePagination).toHaveBeenCalled()
})
