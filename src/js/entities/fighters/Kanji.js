import { Fighter } from "./Fighter.js";
import { FighterState, PushBox } from "../../constants/fighter.js";

export class Kanji extends Fighter {
    constructor(x, y, direction, playerId) {
        super("Kanji", x, y, direction, playerId);

        // First frame
        this.image = document.createElement('img');
        this.image.src = "assets/Player/Kanji/ka000_00.png";

        this.idle = [];
        this.forwards = [];
        this.backwards = [];
        this.jumpstart;
        this.jumpup = [];
        this.jumpforwards = [];
        this.jumpbackwards = [];
        this.crouch = [];
        this.idleturn = [];
        this.crouchturn = [];

        // Idle - WalkForwards - WalkBackwards animation holders
        for (var i = 0; i < 12; i++) {
            if (i < 10) {
                this.idle[i] = new Image();
                this.idle[i].src = 'assets/Player/Kanji/ka000_0' + i + '.png';
                this.forwards[i] = new Image();
                this.forwards[i].src = 'assets/Player/Kanji/ka030_0' + i + '.png';
                this.backwards[i] = new Image();
                this.backwards[i].src = 'assets/Player/Kanji/ka031_0' + i + '.png';
            }
            else {
                this.idle[i] = new Image();
                this.idle[i].src = 'assets/Player/Kanji/ka000_' + i + '.png';
                this.forwards[i] = new Image();
                this.forwards[i].src = 'assets/Player/Kanji/ka030_' + i + '.png';
                this.backwards[i] = new Image();
                this.backwards[i].src = 'assets/Player/Kanji/ka031_' + i + '.png';
            }
        }

        // JumpUp animation holders
        for (var i = 0; i < 9; i++) {
            this.jumpup[i] = new Image();
            this.jumpup[i].src = 'assets/Player/Kanji/ka020_0' + i + '.png';
        }

        // JumpForwards - JumpBackwards - IdleTurn - CrouchTurn animation holders
        for (var i = 0; i < 3; i++) {
            this.jumpforwards[i] = new Image();
            this.jumpforwards[i].src = 'assets/Player/Kanji/ka123_0' + i + '.png';
            this.jumpbackwards[i] = new Image();
            this.jumpbackwards[i].src = 'assets/Player/Kanji/ka112_0' + (i+3) + '.png';
            this.idleturn[i] = new Image();
            this.idleturn[i].src = 'assets/Player/Kanji/ka003_0' + i + '.png';
            this.crouchturn[i] = new Image();
            this.crouchturn[i].src = 'assets/Player/Kanji/ka013_0' + i + '.png';
        }

        // Forwards animation holders
        this.jumpstart = new Image();
        this.jumpstart.src = 'assets/Player/Kanji/ka025_02.png';

        // Forwards animation holders
        for (var i = 0; i < 14; i++) {
            if (i < 10) {
                this.crouch[i] = new Image();
                this.crouch[i].src = 'assets/Player/Kanji/ka010_0' + i + '.png';
            }
            else {  
                this.crouch[i] = new Image();
                this.crouch[i].src = 'assets/Player/Kanji/ka010_' + i + '.png';
            }
        }

        this.frames = new Map([
            // Idle
            ['idle-1', [[this.idle[0], [142, 347]], PushBox.IDLE]],
            ['idle-2', [[this.idle[1], [144, 343]], PushBox.IDLE]],
            ['idle-3', [[this.idle[2], [143, 335]], PushBox.IDLE]],
            ['idle-4', [[this.idle[3], [144, 331]], PushBox.IDLE]],
            ['idle-5', [[this.idle[4], [143, 330]], PushBox.IDLE]],
            ['idle-6', [[this.idle[5], [144, 328]], PushBox.IDLE]],
            ['idle-7', [[this.idle[6], [141, 328]], PushBox.IDLE]],
            ['idle-8', [[this.idle[7], [141, 330]], PushBox.IDLE]],
            ['idle-9', [[this.idle[8], [141, 332]], PushBox.IDLE]],
            ['idle-10', [[this.idle[9], [141, 337]], PushBox.IDLE]],
            ['idle-11', [[this.idle[10], [142, 342]], PushBox.IDLE]],
            ['idle-12', [[this.idle[11], [143, 346]], PushBox.IDLE]],

            // Move Forwards
            ['forwards-1', [[this.forwards[0], [101, 381]], PushBox.IDLE]],
            ['forwards-2', [[this.forwards[1], [113, 373]], PushBox.IDLE]],
            ['forwards-3', [[this.forwards[2], [120, 371]], PushBox.IDLE]],
            ['forwards-4', [[this.forwards[3], [123, 374]], PushBox.IDLE]],
            ['forwards-5', [[this.forwards[4], [108, 378]], PushBox.IDLE]],
            ['forwards-6', [[this.forwards[5], [106, 377]], PushBox.IDLE]],
            ['forwards-7', [[this.forwards[6], [108, 367]], PushBox.IDLE]],
            ['forwards-8', [[this.forwards[7], [110, 366]], PushBox.IDLE]],
            ['forwards-9', [[this.forwards[8], [106, 371]], PushBox.IDLE]],
            ['forwards-10', [[this.forwards[9], [134, 376]], PushBox.IDLE]],
            ['forwards-11', [[this.forwards[10], [131, 372]], PushBox.IDLE]],
            ['forwards-12', [[this.forwards[11], [127, 365]], PushBox.IDLE]],

            // Move Backwards
            ['backwards-1', [[this.backwards[0], [122, 381]], PushBox.IDLE]],
            ['backwards-2', [[this.backwards[1], [101, 399]], PushBox.IDLE]],
            ['backwards-3', [[this.backwards[2], [127, 399]], PushBox.IDLE]],
            ['backwards-4', [[this.backwards[3], [146, 394]], PushBox.IDLE]],
            ['backwards-5', [[this.backwards[4], [140, 390]], PushBox.IDLE]],
            ['backwards-6', [[this.backwards[5], [142, 394]], PushBox.IDLE]],
            ['backwards-7', [[this.backwards[6], [135, 398]], PushBox.IDLE]],
            ['backwards-8', [[this.backwards[7], [122, 396]], PushBox.IDLE]],
            ['backwards-9', [[this.backwards[8], [152, 393]], PushBox.IDLE]],
            ['backwards-10', [[this.backwards[9], [151, 399]], PushBox.IDLE]],
            ['backwards-11', [[this.backwards[10], [101, 406]], PushBox.IDLE]],
            ['backwards-12', [[this.backwards[11], [99, 408]], PushBox.IDLE]],

            // Jump
            ['jumpup-1', [[this.jumpup[0], [83, 438]], PushBox.JUMP]],
            ['jumpup-2', [[this.jumpup[1], [79, 438]], PushBox.JUMP]],
            ['jumpup-3', [[this.jumpup[2], [76, 401]], PushBox.JUMP]],
            ['jumpup-4', [[this.jumpup[3], [93, 351]], PushBox.JUMP]],
            ['jumpup-5', [[this.jumpup[4], [105, 346]], PushBox.JUMP]],
            ['jumpup-6', [[this.jumpup[5], [104, 417]], PushBox.JUMP]],
            ['jumpup-7', [[this.jumpup[6], [90, 465]], PushBox.JUMP]],
            ['jumpup-8', [[this.jumpup[7], [113, 504]], PushBox.JUMP]],
            ['jumpup-9', [[this.jumpup[8], [112, 511]], PushBox.JUMP]],

            // Jump Forwards
            ['jumpforwards-1', [[this.jumpforwards[0], [109, 319]], PushBox.JUMP]],
            ['jumpforwards-2', [[this.jumpforwards[1], [130, 303]], PushBox.JUMP]],
            ['jumpforwards-3', [[this.jumpforwards[2], [130, 303]], PushBox.JUMP]],

            // Jump Backwards
            ['jumpbackwards-1', [[this.jumpbackwards[0], [200, 391]], PushBox.JUMP]],
            ['jumpbackwards-2', [[this.jumpbackwards[1], [182, 398]], PushBox.JUMP]],
            ['jumpbackwards-3', [[this.jumpbackwards[2], [144, 442]], PushBox.JUMP]],

            // Jump First/Last Frame
            ['jumpstart', [[this.jumpstart, [95, 361]], PushBox.IDLE]],
            
            // Crouch
            ['crouch-1', [[this.crouch[0], [113, 302]], PushBox.IDLE]],
            ['crouch-2', [[this.crouch[1], [118, 256]], PushBox.BEND]],
            ['crouch-3', [[this.crouch[2], [108, 221]], PushBox.CROUCH]],
            ['crouch-4', [[this.crouch[3], [108, 220]], PushBox.CROUCH]],
            ['crouch-5', [[this.crouch[4], [108, 219]], PushBox.CROUCH]],
            ['crouch-6', [[this.crouch[5], [108, 218]], PushBox.CROUCH]],
            ['crouch-7', [[this.crouch[6], [108, 217]], PushBox.CROUCH]],
            ['crouch-8', [[this.crouch[7], [108, 217]], PushBox.CROUCH]],
            ['crouch-9', [[this.crouch[8], [108, 217]], PushBox.CROUCH]],
            ['crouch-10', [[this.crouch[9], [108, 217]], PushBox.CROUCH]],
            ['crouch-11', [[this.crouch[10], [108, 218]], PushBox.CROUCH]],
            ['crouch-12', [[this.crouch[11], [108, 218]], PushBox.CROUCH]],
            ['crouch-13', [[this.crouch[12], [108, 219]], PushBox.CROUCH]],
            ['crouch-14', [[this.crouch[13], [108, 220]], PushBox.CROUCH]],

            // Idle Turn
            ['idleturn-1', [[this.idleturn[0], [159, 352]], PushBox.IDLE]],
            ['idleturn-2', [[this.idleturn[1], [153, 356]], PushBox.IDLE]],
            ['idleturn-3', [[this.idleturn[2], [141, 352]], PushBox.IDLE]],

            // Crouch Turn
            ['crouchturn-1', [[this.crouchturn[0], [115, 240]], PushBox.CROUCH]],
            ['crouchturn-2', [[this.crouchturn[1], [105, 263]], PushBox.CROUCH]],
            ['crouchturn-3', [[this.crouchturn[2], [107, 240]], PushBox.CROUCH]],
        ]);

        this.animations = {
            [FighterState.IDLE]: [
                ['idle-1', 70], ['idle-2', 70], ['idle-3', 70], ['idle-4', 70], ['idle-5', 70], ['idle-6', 70],
                ['idle-7', 70], ['idle-8', 70], ['idle-9', 70], ['idle-10', 70], ['idle-11', 70], ['idle-12', 70],
            ],
            [FighterState.WALK_FORWARD]: [
                ['forwards-1', 70], ['forwards-2', 70], ['forwards-3', 70], ['forwards-4', 70], ['forwards-5', 70], ['forwards-6', 70],
                ['forwards-7', 70], ['forwards-8', 70], ['forwards-9', 70], ['forwards-10', 70], ['forwards-11', 70], ['forwards-12', 70],
            ],
            [FighterState.WALK_BACKWARD]: [
                ['backwards-1', 70], ['backwards-2', 70], ['backwards-3', 70], ['backwards-4', 70], ['backwards-5', 70], ['backwards-6', 70],
                ['backwards-7', 70], ['backwards-8', 70], ['backwards-9', 70], ['backwards-10', 70], ['backwards-11', 70], ['backwards-12', 70],
            ],
            [FighterState.JUMP_START]: [
                ['jumpstart', 20], ['jumpstart', -2],
            ],
            [FighterState.JUMP_UP]: [
                ['jumpup-1', 150], ['jumpup-2', 80], ['jumpup-3', 80], ['jumpup-4', 80], ['jumpup-5', 80], 
                ['jumpup-6', 80], ['jumpup-7', 80], ['jumpup-8', 80], ['jumpup-9', -1]
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jumpforwards-1', 100], ['jumpforwards-2', 80], ['jumpforwards-3', 0],
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jumpbackwards-1', 80], ['jumpbackwards-2', 80], ['jumpbackwards-3', 0], 
            ],
            [FighterState.JUMP_END]: [
                ['jumpstart', 33], ['jumpstart', 60], ['jumpstart', -2],
            ],
            [FighterState.CROUCH]: [
                ['crouch-3', 70], ['crouch-4', 70], ['crouch-5', 70], ['crouch-6', 70], ['crouch-7', 70], ['crouch-8', 70], 
                ['crouch-9', 70], ['crouch-10', 70], ['crouch-11', 70], ['crouch-12', 70], ['crouch-13', 70], ['crouch-14', 70]
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
        };

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