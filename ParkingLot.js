'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}


class ParkingLot {
   // cars;
    // Add the methods here
    constructor(slots) {
        this.slots = slots;
        this.slotsArr = new Array ();
        this.cars = new Array (slots).fill (0);
    }
    
    park(carId) {
        for (let i = 0; i< this.cars.length; i++)
        {
          if(this.cars[i] === 0)
          {
            this.cars[i] = carId;  
            return true;
          }
          else{
              continue;
          }
          
        }
        return false;
    }
    
    getSlots() {
        this.slotsArr = [];
        for(let i = 0; i< this.cars.length; i++)
        {
            var position = this.cars[i];

            if(position!== 0)
            {
                this.slotsArr.push(position)
                
            }
            else{
                this.slotsArr.push(null);
            }
        }
         return this.slotsArr;
    }
    
    remove(carId) {
        const index = this.cars.indexOf(carId);
        if (index > -1) {
            this.cars[index] = 0;
            return true;
        }
        else{
            return false;
        }
    }

}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const numberOfSlots = parseInt(readLine().trim());
    const parkingLotObj = new ParkingLot(numberOfSlots);
    ws.write(`Parking Lot created with number of slots as ${numberOfSlots}\n`);

    let numberOfOperations = parseInt(readLine().trim());
    while (numberOfOperations-- > 0) {
        const inputs = readLine().trim().split(' ');
        const operation = inputs[0];
        const carId = inputs[1];

        switch (operation) {
            case 'Park':
                if (parkingLotObj.park(carId)) {
                    ws.write(`Parking Started: ${carId}\n`);
                } else {
                    ws.write(`Parking Full: ${carId}\n`);
                }
                break;
            case 'Remove':
                if (parkingLotObj.remove(carId)) {
                    ws.write(`Car id ${carId} removed from parking\n`);
                } else {
                    ws.write(`Car: ${carId} not found\n`);
                }
                break;
            case 'GetSlots':
                const status = parkingLotObj.getSlots();
                status.forEach((obj, i) => {
                    if (obj) {
                        ws.write(`Parked at slot ${i + 1}: ${obj}\n`);
                    } else {
                        ws.write(`Slot ${i + 1} is empty\n`);
                    }
                })
                break;
            default:
                break;
        }
    }
    ws.end();
}


/*
5
6
Park CAR-10
Park CAR-20
Park CAR-30
GetSlots
Remove CAR-20
GetSlots
*/