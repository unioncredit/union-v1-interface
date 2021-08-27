import { Component } from "react";

/**
 * @name ErrorBoundary
 * @description https://reactjs.org/docs/concurrent-mode-suspense.html#handling-errors
 */
class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;

    return this.props.children;
  }
}

export default ErrorBoundary;
