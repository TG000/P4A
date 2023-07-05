export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1
};

export const FighterState = {
    IDLE: 'idle',
    WALK_FORWARD: 'walkForwards',
    WALK_BACKWARD: 'walkBackwards',
    JUMP_START: 'jumpStart',
    JUMP_UP: 'jumpUp',
    JUMP_FORWARD: 'jumpForwards',
    JUMP_BACKWARD: 'jumpBackwards',
    JUMP_END: 'jumpEnd',
    CROUCH: 'crouch',
    CROUCH_UP: 'crouchUp',
    CROUCH_DOWN: 'crouchDown',
    IDLE_TURN: 'idleTurn',
    CROUCH_TURN: 'crouchTurn'
};

export const PushBox = {
    IDLE: [-73, -320, 140, 280],
    JUMP: [-73, -300, 140, 260],
    BEND: [-73, -240, 140, 260],
    CROUCH: [-67, -220, 130, 210]
};