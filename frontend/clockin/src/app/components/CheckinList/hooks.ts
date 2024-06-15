export function useHooks() {
  const checkins = [
    {
      id: 1,
      hours: 2,
      tag: 'project',
      activity: 'created be',
    },
    {
      id: 2,
      hours: 1,
      tag: 'project',
      activity: 'created fe',
    }
  ]

  return { checkins };
}