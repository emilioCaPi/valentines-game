type IMessageSeverity = 'success' | 'error'

export interface IMessageProtocol {
  severity?: IMessageSeverity
  content: string
}

export interface IMessageProps {
  protocol: IMessageProtocol
}
