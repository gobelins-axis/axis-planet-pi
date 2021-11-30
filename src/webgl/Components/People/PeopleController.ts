import * as THREE from "three"
import cremap from "../../../utils/math/cremap"

type Planet = { radius: number; position: THREE.Vector3 }

export default class PeopleController {
  private object: THREE.Object3D
  public index: number
  public planetPosition: {
    rotation: number
    tilt: number
  }
  private nextPlanetPosition: {
    rotation: number
    tilt: number
  }

  constructor(startPlanetPos: { rotation: number; tilt: number }, index: number) {
    this.index = index
    this.object = new THREE.Object3D()
    this.planetPosition = { ...startPlanetPos }
    this.nextPlanetPosition = { ...this.planetPosition }
  }

  collide(otherPeople: PeopleController[]) {
    // TODO : Increase Perf
    let value = 0
    for (const people of otherPeople) {
      const diff = this.planetPosition.rotation - people.planetPosition.rotation
      const factor = cremap(Math.abs(diff), [0, 0.5], [1, 0])
      value += Math.sign(diff) * factor
    }
    for (const people of otherPeople) {
      const compareRotation =
        this.planetPosition.rotation > people.planetPosition.rotation
          ? people.planetPosition.rotation + Math.PI * 2
          : people.planetPosition.rotation - Math.PI * 2
      const diff = this.planetPosition.rotation - compareRotation
      const factor = cremap(Math.abs(diff), [0, 0.5], [1, 0])
      value += Math.sign(diff) * factor
    }
    // ;(window as any)[`people_${this.index}`] = value
    let newRotation = this.planetPosition.rotation + value * 0.1
    if (newRotation > Math.PI * 2) newRotation -= Math.PI * 2
    if (newRotation < 0) newRotation += Math.PI * 2
    this.nextPlanetPosition.rotation = newRotation
  }

  setPosition(planet: Planet, mesh: THREE.InstancedMesh) {
    this.planetPosition.rotation = this.nextPlanetPosition.rotation
    const radius = planet.radius + 0.3
    this.object.position.set(
      planet.position.x + Math.cos(this.planetPosition.rotation) * radius,
      planet.position.y + Math.sin(this.planetPosition.rotation) * radius,
      planet.position.z,
    )
    this.object.rotation.z = this.planetPosition.rotation - Math.PI / 2
    this.object.updateMatrix()
    mesh.setMatrixAt(this.index, this.object.matrix)
  }
}
