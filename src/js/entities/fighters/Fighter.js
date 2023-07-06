import { FighterDirection, FighterState, FrameDelay, PUSH_FRICTION } from "../../constants/fighter.js";
import { STAGE_FLOOR } from "../../constants/stage.js";
import * as control from "../../InputHandler.js";
import { rectsOverlap } from "../../utils/collisions.js";

export class Fighter {
    constructor(name, x, y, direction, playerId) {
        this.name = name;
        this.playerId = playerId;
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.initialVelocity = {};
        this.direction = direction;
        this.gravity = 0;
        
        this.frames = new Map();
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};

        this.image = new Image();

        this.opponent;

        this.pushBox = { x: 0, y: 0, width: 0, height: 0 };
        
        this.states = {
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [
                    undefined,
                    FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                    FighterState.CROUCH_UP, FighterState.JUMP_END, FighterState.IDLE_TURN
                ]
            },
            [FighterState.WALK_FORWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_BACKWARD
                ]
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBackwardsState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.WALK_BACKWARD
                ]
            },
            [FighterState.JUMP_START]: {
                init: this.handleJumpStartInit.bind(this),
                update: this.handleJumpStartState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_END,
                    FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD
                ]
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START]
            },
            [FighterState.JUMP_FORWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START]
            },
            [FighterState.JUMP_BACKWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START]
            },
            [FighterState.JUMP_END]: {
                init: this.handleJumpEndInit.bind(this),
                update: this.handleJumpEndState.bind(this),
                validFrom: [
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD
                ]
            },
            [FighterState.CROUCH]: {
                init: () => {},
                update: this.handleCrouchState.bind(this),
                validFrom: [
                    FighterState.CROUCH_DOWN, FighterState.CROUCH_TURN
                ]
            },
            [FighterState.CROUCH_DOWN]: {
                init: this.handleCrouchDownInit.bind(this),
                update: this.handleCrouchDownState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD
                ]
            },
            [FighterState.CROUCH_UP]: {
                init: () => {},
                update: this.handleCrouchUpState.bind(this),
                validFrom: [FighterState.CROUCH]
            },
            [FighterState.IDLE_TURN]: {
                init: () => {},
                update: this.handleIdleTurnState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_END,
                    FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD
                ]
            },
            [FighterState.CROUCH_TURN]: {
                init: () => {},
                update: this.handleCrouchTurnState.bind(this),
                validFrom: [FighterState.CROUCH]
            }
        }

        this.changeState(FighterState.IDLE);
    }

    isAnimationCompleted = () => this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION;

    hasCollideWithOpponent = () => rectsOverlap (
        this.position.x + this.pushBox.x, this.position.y + this.pushBox.y,
        this.pushBox.width, this.pushBox.height,
        this.opponent.position.x + this.opponent.pushBox.x, this.opponent.position.y + this.opponent.pushBox.y,
        this.opponent.pushBox.width, this.opponent.pushBox.height
    );

    resetVelocities() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    getDirection() {
        if (this.position.x + this.pushBox.x + this.pushBox.width <= this.opponent.position.x + this.opponent.pushBox.x) {
            return FighterDirection.LEFT;
        } 
        else if (this.position.x + this.pushBox.x >= this.opponent.position.x + this.opponent.pushBox.x + this.opponent.pushBox.width) {
            return FighterDirection.RIGHT;
        }

        return this.direction;
    } 
    
    getPushBox(frameKey) {
        const [, [x, y, width, height] = [0, 0, 0, 0]] = this.frames.get(frameKey);

        return { x, y, width, height };
    }

    changeState(newState) {  
        if (newState === this.currentState || !this.states[newState].validFrom.includes(this.currentState)) {
            return;
        }

        this.currentState = newState;
        this.animationFrame = 0;

        this.states[this.currentState].init();
    }

    handleIdleInit() {
        this.resetVelocities();
    }

    handleMoveInit() {
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }

    handleJumpInit() {
        this.velocity.y = this.initialVelocity.jump;
        this.handleMoveInit();
    }

    handleCrouchDownInit() {
        this.resetVelocities();
    }

    handleJumpStartInit() {
        this.resetVelocities();
    }

    handleJumpEndInit() {
        this.resetVelocities();
    }

    handleIdleState() {
        if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_START);
        }
        else if (control.isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH_DOWN);
        }
        else if (control.isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_BACKWARD);
        }
        else if (control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_FORWARD);
        }

        const newDirection = this.getDirection();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.IDLE_TURN);
        }
    }

    handleWalkForwardState() {
        if (!control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);
        }
        else if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_START);
        }
        else if (control.isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH_DOWN);
        }

        this.direction = this.getDirection();
    }

    handleWalkBackwardsState() {
        if (!control.isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);
        }
        else if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_START);
        }
        else if (control.isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH_DOWN);
        }

        this.direction = this.getDirection();
    }

    handleCrouchDownState() {
        if (this.isAnimationCompleted()) {
            this.changeState(FighterState.CROUCH);
        }

        if (!control.isDown(this.playerId)) {
            this.currentState = FighterState.CROUCH_UP;
            this.animationFrame = this.animations[FighterState.CROUCH_UP][this.animationFrame].length - this.animationFrame;
        }
    }

    handleCrouchUpState() {
        if (this.isAnimationCompleted()) {
            this.changeState(FighterState.IDLE);
        }
    }

    handleJumpStartState() {
        if (this.isAnimationCompleted()) {
            if (control.isBackward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_BACKWARD);
            }
            else if (control.isForward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_FORWARD);
            }
            else {
                this.changeState(FighterState.JUMP_UP);
            }
        }
    }

    handleJumpEndState() {
        if (this.animationFrame < 1) {
            return;
        }

        let newState = FighterState.IDLE;

        if (!control.isIdle(this.playerId)) {
            this.direction = this.getDirection();

            this.handleIdleState();
        }
        else {
            const newDirection = this.getDirection();

            if (newDirection !== this.direction) {
                this.direction = newDirection;
                newState = FighterState.IDLE_TURN;
            }
            else {
                if (!this.isAnimationCompleted()) {
                    return;
                }
            }
        } 

        this.changeState(newState);
    }

    handleJumpState(time) {
        this.velocity.y += this.gravity * time.secondsPassed;

        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.JUMP_END);
        }
    }

    handleCrouchState() {
        if (!control.isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH_UP);
        }

        const newDirection = this.getDirection();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.CROUCH_TURN);
        }
    }

    handleIdleTurnState() {
        this.handleIdleState();

        if (!this.isAnimationCompleted()) {
            return;
        }

        this.changeState(FighterState.IDLE);
    }

    handleCrouchTurnState() {
        this.handleCrouchState();

        if (!this.isAnimationCompleted()) {
            return;
        }

        this.changeState(FighterState.CROUCH);
    }

    updateStageConstraints(time, context) {
        if (this.position.x > context.canvas.width - this.pushBox.width) {
            this.position.x = context.canvas.width - this.pushBox.width;
        }
    
        if (this.position.x < this.pushBox.width) {
            this.position.x = this.pushBox.width;
        }

        if (this.hasCollideWithOpponent()) {
            // Collide from Left to Right
            if (this.position.x < this.opponent.position.x) {
                this.position.x = this.opponent.position.x - this.pushBox.width;

                if ([
                    FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP,
                    FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD
                ].includes(this.opponent.currentState)) {
                    this.opponent.position.x += PUSH_FRICTION * time.secondsPassed;
                }
            }

            // Collide at the screen's limits
            if (this.position.x == this.opponent.position.x) {
                if (this.position.x == this.pushBox.width) { // Left
                    this.opponent.position.x = this.position.x + this.pushBox.width; 
                }
                if (this.position.x == context.canvas.width - this.pushBox.width) { // Right
                    this.opponent.position.x = this.position.x - this.pushBox.width;
                }
            }

            // Collide from Right to Left
            if (this.position.x > this.opponent.position.x) { 
                this.position.x = this.opponent.position.x + this.pushBox.width;

                if ([
                    FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP,
                    FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD
                ].includes(this.opponent.currentState)) {
                    this.opponent.position.x -= PUSH_FRICTION * time.secondsPassed;
                }
            }
        }
    }

    updateAnimation(time) {
        const animation = this.animations[this.currentState];
        const [frameKey, frameDelay] = animation[this.animationFrame];

        if (time.previous > this.animationTimer + frameDelay) {
            this.animationTimer = time.previous;
    
            if (frameDelay > FrameDelay.FREEZE) {
                this.animationFrame++;
                this.pushBox = this.getPushBox(frameKey);
            }
            
            if ((this.animationFrame >= animation.length) && (this.currentState == FighterState.WALK_FORWARD || this.currentState == FighterState.WALK_BACKWARD)) {
                this.animationFrame = 2;
            }
            else if (this.animationFrame >= animation.length) {
                this.animationFrame = 0;
            }
        }
    }

    update(time, context) {
        this.position.x += (this.velocity.x * -this.direction) * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed;

        this.states[this.currentState].update(time, context);
        this.updateAnimation(time);
        this.updateStageConstraints(time, context);
    }

    drawDebug(context) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const pushBox = this.getPushBox(frameKey);
        const [[, [originX, originY]]] = this.frames.get(frameKey);

        context.lineWidth = 1;

        // Push Box
        context.beginPath();
        context.strokeStyle = "#55FF55";
        context.fillStyle = "#55FF5555";
        context.fillRect(
            this.position.x + pushBox.x,
            this.position.y + pushBox.y,
            pushBox.width,
            pushBox.height
        );
        context.rect(
            this.position.x + pushBox.x,
            this.position.y + pushBox.y,
            pushBox.width,
            pushBox.height
        );
        context.stroke();

        // Origin
        context.beginPath();
        context.strokeStyle = 'white';
        context.moveTo(this.position.x - 4, this.position.y);
        context.lineTo(this.position.x + 5, this.position.y);
        context.moveTo(this.position.x, this.position.y - 5);
        context.lineTo(this.position.x, this.position.y + 4);
        context.stroke();

        // Sprite image
        // context.beginPath();
        // context.strokeStyle = 'blue';
        // context.fillRect(
        //     this.position.x - originX, this.position.y - originY,
        //     this.image.width, this.image.height

        // );
        // context.rect(
        //     this.position.x - originX, this.position.y - originY,
        //     this.image.width, this.image.height
        // );
        // context.stroke();
    }
    
    draw(context) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const [[src, [originX, originY]]] = this.frames.get(frameKey);
        this.image = src;

        context.scale(this.direction, 1);
        context.drawImage(this.image, this.position.x * this.direction - originX, this.position.y - originY);
        context.setTransform(1, 0, 0, 1, 0, 0);

        this.drawDebug(context);
    }
}