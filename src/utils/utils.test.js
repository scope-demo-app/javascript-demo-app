import {
  removeNamespace,
  getSourceRootFromAgent,
  getRepoBaseURLFromAgent,
  getBranchStatus,
  getSpanTiming,
  getNanosecondsFromString,
  flattenNode,
  areAgentsWithSameServiceName,
  getEventLevel,
} from './utils'

export const MILLISECONDS_IN_SECOND = 1000
export const SECONDS_IN_MINUTE = 60
export const MINUTES_IN_HOUR = 60
export const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND
export const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND

describe('utils', () => {
  describe('removeNamespace', () => {
    test('it removes the namespace successfully', () => {
      const namespaceName = 'namespace'
      const repoName = 'namespace/repo-name'
      const result = removeNamespace(namespaceName, repoName)
      expect(result).toBe('repo-name')
    })
    test('it does not remove the namespace if it does not find it', () => {
      const namespaceName = 'namespaceNotHere'
      const repoName = 'namespace/repo-name'
      const result = removeNamespace(namespaceName, repoName)
      expect(result).toBe(repoName)
    })
    test('it does not crash with bad input and returns repoName untouched', () => {
      const namespaceName = undefined
      const repoName = null
      const result = removeNamespace(namespaceName, repoName)
      expect(result).toBe(repoName)
    })
    test('it only acts on the beginning of the repo name', () => {
      const namespaceName = 'common-string'
      const repoName = 'repo-with-common-string'
      const result = removeNamespace(namespaceName, repoName)
      expect(result).toBe(repoName)
    })
  })
  describe('getSourceRootFromAgent', () => {
    test('it gets the source root from the agent', () => {
      const agent = {
        tags: [
          {
            key: 'source.root',
            value: JSON.stringify('sourceRootValue'),
          },
        ],
      }
      const result = getSourceRootFromAgent(agent)
      expect(result).toEqual('sourceRootValue')
    })
    test('it returns an empty string if there is no source root', () => {
      const agent = {
        tags: [
          {
            key: 'not.source.root',
            value: JSON.stringify('sourceRootValue'),
          },
        ],
      }
      const result = getSourceRootFromAgent(agent)
      expect(result).toEqual('')
    })
    test('it returns an empty string if input is invalid', () => {
      const badagent1 = {}
      const badagent2 = {
        tags: null,
      }
      const badagent3 = {
        tags: {},
      }
      const badagent4 = []
      const badagent5 = undefined
      let result = getSourceRootFromAgent(badagent1)
      expect(result).toEqual('')
      result = getSourceRootFromAgent(badagent2)
      expect(result).toEqual('')
      result = getSourceRootFromAgent(badagent3)
      expect(result).toEqual('')
      result = getSourceRootFromAgent(badagent4)
      expect(result).toEqual('')
      result = getSourceRootFromAgent(badagent5)
      expect(result).toEqual('')
    })
  })
  describe('getRepoBaseURLFromAgent', () => {
    test('it gets the repo base url from the agent', () => {
      const agent = {
        commit: {
          hash: 'hash',
          repository: {
            htmlUrl: 'http://github.com',
          },
        },
      }
      const result = getRepoBaseURLFromAgent(agent)
      expect(result).toEqual('http://github.com/blob/hash')
    })
    test('it returns an empty string if invalid data is input', () => {
      const badAgent1 = {
        commit: null,
      }
      const badAgent2 = {
        commit: {
          repository: {
            htmlUrl: 'http://github.com',
          },
        },
      }
      const badAgent3 = {
        commit: {
          hash: 'hash',
        },
      }
      const badAgent4 = {
        commit: {
          hash: 'hash',
          repository: null,
        },
      }
      let result = getRepoBaseURLFromAgent(badAgent1)
      expect(result).toEqual('')
      result = getRepoBaseURLFromAgent(badAgent2)
      expect(result).toEqual('')
      result = getRepoBaseURLFromAgent(badAgent3)
      expect(result).toEqual('')
      result = getRepoBaseURLFromAgent(badAgent4)
      expect(result).toEqual('')
    })
  })
  describe('getBranchStatus', () => {
    test('it returns the status correctly', () => {
      const serviceName = 'frontend'
      const statusByService = [
        {
          status: 'FAIL',
          serviceName,
        },
        {
          status: 'FAIL',
          serviceName: 'otherServiceName',
        },
      ]
      const result = getBranchStatus(serviceName, statusByService)
      expect(result).toBe('FAIL')
    })
    test('it returns unknown if the service is not found', () => {
      const serviceName = 'unknownService'
      const statusByService = [
        {
          status: 'FAIL',
          serviceName: 'frontend',
        },
        {
          status: 'FAIL',
          serviceName: 'otherServiceName',
        },
      ]
      const result = getBranchStatus(serviceName, statusByService)
      expect(result).toBe('UNKNOWN')
    })
    test('it returns unknown if statusByService is empty', () => {
      const serviceName = 'someService'
      const statusByService = []
      const result = getBranchStatus(serviceName, statusByService)
      expect(result).toBe('UNKNOWN')
    })
    test('it returns unknown if statusByService is null or undefined', () => {
      const serviceName = 'someService'
      const nullStatusByService = null
      const resultNull = getBranchStatus(serviceName, nullStatusByService)
      expect(resultNull).toBe('UNKNOWN')
      const undefinedStatusByService = undefined
      const resultUndefined = getBranchStatus(serviceName, undefinedStatusByService)
      expect(resultUndefined).toBe('UNKNOWN')
    })
    test('it returns unknown if input data is invalid', () => {
      const serviceName = {}
      const statusByService = [
        {
          status: 'FAIL',
          serviceName: 'frontend',
        },
        {
          status: 'FAIL',
          serviceName: 'otherServiceName',
        },
      ]
      const resultNull = getBranchStatus(serviceName, statusByService)
      expect(resultNull).toBe('UNKNOWN')
    })
  })
  describe('getSpanTiming', () => {
    test('it returns correct timing information', () => {
      const spans = [
        {
          id: 'spanId',
          parentId: null,
          finish: 10,
          duration: 10,
        },
        {
          id: 'childId',
          parentId: 'spanId',
          finish: 8,
          duration: 5,
        },
        {
          id: 'child2Id',
          parentId: 'childId',
          finish: 7,
          duration: 3,
        },
      ]
      const timingSpanId = getSpanTiming('spanId', spans)
      expect(timingSpanId.selfTime).toEqual(0.5)
      expect(timingSpanId.totalTime).toEqual(1)
      const timingChildId = getSpanTiming('childId', spans)
      expect(timingChildId.selfTime).toEqual(0.4)
      expect(timingChildId.totalTime).toEqual(0.5)
      const timingChild2Id = getSpanTiming('child2Id', spans)
      expect(timingChild2Id.selfTime).toEqual(1)
      expect(timingChild2Id.totalTime).toEqual(0.3)
    })
    test('it returns null if the span id is not found', () => {
      const spans = [
        {
          id: 'spanId',
          parentId: null,
          finish: 10,
          duration: 10,
        },
        {
          id: 'childId',
          parentId: 'spanId',
          finish: 8,
          duration: 5,
        },
        {
          id: 'child2Id',
          parentId: 'childId',
          finish: 7,
          duration: 3,
        },
      ]
      const timingUnknownSpan = getSpanTiming('unknown', spans)
      expect(timingUnknownSpan.selfTime).toEqual(null)
      expect(timingUnknownSpan.totalTime).toEqual(null)
    })
    test('it returns null with invalid data', () => {
      const nullSpans = null
      const timingNullSpans = getSpanTiming('spanId', nullSpans)
      expect(timingNullSpans.selfTime).toEqual(null)
      expect(timingNullSpans.totalTime).toEqual(null)
      const emptySpans = {}
      const timingEmptySpans = getSpanTiming('spanId', emptySpans)
      expect(timingEmptySpans.selfTime).toEqual(null)
      expect(timingEmptySpans.totalTime).toEqual(null)
      const noFinishSpans = [
        {
          id: 'spanId',
          parentId: null,
          duration: 10,
        },
        {
          id: 'childId',
          parentId: 'spanId',
          duration: 5,
        },
        {
          id: 'child2Id',
          parentId: 'childId',
          duration: 3,
        },
      ]
      const timingNoFinish = getSpanTiming('spanId', noFinishSpans)
      expect(timingNoFinish.selfTime).toEqual(null)
      expect(timingNoFinish.totalTime).toEqual(null)
      const noDurationSpans = [
        {
          id: 'spanId',
          parentId: null,
          finish: 10,
        },
        {
          id: 'childId',
          parentId: 'spanId',
          finish: 5,
        },
        {
          id: 'child2Id',
          parentId: 'childId',
          finish: 3,
        },
      ]
      const timingNoDuration = getSpanTiming('spanId', noDurationSpans)
      expect(timingNoDuration.selfTime).toEqual(null)
      expect(timingNoDuration.totalTime).toEqual(null)
    })
  })

  describe('getNanosecondsFromString', () => {
    it('returns nanoseconds from a human readable string', () => {
      const input6 = '5.05ns'
      const result6 = getNanosecondsFromString(input6)
      expect(result6).toBe(5.05)

      const input2 = '1us'
      const result2 = getNanosecondsFromString(input2)
      expect(result2).toBe(1 * 1e3)

      const input3 = '1.02μs'
      const result3 = getNanosecondsFromString(input3)
      expect(result3).toBe(1.02 * 1e3)

      const input1 = '1.01ms'
      const result1 = getNanosecondsFromString(input1)
      expect(result1).toBe(1.01 * 1e6)

      const input5 = '5s'
      const result5 = getNanosecondsFromString(input5)
      expect(result5).toBe(5 * MILLISECONDS_IN_SECOND * 1e6)

      const input4 = '5m'
      const result4 = getNanosecondsFromString(input4)
      expect(result4).toBe(5 * MILLISECONDS_IN_MINUTE * 1e6)
    })
    it('returns null for invalid data', () => {
      const input1 = '1.01x'
      const result1 = getNanosecondsFromString(input1)
      expect(result1).toBe(null)

      const input2 = undefined
      const result2 = getNanosecondsFromString(input2)
      expect(result2).toBe(null)

      const input3 = null
      const result3 = getNanosecondsFromString(input3)
      expect(result3).toBe(null)

      const input4 = {}
      const result4 = getNanosecondsFromString(input4)
      expect(result4).toBe(null)
    })
  })
  describe('flattenNode', () => {
    it('flattens deeply nested connection fields', () => {
      const example = {
        key1: 'value',
        key2: ['this', 'is', 'a', 'list'],
        key3: {
          key3key1: 'yes',
        },
        key4: {
          edges: [
            {
              node: {
                keyConnection: '1',
                keyInnerConnection: {
                  edges: [
                    {
                      node: {
                        keyInnerInner: 'hello',
                        evenMoreInner: {
                          edges: [
                            {
                              node: {
                                incrediblyInner: 'yes',
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        key5: [
          {
            element: '1',
            element2: '2',
            evenWithConnectionFieldsHere: {
              edges: [
                {
                  node: {
                    thisWillShowUp: 'true',
                    moreSo: {
                      edges: [
                        {
                          node: { moreAndMore: 'oh yeah' },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        ],
        evenNullKeys: null,
        andNumbers: 5,
      }
      const result = flattenNode(example)
      expect(result).toEqual({
        key1: 'value',
        key2: ['this', 'is', 'a', 'list'],
        key3: {
          key3key1: 'yes',
        },
        key4: [
          {
            keyConnection: '1',
            keyInnerConnection: [
              {
                keyInnerInner: 'hello',
                evenMoreInner: [
                  {
                    incrediblyInner: 'yes',
                  },
                ],
              },
            ],
          },
        ],
        key5: [
          {
            element: '1',
            element2: '2',
            evenWithConnectionFieldsHere: [
              {
                thisWillShowUp: 'true',
                moreSo: [
                  {
                    moreAndMore: 'oh yeah',
                  },
                ],
              },
            ],
          },
        ],
        evenNullKeys: null,
        andNumbers: 5,
      })
    })
    it('makes a deep clone of the input', () => {
      const example = {
        key5: [
          {
            element: '1',
            element2: '2',
            evenWithConnectionFieldsHere: {
              edges: [
                {
                  node: {
                    thisWillShowUp: 'true',
                    moreSo: {
                      edges: [
                        {
                          node: { moreAndMore: 'oh yeah' },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        ],
      }
      const result = flattenNode(example)
      result.key5[0].evenWithConnectionFieldsHere.thisWillShowUp = 'false'
      result.key5[0].element = '2'
      expect(example.key5[0].element).toBe('1')
      expect(example.key5[0].evenWithConnectionFieldsHere.edges[0].node.thisWillShowUp).toBe('true')
    })
    it('works with real data', () => {
      const realData = {
        namespace: {
          id: 'namespace',
          tags: [{ key: 'tagKey', value: 'tagValue' }],
          service: {
            name: 'serviceName',
          },
          commits: {
            edges: [
              {
                node: {
                  commitTime: '2019-04-24T14:35:08+00:00',
                  tests: {
                    edges: [
                      {
                        node: {
                          name: 'ok_test_assert_true_is_true',
                          fqn:
                            'com.undefinedlabs.codescope.JUnit4ExamplesTest.ok_test_assert_true_is_true',
                          status: 'PASS',
                          isFlaky: false,
                        },
                      },
                      {
                        node: {
                          name: 'failed_test_assert_that_false_is_true',
                          fqn:
                            'com.undefinedlabs.codescope.JUnit4ExamplesTest.failed_test_assert_that_false_is_true',
                          status: 'FAIL',
                          isFlaky: false,
                        },
                      },
                      {
                        node: {
                          name: 'error_test_throw_exception',
                          fqn:
                            'com.undefinedlabs.codescope.JUnit4ExamplesTest.error_test_throw_exception',
                          status: 'FAIL',
                          isFlaky: false,
                        },
                      },
                      {
                        node: {
                          name: 'skip_test_ignored',
                          fqn: 'com.undefinedlabs.codescope.JUnit4ExamplesTest.skip_test_ignored',
                          status: 'SKIP',
                          isFlaky: false,
                        },
                      },
                    ],
                  },
                },
              },
              {
                node: {
                  commitTime: '2019-04-24T12:19:56+00:00',
                  tests: {
                    edges: [
                      {
                        node: {
                          name: 'ok_test_assert_true_is_true',
                          fqn:
                            'com.undefinedlabs.codescope.JUnit4ExamplesTest.ok_test_assert_true_is_true',
                          status: 'PASS',
                          isFlaky: false,
                        },
                      },
                      {
                        node: {
                          name: 'failed_test_assert_that_false_is_true',
                          fqn:
                            'com.undefinedlabs.codescope.JUnit4ExamplesTest.failed_test_assert_that_false_is_true',
                          status: 'FAIL',
                          isFlaky: false,
                        },
                      },
                      {
                        node: {
                          name: 'error_test_throw_exception',
                          fqn:
                            'com.undefinedlabs.codescope.JUnit4ExamplesTest.error_test_throw_exception',
                          status: 'FAIL',
                          isFlaky: false,
                        },
                      },
                      {
                        node: {
                          name: 'skip_test_ignored',
                          fqn: 'com.undefinedlabs.codescope.JUnit4ExamplesTest.skip_test_ignored',
                          status: 'SKIP',
                          isFlaky: false,
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      }
      const formattedData = flattenNode(realData)
      expect(formattedData).toEqual({
        namespace: {
          id: 'namespace',
          tags: [{ key: 'tagKey', value: 'tagValue' }],
          service: {
            name: 'serviceName',
          },
          commits: [
            {
              commitTime: '2019-04-24T14:35:08+00:00',
              tests: [
                {
                  name: 'ok_test_assert_true_is_true',
                  fqn: 'com.undefinedlabs.codescope.JUnit4ExamplesTest.ok_test_assert_true_is_true',
                  status: 'PASS',
                  isFlaky: false,
                },
                {
                  name: 'failed_test_assert_that_false_is_true',
                  fqn:
                    'com.undefinedlabs.codescope.JUnit4ExamplesTest.failed_test_assert_that_false_is_true',
                  status: 'FAIL',
                  isFlaky: false,
                },
                {
                  name: 'error_test_throw_exception',
                  fqn: 'com.undefinedlabs.codescope.JUnit4ExamplesTest.error_test_throw_exception',
                  status: 'FAIL',
                  isFlaky: false,
                },
                {
                  name: 'skip_test_ignored',
                  fqn: 'com.undefinedlabs.codescope.JUnit4ExamplesTest.skip_test_ignored',
                  status: 'SKIP',
                  isFlaky: false,
                },
              ],
            },
            {
              commitTime: '2019-04-24T12:19:56+00:00',
              tests: [
                {
                  name: 'ok_test_assert_true_is_true',
                  fqn: 'com.undefinedlabs.codescope.JUnit4ExamplesTest.ok_test_assert_true_is_true',
                  status: 'PASS',
                  isFlaky: false,
                },
                {
                  name: 'failed_test_assert_that_false_is_true',
                  fqn:
                    'com.undefinedlabs.codescope.JUnit4ExamplesTest.failed_test_assert_that_false_is_true',
                  status: 'FAIL',
                  isFlaky: false,
                },
                {
                  name: 'error_test_throw_exception',
                  fqn: 'com.undefinedlabs.codescope.JUnit4ExamplesTest.error_test_throw_exception',
                  status: 'FAIL',
                  isFlaky: false,
                },
                {
                  name: 'skip_test_ignored',
                  fqn: 'com.undefinedlabs.codescope.JUnit4ExamplesTest.skip_test_ignored',
                  status: 'SKIP',
                  isFlaky: false,
                },
              ],
            },
          ],
        },
      })
    })
    it('does not break with invalid or empty data', () => {
      expect(flattenNode(null)).toBe(null)
      expect(flattenNode(undefined)).toBe(undefined)
      expect(flattenNode(5)).toBe(5)
      expect(flattenNode({})).toEqual({})
    })
  })
})

describe('areAgentsWithSameServiceName', () => {
  it('should return true for one item', () => {
    expect(areAgentsWithSameServiceName([{ agent: { service: 'foo' } }])).toBe(true)
  })

  it('should return true for two or more items with agents with same service name', () => {
    expect(
      areAgentsWithSameServiceName([{ agent: { service: 'foo' } }, { agent: { service: 'foo' } }])
    ).toBe(true)
  })

  it('should return false for two or more items with agents with different service names', () => {
    expect(
      areAgentsWithSameServiceName([{ agent: { service: 'foo' } }, { agent: { service: 'bar' } }])
    ).toBe(false)
  })
})

describe('getEventLevel', () => {
  it('should return NOTSET for unknown event fields', () => {
    expect(getEventLevel(null)).toBe('NOTSET')
  })
  it('should return log level field', () => {
    expect(getEventLevel({ 'log.level': 'foo' })).toBe('foo')
  })

  it('should return event field', () => {
    expect(getEventLevel({ event: 'foo' })).toBe('foo')
  })

  it('should return FAIL for event test_failure event value', () => {
    expect(getEventLevel({ event: 'test_failure' })).toBe('FAIL')
  })

  it('should NOTSET as default value', () => {
    expect(getEventLevel({ bar: 'foo' })).toBe('NOTSET')
  })
})
