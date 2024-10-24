let latestCommands: { [key: string]: number } = {}
let led1 = false;
let led2 = false;
let servo0: number = 0;
let servo1: number = 0;

basic.clearScreen()

bluetooth.startUartService()

bluetooth.onBluetoothConnected(function () {
})

bluetooth.onBluetoothDisconnected(function () {
    runServo(wuKong.ServoList.S1, servo1, 0)
    runServo(wuKong.ServoList.S0, servo0, 0)
})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    let commadParts = command.split("=")

    latestCommands[commadParts[0]] = parseFloat(commadParts[1])

    // let commandName = commadParts[0]


})

basic.forever(function () {
    while (Object.keys(latestCommands).length) {
        let commandName = Object.keys(latestCommands)[0]
        let commandValue = latestCommands[commandName]
        delete latestCommands[commandName];

        if (commandName == "-v") {
            // bluetooth.uartWriteLine('vc;init;')
            bluetooth.uartWriteLine('vc;sl;0;0;50;1;1;0;1;;')
            bluetooth.uartWriteLine('vc;sr;0;0;360;1;0;0;0;;')
            bluetooth.uartWriteLine('vc;b;Digit1;1;4;1;')
            bluetooth.uartWriteLine('vc;b;Digit2;1;1;2;')
            bluetooth.uartWriteLine('vc;ox;0;-45;45;-7;7;1;0;0;')
            bluetooth.uartWriteLine('vc;oy;0;-45;45;-7;7;1;0;0;')
            bluetooth.uartWriteLine('vc;il;1;')
            bluetooth.uartWriteLine('vc;ir;1;')
            bluetooth.uartWriteLine('vc;show;sl,sr,br,bl,ar;')
            bluetooth.uartWriteLine('vc;srv;0;')
            bluetooth.uartWriteLine('vc;slv;0;')
        }
        
        if (commandName == "oy" || commandName == "sl" || commandName == "jry") {
            // wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S1, commandValue)
            servo1 = runServo(wuKong.ServoList.S1, servo1, commandValue)
        }
        
        if (commandName == "ox" || commandName == "sr" || commandName == "jrx") {
            // wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, commandValue)
            servo0 = runServo(wuKong.ServoList.S0, servo0, commandValue)
        }
        
        if (commandName == "1") {
            wuKong.setMotorSpeed(wuKong.MotorList.M1, -20)
        }
        
        if (commandName == "2") {
            wuKong.setMotorSpeed(wuKong.MotorList.M1, 20)
        }

        if (commandName == "3") {
            servo1 = runServo(wuKong.ServoList.S1, servo1, 0)
            servo0 = runServo(wuKong.ServoList.S0, servo0, 0)

            servo0 = runServo(wuKong.ServoList.S0, servo0, 90)

            wuKong.setMotorSpeed(wuKong.MotorList.M1, 20)
            basic.pause(1000)
            wuKong.setMotorSpeed(wuKong.MotorList.M1, 0)

            servo1 = runServo(wuKong.ServoList.S1, servo1, 40)

            wuKong.setMotorSpeed(wuKong.MotorList.M1, -20)
            basic.pause(1000)
            wuKong.setMotorSpeed(wuKong.MotorList.M1, 0)

            servo1 = runServo(wuKong.ServoList.S1, servo1, 0)

            servo0 = runServo(wuKong.ServoList.S0, servo0, 0)

            servo1 = runServo(wuKong.ServoList.S1, servo1, 40)

            wuKong.setMotorSpeed(wuKong.MotorList.M1, 20)
            basic.pause(1000)
            wuKong.setMotorSpeed(wuKong.MotorList.M1, 0)

            servo1 = runServo(wuKong.ServoList.S1, servo1, 0)

            wuKong.setMotorSpeed(wuKong.MotorList.M1, -20)
            basic.pause(1000)
            wuKong.setMotorSpeed(wuKong.MotorList.M1, 0)
        }
        
        if (commandName == "!1" || commandName == "!2") {
            wuKong.setMotorSpeed(wuKong.MotorList.M1, 0)
        }
        
        // if (commandName == "up") {
        //     if (servo1 > 0) {
        //         servo1 -= 1
        //         wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S1, servo1)
        //     }
        // }

        // if (commandName == "down") {
        //     if (servo1 < 50) {
        //         servo1 += 1
        //         wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S1, servo1)
        //     }
        // }
        // while (commandName == "right") {
        //     if (servo0 < 360) {
        //         servo0 += 1
        //         wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, servo0)
        //     }

        //     basic.pause(20)
        // }

        // while (commandName == "left") {
        //     if (servo0 > 0) {
        //         servo0 -= 1
        //         wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, servo0)
        //     }

        //     basic.pause(20)
        // }
    }
})

function runServo(servo: wuKong.ServoList, from: number, to: number, delay: number = 10) {
    if (to > from) {
        while (from < to) {
            wuKong.setServoAngle(wuKong.ServoTypeList._360, servo, from)
            from++
            basic.pause(delay)
        }
    } else {
        while (from > to) {
            wuKong.setServoAngle(wuKong.ServoTypeList._360, servo, from)
            from--
            basic.pause(delay)
        }
    }

    return to
}

// wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 0)
// wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S1, 0)
// basic.pause(1000)
// runServo(wuKong.ServoList.S0,0,90)