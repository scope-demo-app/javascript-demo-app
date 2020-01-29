import { getHNArticles } from './graphql'

describe('getHNArticles', () => {
  it('fetches all the articles', async () => {
    const {
      hn: {
        topStories: [
          {
            id,
            by: { id: byId },
            title,
          },
        ],
      },
    } = await getHNArticles()
    expect(id).not.toEqual(null)
    expect(byId).not.toEqual(null)
    expect(title).not.toEqual(null)
  })
})
