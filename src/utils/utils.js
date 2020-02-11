import { parseISO, differenceInMilliseconds, getTime } from 'date-fns'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import maxBy from 'lodash/maxBy'
import lt from 'semver/functions/lt'

export function getEventLevel(eventFieldsMap) {
  if (!eventFieldsMap) {
    return 'NOTSET'
  }
  const logLevel = eventFieldsMap['log.level']
  if (logLevel) {
    return logLevel
  }
  const eventField = eventFieldsMap.event
  if (eventField) {
    if (typeof eventField === 'string' && eventField.toLowerCase() === 'test_failure') {
      return 'FAIL'
    }
    return eventField
  }
  return 'NOTSET'
}

export const fromConnectionToArray = connection => {
  if (!connection || !connection.edges) {
    return []
  }
  return connection.edges.map(({ node }) => node)
}

export const isConnectionField = field =>
  isObject(field) && 'edges' in field && Array.isArray(field.edges)

export const isObject = value =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

export const flattenNode = node => {
  function flatten(node) {
    if (isObject(node)) {
      return Object.entries(node).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: flatten(isConnectionField(value) ? fromConnectionToArray(value) : value),
        }),
        {}
      )
    }
    if (Array.isArray(node)) {
      return node.map(element => flatten(element))
    }
    return node
  }
  return flatten(node)
}

export const sortBranches = defaultBranch => (branchA, branchB) => {
  // Always show the default branch on top
  if (defaultBranch === branchA.name) {
    return -1
  }
  if (defaultBranch === branchB.name) {
    return 1
  }
  return differenceInMilliseconds(
    parseISO(get(branchB, 'commit.authorTime')),
    parseISO(get(branchA, 'commit.authorTime'))
  )
}

export const sortTags = (tagA, tagB) => {
  try {
    if (lt(tagA.name, tagB.name)) {
      return 1
    }
    return -1
  } catch {
    return 1
  }
}

export function removeNamespace(namespaceName, repoName) {
  if (!repoName || !namespaceName) {
    return repoName
  }
  if (!repoName.startsWith(`${namespaceName}/`)) {
    return repoName
  }
  return repoName.replace(`${namespaceName}/`, '').trim()
}

export function getSourceRootFromAgent(agent) {
  const agentTags = get(agent, 'tags', [])
  if (!agentTags || !agentTags.length) {
    return ''
  }
  const sourceRoot = agentTags.find(tag => tag.key === 'source.root')

  if (sourceRoot && sourceRoot.value) {
    try {
      return JSON.parse(sourceRoot.value)
    } catch {
      return sourceRoot.value
    }
  }

  return ''
}

export function getRepoBaseURLFromAgent(agent) {
  const repoUrl = get(agent, 'commit.repository.htmlUrl', '')
  const commitHash = get(agent, 'commit.hash', '')
  if (!repoUrl || !commitHash) {
    return ''
  }
  return `${repoUrl}/blob/${commitHash}`
}

export function parseFields(fields) {
  if (isEmpty(fields)) {
    return []
  }
  return fields.map(({ key, value }) => ({
    key,
    value: JSON.parse(value),
  }))
}

export function mapFields(fields) {
  if (isEmpty(fields)) {
    return {}
  }
  return fields.reduce((hash, { key, value }) => {
    try {
      hash[key] = JSON.parse(value)
    } catch {
      hash[key] = value
    }
    return hash
  }, {})
}

export const createTagGetter = tags => {
  const tagValuesByKey = Object.fromEntries(parseFields(tags).map(({ key, value }) => [key, value]))
  return key => tagValuesByKey[key] || ''
}

export function getBranchStatus(inputServiceName, statusByService) {
  if (!statusByService || !statusByService.length) {
    return 'UNKNOWN'
  }

  const serviceStatus = statusByService.find(({ serviceName }) => serviceName === inputServiceName)
  return get(serviceStatus, 'status', 'UNKNOWN')
}

const ISO_8601_REGEX = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$/
const DECIMALS_TO_MILLISECONDS = 3

export function getDateMicroseconds(dateString) {
  const valueToPosition = {
    year: 1,
    month: 2,
    day: 3,
    hour: 4,
    minutes: 5,
    seconds: 6,
    decimals: 7,
  }
  const match = dateString.match(ISO_8601_REGEX)
  if (!match || match.length < 8) {
    return 0
  }
  let decimalsSmallerThanMilliseconds = '0'
  if (match[valueToPosition['decimals']]) {
    decimalsSmallerThanMilliseconds = match[valueToPosition['decimals']].slice(
      DECIMALS_TO_MILLISECONDS + 1
    )
  }

  return getTime(parseISO(dateString)) * 1000 + parseInt(decimalsSmallerThanMilliseconds)
}

export function getSpanTiming(spanId, spans) {
  if (isEmpty(spans)) {
    return {
      totalTime: null,
      selfTime: null,
    }
  }
  const span = spans.find(({ id }) => id === spanId)
  if (!span || !span.duration) {
    return {
      totalTime: null,
      selfTime: null,
    }
  }
  const latestSpan = maxBy(spans, 'finish')
  if (!latestSpan) {
    return {
      totalTime: null,
      selfTime: null,
    }
  }
  const { finish: totalDuration } = latestSpan
  if (!totalDuration) {
    return {
      totalTime: null,
      selfTime: null,
    }
  }
  const immediateChildren = spans.filter(({ parentId }) => parentId === spanId)
  if (immediateChildren.length === 0) {
    return {
      totalTime: span.duration / totalDuration,
      selfTime: 1,
    }
  }
  const childrenDuration = immediateChildren.reduce(
    (durationAcc, { duration }) => durationAcc + (duration || 0),
    0
  )
  return {
    totalTime: span.duration / totalDuration,
    selfTime: (span.duration - childrenDuration) / span.duration,
  }
}

export function formatNumEvents(numEvents) {
  const eventsString = numEvents === 1 ? 'event' : 'events'
  return `Showing ${numEvents} ${eventsString}`
}

const COMPILED_GENERATED_FILE = '<compiler-generated>'

export function shouldShowStackTrace(frame) {
  return (
    frame && (frame.file || frame.fileName) && frame.file !== COMPILED_GENERATED_FILE && frame.line
  )
}
export function getThreadsDropdownOptions(threads) {
  if (!threads) {
    return []
  }
  return threads.map(({ name, crashed: featured }, index) => ({
    name: `Thread ${index}` + (name ? ` - ${name}` : ''),
    featured,
  }))
}

export const orderByFavorite = (favorites, getItemId = item => item.id) => (itemA, itemB) => {
  const indexA = favorites.indexOf(getItemId(itemA))
  const indexB = favorites.indexOf(getItemId(itemB))
  const isAFavorite = indexA !== -1
  const isBFavorite = indexB !== -1

  if (isAFavorite && isBFavorite) {
    // Higher index (most recently favorited) will go last
    return indexA - indexB
  }
  if (isAFavorite) {
    return -1
  }
  if (isBFavorite) {
    return 1
  }
  return 0
}

// Regex for checking strings of the type of 1ms, 1μs, 0.92s, etc.
const INPUT_TYPE_REGEX = /^([\d.]+)(m|s|ms|us|μs|ns)?$/

export function getNanosecondsFromString(timeString) {
  if (!INPUT_TYPE_REGEX.test(timeString)) {
    return null
  }
  const [, value, units = 'ms'] = timeString.match(INPUT_TYPE_REGEX)

  const numericValue = Number(value)

  switch (units) {
    case 'm':
      return numericValue * 60 * 1e9
    case 's':
      return numericValue * 1e9
    case 'ms':
      return numericValue * 1e6
    case 'μs':
    case 'us':
      return numericValue * 1e3
    case 'ns':
      return numericValue
    default:
      return null
  }
}

export const pickBy = (object, predicate = i => i) =>
  Object.entries(object)
    .filter(([, value]) => predicate(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

export const getCommitTags = commit => {
  if (!commit || !commit.withinTags) {
    return []
  }
  return [...commit.withinTags]
    .sort((a, b) =>
      differenceInMilliseconds(parseISO(b.commit.commitTime), parseISO(a.commit.commitTime))
    )
    .map(tag => tag.name)
}

export const areAgentsWithSameServiceName = itemsWithAgents =>
  itemsWithAgents.length < 2 ||
  itemsWithAgents.every(
    item => get(item, 'agent.service') === get(itemsWithAgents, '[0].agent.service')
  )
