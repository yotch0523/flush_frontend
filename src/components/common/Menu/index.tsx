import Link from 'next/link'
import Button from '~/components/common/Button'
import { menu } from '~/types/menu'

const Menu = ({ label, pathname, query, onClick }: menu) => {
  if (pathname) {
    return <Link href={{ pathname, query }}>{label}</Link>
  }
  if (onClick) {
    return <Button label={label} onClick={onClick} />
  }
  return null
}

export default Menu
