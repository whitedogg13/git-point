import gql from 'graphql-tag';

export const getRepositoryQuery = (owner, name) => gql`
  {
    repository(owner: ${owner}, name: ${name}) {
      description
      primaryLanguage {
        name
        color
      }
      owner {
        avatarUrl
        login
      }
      releases {
        totalCount
      }
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      # Contributors:
      mentionableUsers(first: 100) {
        edges {
          node {
            avatarUrl
            login
          }
        }
      }
      openIssues: issues(first: 3, states: OPEN) {
        totalCount
        edges {
          node {
            title
          }
        }
      }
      closedIssues: issues(first: 3, states: CLOSED) {
        totalCount
        edges {
          node {
            title
          }
        }
      }
      openPullRequests: pullRequests(first: 3, states: OPEN) {
        totalCount
        edges {
          node {
            title
          }
        }
      }
      closedPullRequests: pullRequests(first: 3, states: [CLOSED, MERGED]) {
        totalCount
        edges {
          node {
            title
          }
        }
      }
    }
  }
`;
