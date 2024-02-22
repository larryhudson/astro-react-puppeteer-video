type Timing = {
  durationSecs: number;
  delaySecs?: number;
};

export function getStartTimeForTiming(timingsArr: Timing[], timing: Timing) {
  return timingsArr
    .slice(0, timingsArr.indexOf(timing))
    .reduce(
      (acc, timing) => acc + timing.durationSecs + (timing.delaySecs || 0),
      0
    );
}

export function getCurrentTiming(timingsArr: Timing[], currentTimeSecs) {
  return timingsArr.find((timing) => {
    const startTime = getStartTimeForTiming(timingsArr, timing);
    return (
      currentTimeSecs >= startTime &&
      currentTimeSecs <= startTime + timing.durationSecs + (timing.delaySecs || 0)
    );
  });
}

export function getCurrentTimingProgress(
  currentTimeSecs: number,
  timings: Timing[]
) {
    const currentTiming = getCurrentTiming(timings, currentTimeSecs);

  if (!currentTiming) {
    return 0;
  }

  const startTime = getStartTimeForTiming(timings, currentTiming);
  return (currentTimeSecs - startTime) / currentTiming.durationSecs;
}

