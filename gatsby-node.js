const Promise = require('bluebird')
const path = require('path')
const locales = require('./src/constants/locales')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const service = path.resolve('./src/templates/service.js')
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
            allContentfulService {
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
        const services = result.data.allContentfulService.edges
        projects.forEach(el => {
          createPage({
            path: `/projects/${el.node.slug}/`,
            component: project,
            context: {
              slug: el.node.slug,
              locale: 'fr',
            },
          })
        })
        projects.forEach(el => {
          createPage({
            path: `/en/projects/${el.node.slug}/`,
            component: project,
            context: {
              slug: el.node.slug,
              locale: 'en',
            },
          })
        })
        jobs.forEach(el => {
          createPage({
            path: `/jobs/${el.node.slug}/`,
            component: job,
            context: {
              slug: el.node.slug,
              locale: 'fr',
            },
          })
        })
        jobs.forEach(el => {
          createPage({
            path: `/en/jobs/${el.node.slug}/`,
            component: job,
            context: {
              slug: el.node.slug,
              locale: 'en',
            },
          })
        })
        services.forEach(el => {
          createPage({
            path: `/services/${el.node.slug}/`,
            component: service,
            context: {
              slug: el.node.slug,
              locale: 'fr',
            },
          })
        })
        services.forEach(el => {
          createPage({
            path: `/en/services/${el.node.slug}/`,
            component: service,
            context: {
              slug: el.node.slug,
              locale: 'en',
            },
          })
        })
      })
    )
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
        },
      })
    })

    resolve()
  })
}
