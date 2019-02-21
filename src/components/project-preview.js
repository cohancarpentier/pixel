import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

export default ({ project }) => (
  <Link to={`/projects/${project.slug}`}>
    <Img alt="" fluid={project.heroImage.fluid} />
    {/*<h3>{project.title}</h3>*/}
  </Link>
)
