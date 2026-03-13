import * as THREE from 'three';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.cellSize = 4;
        this.map = [];
        this.wallGeometry = new THREE.BoxGeometry(this.cellSize, 3, this.cellSize);
        // Low-poly fluorescent yellow material
        this.wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x857d4a, 
            roughness: 1, 
            flatShading: true 
        });
    }

    generate(width, height) {
        for (let x = 0; x < width; x++) {
            this.map[x] = [];
            for (let z = 0; z < height; z++) {
                const isWall = Math.random() > 0.8 || x === 0 || z === 0 || x === width - 1 || z === height - 1;
                this.map[x][z] = isWall ? 1 : 0;

                if (isWall) {
                    const wall = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
                    wall.position.set(x * this.cellSize, 1.5, z * this.cellSize);
                    this.scene.add(wall);
                }
            }
        }
        this.addFloor(width, height);
    }

    addFloor(w, h) {
        const floorGeo = new THREE.PlaneGeometry(w * this.cellSize, h * this.cellSize);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x5e5731, flatShading: true });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.set((w * this.cellSize) / 2 - 2, 0, (h * this.cellSize) / 2 - 2);
        this.scene.add(floor);
    }
}
