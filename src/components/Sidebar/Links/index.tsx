import { BsGraphUp } from '@react-icons/all-files/bs/BsGraphUp'
import { CgCardHearts } from '@react-icons/all-files/cg/CgCardHearts'
import { FaLayerGroup } from '@react-icons/all-files/fa/FaLayerGroup'
import Link from 'next/link'
import styled from 'styled-components'
import { ui } from '~/consts/ui'

type Props = {
  backgroundColor?: string
  color?: string
}

type Link = {
  label: string
  href: string
  icon: IconType
  isActive: boolean
}

enum IconType {
  Card = 'card',
  Course = 'course',
  History = 'history',
}

const renderIcon = (icon: IconType) => {
  switch (icon) {
    case IconType.Card:
      return <CgCardHearts />
    case IconType.Course:
      return <FaLayerGroup />
    case IconType.History:
      return <BsGraphUp />
    default:
      return null
  }
}

const links: { [key: string]: Link[] } = {
  contents: [
    {
      label: 'カード管理',
      href: '/cards',
      icon: IconType.Card,
      isActive: true,
    },
    {
      label: 'グループ管理',
      href: '/courses',
      icon: IconType.Course,
      isActive: true,
    },
  ],
  history: [
    {
      label: '学習管理',
      href: '/histories',
      icon: IconType.History,
      isActive: true,
    },
  ],
}

const Links = ({ backgroundColor, color }: Props) => {
  return (
    <StyledMenu backgroundColor={backgroundColor} color={color}>
      <ul>
        {Object.keys(links).map((category, index) => {
          let categoryLabel = ''

          switch (category) {
            case 'contents':
              categoryLabel = 'コンテンツ管理'
              break
            case 'history':
              categoryLabel = '学習状況管理'
              break
            default:
              categoryLabel = ''
          }

          return (
            <>
              <StyledDivider key={`category-${category}-${index}`} color={color}>
                <div>{categoryLabel}</div>
              </StyledDivider>

              {links[category].map(({ label, href, icon, isActive }, i) => {
                if (isActive) {
                  return (
                    <li key={`menu-link-${i}`}>
                      <Link href={href}>
                        {renderIcon(icon)}
                        <span>{label}</span>
                      </Link>
                    </li>
                  )
                } else {
                  return null
                }
              })}
            </>
          )
        })}
      </ul>
    </StyledMenu>
  )
}

// style
const indent = 16 // px
const StyledMenu = styled.menu<{ backgroundColor?: string; color?: string }>`
  ${({ backgroundColor }) => `background-color: ${backgroundColor ?? ui.backgroundColor.main};`}
  & ul li a {
    padding: 8px ${indent * 2}px;
    display: flex;
    align-items: center;

    & > * {
      ${({ color }) => `color: ${color ?? ui.color.white}`};
    }

    & > svg {
      margin-right: 10px;
      ${({ color }) => `fill: ${color ?? ui.color.white}`};
      & > * {
        ${({ color }) => `fill: ${color ?? ui.color.white}`};
      }
    }
  }
`

const StyledDivider = styled.li<{ color?: string }>`
  & div {
    margin: 16px ${indent}px 0;
    ${({ color }) => `border-bottom: 1px solid ${color ?? ui.color.white};
    color: ${color ?? 'initial'};`}
    padding: 0 0 4px;
    font-weight: bold;
  }
`

export default Links
