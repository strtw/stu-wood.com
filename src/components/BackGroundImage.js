import React from 'react'
import styled from 'styled-components'

// Image in static/ is served at root in Gatsby
const StyledBackgroundSection = styled.div`
  background-color: #040e18;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.45)
    ),
    url('/sunset-cliffs-d2.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
  width: 100%;
`

export default StyledBackgroundSection
