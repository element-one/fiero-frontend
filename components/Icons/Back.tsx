import { SvgIcon } from '@type/icon'

export const BackIcon: SvgIcon = ({ width = 48, height = 47 }) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={`stroke-current`}
  >
    <rect
      x='0.5'
      y='0.5'
      width='47'
      height='47'
      rx='23.5'
      stroke='#3E342F'
      strokeOpacity='0.1'
    />
    <path
      d='M17 24H31M17 24L23 30M17 24L23 18'
      stroke='#3E342F'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
