input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    show_wetness = false
    basic.showNumber(PlantMonitor.readTemp())
    basic.pause(1000)
    show_wetness = true
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    show_wetness = false
    basic.showNumber(PlantMonitor.readHumidity())
    basic.pause(1000)
    show_wetness = true
})
let show_wetness = false
PlantMonitor.startMon()
show_wetness = true
basic.forever(function () {
    if (show_wetness == true) {
        led.plotBarGraph(
        PlantMonitor.readWetness(),
        100
        )
        basic.pause(200)
    }
})
