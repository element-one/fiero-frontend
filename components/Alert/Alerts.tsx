type AlertColors = 'info' | 'error' | 'success' | 'warning'
type AlertSizes = 'medium' | 'large' | 'xl' | '2xl'

type AlertMessage = {
  type: AlertColors
  size?: AlertSizes
  message: string
  withIcon?: boolean
}

export const Alert = ({
  type = 'info',
  message,
  withIcon = false,
  size = 'medium',
}: AlertMessage) => {
  const color =
    type === 'info'
      ? 'text-blue-700'
      : type === 'error'
      ? 'text-red-700'
      : type === 'success'
      ? 'text-green-700'
      : 'text-yellow-700'
  const iconSize =
    size === 'medium'
      ? 'w-5 h-5'
      : size === 'large'
      ? 'w-6 h-6'
      : size === 'xl'
      ? 'w-7 h-7'
      : 'w-8 h-8'
  const textSize =
    size === 'medium'
      ? 'text-base'
      : size === 'large'
      ? 'text-lg'
      : size === 'xl'
      ? 'text-xl'
      : 'text-2xl'
  const bgColor =
    type === 'info'
      ? 'bg-blue-100'
      : type === 'error'
      ? 'bg-red-100'
      : type === 'success'
      ? 'bg-green-100'
      : 'bg-primary-400'
  return (
    <div
      role='alert'
      className={`mb-4 flex items-center gap-x-3 p-4 ${color} ${bgColor} rounded-lg`}
    >
      {withIcon && (
        <svg
          aria-hidden='true'
          className={`inline ${iconSize} flex-shrink-0`}
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
            clipRule='evenodd'
          ></path>
        </svg>
      )}
      <div className={`flex-1 ${textSize}`}>{message}</div>
    </div>
  )
}
