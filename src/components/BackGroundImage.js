import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

//import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "sunset-cliffs-d2.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid
      return (
        // <BackgroundImage
        //   Tag="section"
        //   className={className}
        //   fluid={imageData}
        //   backgroundColor={`#040e18`}
        // >
        // </BackgroundImage>
        true
      )
    }}
  />
)

const StyledBackgroundSection = styled(BackgroundSection)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height:500px;
`

export default StyledBackgroundSection