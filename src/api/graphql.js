import graphql from 'graphql.js'

const graph = graphql('https://www.graphqlhub.com/graphql')

export async function getHNArticles() {
  const result = await graph(`
    {
      hn {
        topStories (limit: 1) {
          id
          by {
            id
          }
          title
        }
      }
    }
  `)()
  return result
}
