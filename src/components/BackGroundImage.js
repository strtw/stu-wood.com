import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const IMG_SRC = '/sunset-cliffs-d2.jpg'

const StyledBackgroundSection = styled.div`
  background-color: #040e18;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
  width: 100%;
  transition: opacity 0.2s ease-out;
  ${props => props.$loaded && `
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.2)
      ),
      url('${IMG_SRC}');
  `}
`

export default function BackGroundImage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.src = IMG_SRC
  }, [])

  return (
    <>
      <StyledBackgroundSection $loaded={loaded} />
    </>
  )
}
