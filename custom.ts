/**
 * makecode MonkMakes Plant Monitor package
 * MonkMakes Ltd
 * Author: Simon Monk @ https://www.monkmakes.com
 * Date: 2021-10-18
 */


/**
 * MonkMakes Plant Monitor block
 */
//% color=190 weight=100 icon="\uf1bb" block="Plant Monitor"
namespace PlantMonitor {

    let value_str = ""
    let wetness = -1
    let temp = -1
    let humidity = -1

    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
        let response = serial.readUntil(serial.delimiters(Delimiters.NewLine))
        //basic.showString(response)
        value_str = response.substr(2, response.length-3) // w=123\r\n
        //basic.showString(value_str)
        let value = parseInt(value_str)
        //basic.showString(response.charAt(0))
        if (response.charAt(0) == 'w') {
            wetness = value
        }
        if (response.charAt(0) == 't') {
            temp = value
        }
        if (response.charAt(0) == 'h') {
            humidity = value
        }
    })


    /**
    * Init
    */
    //% blockId=device_init block="Start Plant Monitor"
    export function startMon(): void {
        serial.redirect(
            SerialPin.P2,
            SerialPin.P1,
            BaudRate.BaudRate9600
        )
    }

    /**
    * Return the wetness 0-100.
    */
    //% blockId=device_wetness block="Plant Wetness (0-100)"
    export function readWetness(): number {
        serial.writeString("w")
        basic.pause(200)
        return wetness
    }

    /**
    * Return the wetness 0-255.
    */
    //% blockId=device_wetness_analog block="Plant Wetness Analog (0-100)"
    export function readWetnessAnalog(): number {
        let raw = pins.analogReadPin(AnalogPin.P0)
        let pc = Math.floor(raw / 7.73)
        if (pc > 100) {
            pc = 100
        }
        return pc
    }

    /**
    * Return the temp deg C.
    */
    //% blockId=device_temp block="Plant Temperature (deg C)"
    export function readTemp(): number {
        serial.writeString("t")
        basic.pause(200)
        return temp
    }


    /**
    * Return the temp deg C.
    */
    //% blockId=device_humidity block="Plant Humidity"
    export function readHumidity(): number {
        serial.writeString("h")
        basic.pause(200)
        return humidity
    }

    /**
    * LED
    */
    //% blockId=device_led_on block="Plant Monitor LED on"
    export function monitor_led_on(): void {
        serial.writeString("L")
    }

    /**
    * LED
    */
    //% blockId=device_led_off block="Plant Monitor LED off"
    export function monitor_led_off(): void {
        serial.writeString("l")
    }

}
