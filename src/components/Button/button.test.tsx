import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from './button'

test('button text', () => {
    render(<Button>hello</Button>)
    let element = screen.getByText('hello');
    expect(element).toBeInTheDocument()
})