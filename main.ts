input.onButtonPressed(Button.A, function () {
    PlantMonitor.startMon()
    basic.pause(5000)
    for (let index = 0; index < 10; index++) {
        w = PlantMonitor.readWetness()
        readings.push(w)
        basic.showNumber(w)
        basic.pause(5000)
    }
})
input.onButtonPressed(Button.B, function () {
    serial.redirectToUSB()
    basic.pause(5000)
    for (let value of readings) {
        serial.writeValue("wetness", value)
    }
})
let w = 0
let readings: number[] = []
readings = []
