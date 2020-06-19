import variable from '@/scss/var.scss'

export default function (px) {
  return `${px / +variable.baseFontSize}rem`
}
