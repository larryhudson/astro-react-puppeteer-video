import React from "react";
import TextSlide from "./TextSlide";
import MapSlide from "./MapSlide";
import { getStartTimeForTiming } from "@src/utils/timing-utils";
import gsap from "gsap";

export default function Video() {
    const videoWrapperRef = React.useRef<HTMLDivElement>(null);
    const [currentTimeSecs, setCurrentTimeSecs] = React.useState(0);

    const timings = [
        {
            durationSecs: 3,
            delaySecs: 0,
            component: TextSlide,
            componentProps: {
                children: "Moulin Rouge to Tuileries Garden"
            }
        },
        // {
        //     durationSecs: 7,
        //     delaySecs: 0,
        //     component: MapSlide,
        //     componentProps: {
        //         initialFocus: {
        //             lat: 48.88411479131363,
        //             lng: 2.332333624362946,
        //             zoom: 14
        //         },
        //         places: [
        //             {
        //                 lat: 48.88411479131363,
        //                 lng: 2.332333624362946,
        //                 name: "Moulin Rouge"
        //             },
        //             {
        //                 lat: 48.86525821321822,
        //                 lng: 2.3272240161895756,
        //                 name: "Jardin de Tuileries"
        //             }
        //         ],
        //         moveAnimations: [
        //             {
        //                 delaySecs: 2,
        //                 durationSecs: 6,
        //                 from: {
        //                     lat: 48.88411479131363,
        //                     lng: 2.332333624362946
        //                 },
        //                 to: {
        //                     lat: 48.86525821321822,
        //                     lng: 2.3272240161895756
        //                 }
        //             }
        //         ]
        //     }
        // },
        {
            durationSecs: 3,
            delaySecs: 0,
            component: TextSlide,
            componentProps: {
                children: "Goodbye"
            }
        }]

    // declare fade in and fade out animations
    const slideAnimations = [{
        id: 'fade-in',
        when: 'slide-enter',
        duration: 0.5,
        createTimeline: () => {
            const timeline = gsap.timeline({ paused: true });

            // at the start of the timeline, set the initial state
            timeline.to(videoWrapperRef.current, {
                opacity: 0,
                y: 20
            }, 0)

            // at the end of the timeline, set the final state
            timeline.to(videoWrapperRef.current, {
                opacity: 1,
                y: 0
            }, 0.5)

            return timeline;
        },
        getProgress: (slideProps, animationProps, currentTimeSecsRelative) => {
            // progress is a number between 0 and 1
            // it should equal 0 when the currentTimeSecsRelative is 0
            // it should equal 1 when the currentTimeSecsRelative is more than the animation duration 
            // for example, if the animation duration is
            const animationDurationSecs = animationProps.duration;
            const progress = Math.min(1, currentTimeSecsRelative / animationDurationSecs);
            return progress;
        }
    },
    {
        id: 'fade-out',
        when: 'slide-exit',
        duration: 0.5,
        createTimeline: () => {
            const timeline = gsap.timeline({ paused: true });

            // at the start of the timeline, set the initial state
            timeline.to(videoWrapperRef.current, {
                opacity: 1,
                y: 0
            }, 0)

            // at the end of the timeline, set the final state
            timeline.to(videoWrapperRef.current, {
                opacity: 0,
                y: 20
            }, 0.5)

            return timeline;
        },
        getProgress: (slideProps, animationProps, currentTimeSecsRelative) => {
            const slideDurationSecs = slideProps.durationSecs;
            const animationDurationSecs = animationProps.duration;
            // progress is a number between 0 and 1
            // it should equal 0 when the time until the end of the timing is more than the duration of the animation
            // it should equal 1 when the time until the end of the timing is 0
            // if the time until the end of the timing is less than the duration of the animation, then the progress should be a number between 0 and 1
            // for example, if the slide duration is 3 seconds, and the current time is 2.5 seconds, then the progress is 0
            // if the slide duration is 3 seconds, and the current time is 2.75 seconds, then the progress is 0.5
            const secsUntilTimingEnd = slideDurationSecs - currentTimeSecsRelative;
            const progress = 1 - (secsUntilTimingEnd / animationDurationSecs);

            return Math.max(0, Math.min(1, progress));
        }
    }
    ]

    const timingsWithStartTimes = timings.map((timing, index) => {
        const startTime = getStartTimeForTiming(timings, timing);
        const endTime = startTime + timing.durationSecs + (timing.delaySecs || 0);
        return {
            ...timing,
            startTime,
            endTime
        }
    })

    const totalDurationSecs = timings.reduce((acc, timing) => acc + timing.durationSecs + (timing.delaySecs || 0), 0);

    const currentTiming = timingsWithStartTimes.find((timing) => {
        return currentTimeSecs >= timing.startTime && currentTimeSecs <= timing.endTime;
    })

    const CurrentComponent = currentTiming?.component;
    const componentProps = currentTiming?.componentProps;

    const currentTimingStart = currentTiming ? currentTiming.startTime : 0;
    const currentTimeSecsRelative = currentTiming ? currentTimeSecs - currentTimingStart : 0;

    // update the animation state for the current timing
    function updateAnimationState() {
        if (currentTiming) {
            const currentTimingStart = currentTiming.startTime;
            const currentTimeSecsRelative = currentTimeSecs - currentTimingStart;
            const currentTimingDuration = currentTiming.durationSecs;
            const currentTimingDelay = currentTiming.delaySecs || 0;

            const secsUntilTimingEnd = currentTimingDuration - currentTimeSecsRelative;



            const currentAnimations = slideAnimations.filter((animation) => {
                const animationDuration = animation.duration;
                if (animation.when === "slide-enter") {
                    return currentTimeSecsRelative >= 0 && currentTimeSecsRelative < animationDuration;
                }
                if (animation.when === "slide-exit") {
                    return secsUntilTimingEnd >= 0 && secsUntilTimingEnd < animationDuration;
                }
            })

            if (currentAnimations.length === 0) {
                // reset the state of the video wrapper
                const timeline = gsap.timeline();
                timeline.to(videoWrapperRef.current, {
                    opacity: 1,
                    y: 0
                }, 0)
                timeline.progress(0);
            }

            console.log("currentTImeSecs", currentTimeSecs)

            for (const animation of currentAnimations) {
                console.log("Creating timeline for animation", animation.id)
                const timeline = animation.createTimeline();
                // get the current progress based on the current time
                const progress = animation.getProgress(currentTiming, animation, currentTimeSecsRelative);
                console.log("Setting progress to", progress)
                timeline.progress(progress)
            }
        }
    }

    updateAnimationState();

    React.useEffect(() => {
        console.log("Adding the event listener now")
        document.addEventListener("goToTime", (event) => {
            const newTime = event.detail?.time as number;
            if (newTime > totalDurationSecs) {
                return;
            }
            if (newTime < 0) {
                return;
            }
            setCurrentTimeSecs(newTime);
        });

        document.addEventListener("setClean", (event) => {
            videoWrapperRef.current?.classList.remove("dirty");
        });

        document.addEventListener("setDirty", (event) => {
            videoWrapperRef.current?.classList.add("dirty");
        });
    }, [])

    // // when the current timing changes, we want to set the dirty flag
    // React.useEffect(() => {
    //     console.log("current timing changed")
    //     videoWrapperRef.current?.classList.add("dirty");
    // }, [currentTiming])

    return (
        <div ref={videoWrapperRef} id="video-wrapper">
            {CurrentComponent && <CurrentComponent currentTimeSecs={currentTimeSecsRelative} {...componentProps} />}
        </div>
    )

}