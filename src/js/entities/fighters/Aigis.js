import { Fighter } from "./Fighter.js";
import { FighterState, PushBox } from "../../constants/fighter.js";

export class Aigis extends Fighter {
    constructor(x, y, direction, playerId) {
        super("Aigis", x, y, direction, playerId);

        // First frame
        this.image = document.createElement('img');
        this.image.src = "assets/Player/Aigis/ag000_00.png";

        this.idle = [];
        this.forwards = [];
        this.backwards = [];
        this.jumpup = [];
        this.jumpforwards = [];
        this.jumpbackwards = [];
        this.jumpstart;
        this.crouch = [];
        this.idleturn = [];
        this.crouchturn = [];

        // Idle animation holders
        for (var i = 0; i < 10; i++) {
            this.idle[i] = new Image();
            this.idle[i].src = 'assets/Player/Aigis/ag000_0' + i + '.png';
        }

        // WalkForwards - WalkBackwards animation holders
        for (var i = 0; i < 12; i++) {
            if (i < 10) {
                this.forwards[i] = new Image();
                this.forwards[i].src = 'assets/Player/Aigis/ag030_0' + i + '.png';
                this.backwards[i] = new Image();
                this.backwards[i].src = 'assets/Player/Aigis/ag031_0' + i + '.png';
            }
            else {
                this.forwards[i] = new Image();
                this.forwards[i].src = 'assets/Player/Aigis/ag030_' + i + '.png';
                this.backwards[i] = new Image();
                this.backwards[i].src = 'assets/Player/Aigis/ag031_' + i + '.png';
            }
        }

        // JumpUp - JumpBackwards animation holders
        for (var i = 0; i < 9; i++) {
            this.jumpup[i] = new Image();
            this.jumpup[i].src = 'assets/Player/Aigis/ag020_0' + i + '.png';
            this.jumpbackwards[i] = new Image();
            this.jumpbackwards[i].src = 'assets/Player/Aigis/ag207_0' + i + '.png';
        }

        // JumpForwards animation holders
        for (var i = 0; i < 13; i++) {
            if (i < 10) {
                this.jumpforwards[i] = new Image();
                this.jumpforwards[i].src = 'assets/Player/Aigis/ag202_0' + i + '.png';
            }
            else {
                this.jumpforwards[i] = new Image();
                this.jumpforwards[i].src = 'assets/Player/Aigis/ag202_' + i + '.png';
            }
        }

        // JumpFirst/Last animation holders
        this.jumpstart = new Image();
        this.jumpstart.src = 'assets/Player/Aigis/ag025_02.png';

        // Crouch animation holders
        for (var i = 0; i < 11; i++) {
            if (i < 10) {
                this.crouch[i] = new Image();
                this.crouch[i].src = 'assets/Player/Aigis/ag010_0' + i + '.png';
            }
            else {
                this.crouch[i] = new Image();
                this.crouch[i].src = 'assets/Player/Aigis/ag010_' + i + '.png';
            }
        }

        // IdleTurn - CrouchTurn animation holders
        for (var i = 0; i < 3; i++) {
            this.idleturn[i] = new Image();
            this.idleturn[i].src = 'assets/Player/Aigis/ag003_0' + i + '.png';
            this.crouchturn[i] = new Image();
            this.crouchturn[i].src = 'assets/Player/Aigis/ag013_0' + i + '.png';
        }


        this.frames = new Map([
            // Idle
            ['idle-1', [[this.idle[0], [102, 366]], PushBox.IDLE]],
            ['idle-2', [[this.idle[1], [102, 365]], PushBox.IDLE]],
            ['idle-3', [[this.idle[2], [102, 366]], PushBox.IDLE]],
            ['idle-4', [[this.idle[3], [102, 368]], PushBox.IDLE]],
            ['idle-5', [[this.idle[4], [102, 370]], PushBox.IDLE]],
            ['idle-6', [[this.idle[5], [102, 372]], PushBox.IDLE]],
            ['idle-7', [[this.idle[6], [102, 374]], PushBox.IDLE]],
            ['idle-8', [[this.idle[7], [102, 374]], PushBox.IDLE]],
            ['idle-9', [[this.idle[8], [102, 373]], PushBox.IDLE]],
            ['idle-10', [[this.idle[9], [102, 369]], PushBox.IDLE]],

            // Move Forwards
            ['forwards-1', [[this.forwards[0], [123, 378]], PushBox.IDLE]],
            ['forwards-2', [[this.forwards[1], [84, 382]], PushBox.IDLE]],
            ['forwards-3', [[this.forwards[2], [73, 373]], PushBox.IDLE]],
            ['forwards-4', [[this.forwards[3], [70, 380]], PushBox.IDLE]],
            ['forwards-5', [[this.forwards[4], [66, 386]], PushBox.IDLE]],
            ['forwards-6', [[this.forwards[5], [67, 389]], PushBox.IDLE]],
            ['forwards-7', [[this.forwards[6], [62, 383]], PushBox.IDLE]],
            ['forwards-8', [[this.forwards[7], [80, 375]], PushBox.IDLE]],
            ['forwards-9', [[this.forwards[8], [62, 378]], PushBox.IDLE]],
            ['forwards-10', [[this.forwards[9], [60, 383]], PushBox.IDLE]],
            ['forwards-11', [[this.forwards[10], [68, 388]], PushBox.IDLE]],
            ['forwards-12', [[this.forwards[11], [68, 385]], PushBox.IDLE]],

            // Move Backwards
            ['backwards-1', [[this.backwards[0], [113, 373]], PushBox.IDLE]],
            ['backwards-2', [[this.backwards[1], [120, 379]], PushBox.IDLE]],
            ['backwards-3', [[this.backwards[2], [103, 373]], PushBox.IDLE]],
            ['backwards-4', [[this.backwards[3], [96, 372]], PushBox.IDLE]],
            ['backwards-5', [[this.backwards[4], [100, 376]], PushBox.IDLE]],
            ['backwards-6', [[this.backwards[5], [98, 381]], PushBox.IDLE]],
            ['backwards-7', [[this.backwards[6], [95, 377]], PushBox.IDLE]],
            ['backwards-8', [[this.backwards[7], [101, 372]], PushBox.IDLE]],
            ['backwards-9', [[this.backwards[8], [97, 372]], PushBox.IDLE]],
            ['backwards-10', [[this.backwards[9], [100, 379]], PushBox.IDLE]],
            ['backwards-11', [[this.backwards[10], [101, 384]], PushBox.IDLE]],
            ['backwards-12', [[this.backwards[11], [99, 379]], PushBox.IDLE]],

            // Jump Up
            ['jumpup-1', [[this.jumpup[0], [44, 386]], PushBox.JUMP]],
            ['jumpup-2', [[this.jumpup[1], [45, 386]], PushBox.JUMP]],
            ['jumpup-3', [[this.jumpup[2], [72, 380]], PushBox.JUMP]],
            ['jumpup-4', [[this.jumpup[3], [90, 340]], PushBox.JUMP]],
            ['jumpup-5', [[this.jumpup[4], [99, 309]], PushBox.JUMP]],
            ['jumpup-6', [[this.jumpup[5], [77, 354]], PushBox.JUMP]],
            ['jumpup-7', [[this.jumpup[6], [62, 387]], PushBox.JUMP]],
            ['jumpup-8', [[this.jumpup[7], [69, 389]], PushBox.JUMP]],
            ['jumpup-9', [[this.jumpup[8], [70, 389]], PushBox.JUMP]],

            // Jump Forwards
            ['jumpforwards-1', [[this.jumpforwards[0], [91, 328]], PushBox.JUMP]],
            ['jumpforwards-2', [[this.jumpforwards[1], [95, 289]], PushBox.JUMP]],
            ['jumpforwards-3', [[this.jumpforwards[2], [64, 328]], PushBox.JUMP]],
            ['jumpforwards-4', [[this.jumpforwards[3], [96, 372]], PushBox.JUMP]],
            ['jumpforwards-5', [[this.jumpforwards[4], [93, 371]], PushBox.JUMP]],
            ['jumpforwards-6', [[this.jumpforwards[5], [105, 310]], PushBox.JUMP]],
            ['jumpforwards-7', [[this.jumpforwards[6], [113, 170]], PushBox.JUMP]],
            ['jumpforwards-8', [[this.jumpforwards[7], [92, 217]], PushBox.JUMP]],
            ['jumpforwards-9', [[this.jumpforwards[8], [81, 213]], PushBox.JUMP]],
            ['jumpforwards-10', [[this.jumpforwards[9], [92, 249]], PushBox.JUMP]],
            ['jumpforwards-11', [[this.jumpforwards[10], [160, 382]], PushBox.JUMP]],
            ['jumpforwards-12', [[this.jumpforwards[11], [141, 349]], PushBox.JUMP]],
            ['jumpforwards-13', [[this.jumpforwards[12], [99, 352]], PushBox.JUMP]],

            // Jump Backwards
            ['jumpbackwards-1', [[this.jumpbackwards[0], [125, 268]], PushBox.JUMP]],
            ['jumpbackwards-2', [[this.jumpbackwards[1], [136, 216]], PushBox.JUMP]],
            ['jumpbackwards-3', [[this.jumpbackwards[2], [95, 359]], PushBox.JUMP]],
            ['jumpbackwards-4', [[this.jumpbackwards[3], [100, 275]], PushBox.JUMP]],
            ['jumpbackwards-5', [[this.jumpbackwards[4], [145, 157]], PushBox.JUMP]],
            ['jumpbackwards-6', [[this.jumpbackwards[5], [126, 171]], PushBox.JUMP]],
            ['jumpbackwards-7', [[this.jumpbackwards[6], [105, 311]], PushBox.JUMP]],
            ['jumpbackwards-8', [[this.jumpbackwards[7], [84, 402]], PushBox.JUMP]],
            ['jumpbackwards-9', [[this.jumpbackwards[8], [82, 402]], PushBox.JUMP]],

            // Jump First/Last Frame
            ['jumpstart', [[this.jumpstart, [61, 307]], PushBox.IDLE]],

            // Crouch
            ['crouch-1', [[this.crouch[0], [98, 311]], PushBox.IDLE]],
            ['crouch-2', [[this.crouch[1], [86, 295]], PushBox.BEND]],
            ['crouch-3', [[this.crouch[2], [90, 266]], PushBox.CROUCH]],
            ['crouch-4', [[this.crouch[3], [92, 265]], PushBox.CROUCH]],
            ['crouch-5', [[this.crouch[4], [95, 265]], PushBox.CROUCH]],
            ['crouch-6', [[this.crouch[5], [95, 266]], PushBox.CROUCH]],
            ['crouch-7', [[this.crouch[6], [96, 268]], PushBox.CROUCH]],
            ['crouch-8', [[this.crouch[7], [96, 269]], PushBox.CROUCH]],
            ['crouch-9', [[this.crouch[8], [94, 270]], PushBox.CROUCH]],
            ['crouch-10', [[this.crouch[9], [90, 269]], PushBox.CROUCH]],
            ['crouch-11', [[this.crouch[10], [91, 268]], PushBox.CROUCH]],

            // Idle Turn
            ['idleturn-1', [[this.idleturn[0], [112, 372]], PushBox.IDLE]],
            ['idleturn-2', [[this.idleturn[1], [110, 365]], PushBox.IDLE]],
            ['idleturn-3', [[this.idleturn[2], [101, 372]], PushBox.IDLE]],

            // Crouch Turn
            ['crouchturn-1', [[this.crouchturn[0], [104, 251]], PushBox.CROUCH]],
            ['crouchturn-2', [[this.crouchturn[1], [103, 251]], PushBox.CROUCH]],
            ['crouchturn-3', [[this.crouchturn[2], [77, 251]], PushBox.CROUCH]]
        ]);

        this.animations = {
            [FighterState.IDLE]: [
                ['idle-1', 70], ['idle-2', 80], ['idle-3', 80], ['idle-4', 80], ['idle-5', 100],
                ['idle-6', 100], ['idle-7', 80], ['idle-8', 80], ['idle-9', 90], ['idle-10', 100],
            ],
            [FighterState.WALK_FORWARD]: [
                ['forwards-1', 70], ['forwards-2', 70], ['forwards-3', 70], ['forwards-4', 70], ['forwards-5', 70], ['forwards-6', 70],
                ['forwards-7', 70], ['forwards-8', 70], ['forwards-9', 70], ['forwards-10', 70], ['forwards-11', 70], ['forwards-12', 70]
            ],
            [FighterState.WALK_BACKWARD]: [
                ['backwards-1', 70], ['backwards-2', 70], ['backwards-3', 70], ['backwards-4', 70], ['backwards-5', 70], ['backwards-6', 70],
                ['backwards-7', 70], ['backwards-8', 70], ['backwards-9', 70], ['backwards-10', 70], ['backwards-11', 70], ['backwards-12', 70]
            ],
            [FighterState.JUMP_START]: [
                ['jumpstart', 20], ['jumpstart', -2],
            ],
            [FighterState.JUMP_UP]: [
                ['jumpup-1', 150], ['jumpup-2', 80], ['jumpup-3', 80], ['jumpup-4', 80], ['jumpup-5', 80], 
                ['jumpup-6', 80], ['jumpup-7', 80], ['jumpup-8', 80], ['jumpup-9', -1]
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jumpforwards-1', 100], ['jumpforwards-2', 80], ['jumpforwards-3', 60], ['jumpforwards-4', 60], ['jumpforwards-5', 80], ['jumpforwards-6', 60], ['jumpforwards-7', 30], 
                ['jumpforwards-8', 60], ['jumpforwards-9', 80], ['jumpforwards-10', 80], ['jumpforwards-11', 80], ['jumpforwards-12', 80], ['jumpforwards-13', 0]
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jumpbackwards-1', 60], ['jumpbackwards-2', 60], ['jumpbackwards-3', 30], ['jumpbackwards-4', 30], ['jumpbackwards-5', 60], 
                ['jumpbackwards-6', 80], ['jumpbackwards-7', 60], ['jumpbackwards-8', 60], ['jumpbackwards-9', 0]
            ],
            [FighterState.JUMP_END]: [
                ['jumpstart', 33], ['jumpstart', 60], ['jumpstart', -2],
            ],
            [FighterState.CROUCH]: [
                ['crouch-3', 70], ['crouch-4', 80], ['crouch-5', 80], ['crouch-6', 80], ['crouch-7', 100], 
                ['crouch-8', 100], ['crouch-9', 80], ['crouch-10', 90], ['crouch-11', 100]
            ],
            [FighterState.CROUCH_DOWN]: [
                ['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', -2]
            ],
            [FighterState.CROUCH_UP]: [
                ['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', -2]
            ],
            [FighterState.IDLE_TURN]: [
                ['idleturn-3', 40], ['idleturn-2', 40], ['idleturn-1', 40], ['idleturn-1', -2]
            ],
            [FighterState.CROUCH_TURN]: [
                ['crouchturn-3', 40], ['crouchturn-2', 40], ['crouchturn-1', 40], ['crouchturn-1', -2]
            ],
        }

        this.initialVelocity = {
            x: {
                [FighterState.WALK_FORWARD]: 550,
                [FighterState.WALK_BACKWARD]: -500,
                [FighterState.JUMP_FORWARD]: 450,
                [FighterState.JUMP_BACKWARD]: -450,
            },
            jump: -1100
        };

        this.gravity = 1800;
    }
}