import Axis from 'axis-api'

const gamepadEmulator = Axis.createGamepadEmulator(0) // First gamepad plugged

Axis.registerGamepadEmulatorKeys(gamepadEmulator, 0, "a", 1) // Gamepad button index 0 (PS4 X)

Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator, 0) // Gamepad Joystick Left

Axis.registerKeys([" "], "a", 1) // Space triggers button A

export default Axis

export {
    gamepadEmulator
} 