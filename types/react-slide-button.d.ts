declare module 'react-slide-button' {
  import * as React from 'react'

  export interface ButtonProps {
    mainText: string | React.ReactElement
    classList: string
    caretClassList: string
    overlayClassList: string
    customCaretWidth: number
    caret: any // eslint-disable-line
    overlayText: string
    onSlideDone: () => void
  }
  export default class SlideButton extends React.Component<ButtonProps, any> {} //eslint-disable-line
}
