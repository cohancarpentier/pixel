import React from 'react'
import Img from 'gatsby-image'
import LocalizedLink from './LocalizedLink'

export default ({ project }) => (
  <LocalizedLink to={`/projects/${project.slug}`}>
    <Img alt="" fluid={project.heroImage.fluid} />
    {/*<h3>{project.title}</h3>*/}
  </LocalizedLink>
)
