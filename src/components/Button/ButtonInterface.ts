export interface IButtonProtocol {
  text: string
  disabled?: boolean
  color?: 'primary' | 'outline'
  loading?: boolean
}

export interface IButtonProps {
  protocol: IButtonProtocol
}
