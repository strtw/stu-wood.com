/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Stu Wood - Front-end Engineer | San Diego, CA",
    titleTemplate: "%s | Stu Wood",
    description:
      "I design and build modern web applications using React.js, and am an experienced marketing & digital analytics developer",
    siteUrl: "https://www.stu-wood.com",
    image: "/preview-image.png",
    twitterUsername: "@stuart_wood",
    author: "@stuart_wood",
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/accordion.gif`, // This path is relative to the root of the site.
      },
    },
  ],
}