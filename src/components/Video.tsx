import React from "react";
import TextSlide from "./TextSlide";
import MapSlide from "./MapSlide";
import { getStartTimeForTiming } from "@src/utils/timing-utils";

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
        {
            durationSecs: 7,
            delaySecs: 0,
            component: MapSlide,
            componentProps: {
                initialFocus: {
                    lat: 48.88411479131363,
                    lng: 2.332333624362946,
                    zoom: 14
                },
                places: [
                    {
                        lat: 48.88411479131363,
                        lng: 2.332333624362946,
                        name: "Moulin Rouge"
                    },
                    {
                        lat: 48.86525821321822,
                        lng: 2.3272240161895756,
                        name: "Jardin de Tuileries"
                    }
                ],
                moveAnimations: [
                    {
                        // these are currently relative to the start of the video, but they should be in their own time space
                        delaySecs: 2,
                        durationSecs: 6,
                        from: {
                            lat: 48.88411479131363,
                            lng: 2.332333624362946
                        },
                        to: {
                            lat: 48.86525821321822,
                            lng: 2.3272240161895756
                        }
                    }
                ]
            }
        },
        {
            durationSecs: 3,
            delaySecs: 0,
            component: TextSlide,
            componentProps: {
                children: "Goodbye"
        }}]

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
    const currentTimeSecsRelative = currentTiming ? currentTimeSecs - currentTimingStart  : 0;

    React.useEffect(() => {
        console.log("Adding the event listener now")
        document.addEventListener("goToTime", (event) => {
            const newTime = event.detail.time;
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