# NgrxSnake

### Structure
```
app/
  game/
    components/
      board/
      snake/
      apple/
      block/
    containers/
      game/
    store/
      ...
```

### State
```
state: {
	status: string = 'READY' | 'PLAY' | 'PAUSE' | 'GAME OVER',
	board: {
		dimension: number[] = [X, Y],
		busyBlocks: boolean[][],
	},
	snake: {
		blocks: number = X,
		direction: string = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT',
		headPosition: number[] = [X, Y],
	},
	apple: {
	  position: number[] = [X, Y],
	}
}
```

### Actions
```
- SetStatus
- SetBoardBusyBlock
- AddSnakeBlock
- SetSnakeDirection
- SetSnakeHeadPosition
- MoveSnake
- SetApplePosition
```
