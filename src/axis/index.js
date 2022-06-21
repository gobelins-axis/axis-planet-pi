import Axis from 'axis-api'

const gamepadEmulator = Axis.createGamepadEmulator(0) // First gamepad plugged

Axis.registerGamepadEmulatorKeys(gamepadEmulator, 0, "a", 1) // Gamepad button index 0 (PS4 X)

Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator, 0) // Gamepad Joystick Left

Axis.registerKeys([" "], "a", 1) // Space triggers button A

// Set leds
const color = '#df3b57';

for (let i = 0; i < Axis.ledManager.leds.length; i++) {
    Axis.ledManager.leds[i].setColor(color);
}

for (let i = 0; i < Axis.ledManager.ledGroups[0].leds.length; i++) {
    const ledLeft = Axis.ledManager.ledGroups[0].leds[i];
    const ledRight = Axis.ledManager.ledGroups[1].leds[i];
    ledLeft.setColor(color);
    ledRight.setColor(color);
}

export default Axis

export {
    gamepadEmulator
} 