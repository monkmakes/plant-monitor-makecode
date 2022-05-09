input.onButtonPressed(Button.A, function () {
    show_wetness = false
    basic.showNumber(PlantMonitor.readTemp())
    basic.pause(1000)
    show_wetness = true
})
let show_wetness = false
PlantMonitor.startMon()
show_wetness = true
basic.forever(function () {
    if (show_wetness) {
        led.plotBarGraph(
        PlantMonitor.readWetness(),
        100
        )
    }
})
