import ClickCounter from './components/ClickCounter';
import { Hello } from './components/Hello';
import { DatePicker } from 'antd';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <h4>Hello from app</h4>
      <ClickCounter />
      <DatePicker />
      <Hello />
    </ErrorBoundary>
  );
}
