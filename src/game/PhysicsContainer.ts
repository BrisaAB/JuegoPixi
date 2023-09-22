import { Container, Point } from "pixi.js";

export class PhysicsContainer extends Container{
    public speed : Point = new Point();

    public acelerationX: number = 0;
    public acelerationY: number = 0;
    public update(deltaSeconds:number){
        this.x += this.speed.x*deltaSeconds;
        this.y += this.speed.y*deltaSeconds;
    }
}