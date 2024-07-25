import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import TodoList from '../components/TodoList';

test('todo list title renders correctly', () => {
  render(<TodoList />);
  const titleElement = screen.getByText('Our Todo List');
  expect(titleElement).toBeInTheDocument();
});

test('todo list input and button render correctly', () => {
  // arrange/act/assert
  render(<TodoList />);
  const inputElement = screen.getByLabelText('New Todo');
  const buttonElement = screen.getByText('Add Todo');
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('todo is added successfully', () => {
  render(<TodoList />);
  const inputElement = screen.getByLabelText('New Todo');
  const buttonElement = screen.getByText('Add Todo');
  const listElement = screen.getByTestId('todo-item-list');
  const EXPECTED_STRING = 'Learn Testing in Javascript';
  // let's add the the string to our input element
  fireEvent.change(inputElement, {
    target: { value: EXPECTED_STRING },
  });
  // let's
  expect(inputElement.value).toBe(EXPECTED_STRING);

  // act needs to be called when you update the state of the application.
  // this is going to change the state of the allTodos in the component.
  act(() => {
    buttonElement.click();
  });
  // the vlaue
  expect(inputElement.value).toBe('');
  expect(listElement).toHaveTextContent(EXPECTED_STRING);
});
