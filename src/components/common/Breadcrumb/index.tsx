import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

const Breadcrumb = () => {
  const [links, setLinks] = useState<string[]>([])
  useMemo(() => {
    void (() => {
      const items = location.pathname
        .slice(1)
        .split('/')
        .reduce((acc: string[], curr) => {
          if (acc.length === 0) return [curr]
          return [...acc, [...acc, curr].join('/')]
        }, [])
      items.unshift('')
      setLinks(items.filter((x) => x !== location.pathname).slice(0, -1))
    })()
  }, [])
  return (
    <StyledContainer>
      {links.map((link, index) => {
        return (
          <>
            <Link href={`/${link}`} key={`breadcrumb-link-${index}`}>
              link-{index}
            </Link>
            <IoIosArrowForward />
          </>
        )
      })}
    </StyledContainer>
  )
}

// style
const StyledContainer = styled.section`
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > * {
    margin-right: 6px;
  }
`

export default Breadcrumb
