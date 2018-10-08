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
- SetSnakeDirection
- SetSnakeHeadPosition
- MoveSnake
- SetApplePosition
```

### Cordova build

This will be a Cordova application:

```
npm i -g cordova
add an empty www folder in the root of project
cordova platform add android
npm run build
cordova build android
```
