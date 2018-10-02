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

### Intefaces
```
  Dimension = {
    X: number;
    Y: number;
  }
```

### State
```
state: {
	status: string = 'READY' | 'PLAY' | 'PAUSE' | 'GAME OVER',
	board: {
		dimension: Dimension,
		busyBlocks: { [key]: {[key]: {value: boolean}} },
	},
	snake: {
		blocks: Dimension[],
		direction: string = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT',
		headPosition: Dimension,
	},
	apple: {
	  position: Dimenson,
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
