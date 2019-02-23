const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const project = path.resolve('./src/templates/project.js')
    const job = path.resolve('./src/templates/job.js')
    resolve(
      graphql(
        `
          {
            allContentfulProject {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulJob {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const jobs = result.data.allContentfulJob.edges
        const projects = result.data.allContentfulProject.edges
        projects.forEach(el => {
          createPage({
            path: `/projects/${el.node.slug}/`,
            component: project,
            context: {
              slug: el.node.slug,
            },
          })
        })
        jobs.forEach(el => {
          createPage({
            path: `/jobs/${el.node.slug}/`,
            component: job,
            context: {
              slug: el.node.slug,
            },
          })
        })
      })
    )
  })
}
