import React from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer'
export default class extends React.Component<IMovieState> {
  componentDidMount(): void {
    console.log('this.props',this.props)
  }
  render() {
    return (
      <h1>213123</h1>
    )
  }
}