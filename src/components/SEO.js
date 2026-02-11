import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const DEFAULT_METADATA = {
  defaultTitle: "Stu Wood - Front-end Engineer | San Diego, CA",
  titleTemplate: "%s | Stu Wood",
  defaultDescription:
    "I design and build modern web applications using React.js, and am an experienced marketing & digital analytics developer",
  siteUrl: "https://www.stu-wood.com",
  defaultImage: "/preview-image.png",
  twitterUsername: "@stuart_wood",
}

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const data = useStaticQuery(graphql`
    query StuWoodSEOMetadata {
      site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl
          defaultImage: image
          twitterUsername
        }
      }
    }
  `)
  const metadata = data?.site?.siteMetadata || DEFAULT_METADATA

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = metadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: siteUrl ? `${siteUrl}${image || defaultImage}` : (image || defaultImage),
    url: siteUrl ? `${siteUrl}${pathname}` : pathname,
  }

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}
