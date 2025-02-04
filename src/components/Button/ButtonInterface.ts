export interface IButtonProtocol {
  text: string
  disabled?: boolean
  color?: 'primary' | 'outline'
  loading?: boolean
  hidden?: boolean
}

export interface IButtonProps {
  protocol: IButtonProtocol
}
