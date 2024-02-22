import React from "react";
import TextSlide from "./TextSlide";
import MapSlide from "./MapSlide";

export default function Video() {
    const [currentTimeSecs, setCurrentTimeSecs] = React.useState(0);
    const framesPerSecond = 30;
    const secondsPerFrame = 1.00 / framesPerSecond;

    const timings = [
        {
            startSecs: 0,
            endSecs: 3,
            component: TextSlide,
            componentProps: {
                children: "Moulin Rouge to Tuileries Garden"
            }
        },
        {
            startSecs: 3,
            endSecs: 10,
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
                        startSecs: 2,
                        endSecs: 8,
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

        }]

    const currentTiming = timings.find(timing => {
        return timing.startSecs <= currentTimeSecs && timing.endSecs > currentTimeSecs
    })

    const CurrentComponent = currentTiming?.component;
    const componentProps = currentTiming?.componentProps;

    React.useEffect(() => {
        console.log("Adding the event listener now")
        document.addEventListener("goToTime", (event) => {
            const newTime = event.detail.time;
            setCurrentTimeSecs(newTime);
        });
    }, [])

    return (
        <div>
            {CurrentComponent && <CurrentComponent currentTimeSecs={currentTimeSecs} {...componentProps} />}
        </div>
    )

}