import type { Board, SudokuValue } from '../types';
import { shuffle, boardIsValid } from './generator';

export function generatePuzzle(board: Board, emptyCells: number): Board {

    const puzzle = board.map(row => [...row]) as Board;
    let removed = 0;
    let positions: [number, number][] = [];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            positions.push([row, col]);
        }
    }

    positions = shuffle(positions);

    let i = 0;
    while (removed < emptyCells && i < positions.length) {
        const [row, col] = positions[i];
        
        const temp = puzzle[row][col];

        if (temp !== 0) {
            puzzle[row][col] = 0;

            if (countSolutions(puzzle) === 1) {
                removed++;
            } else {
                puzzle[row][col] = temp;
            }
        }
        i++;
    }
    return puzzle;
}

export function countSolutions(board: Board): number {
    let solutions = 0;

    function solve(b: Board) {

        if (solutions > 1) return;

        for (let row = 0; row < 9; row++){
            for (let col = 0; col <9; col++) {
                if (b[row][col] === 0){
                    for (let num = 1; num <= 9; num++) {
                        if (boardIsValid(b, row, col, num)) {
                            b[row][col] = num as SudokuValue;
                            solve(b);
                            b[row][col] = 0;
                        }
                    }
                    return;
                }
            }
        }
        solutions++;
    }

    const boardCopy = board.map(row => [...row]) as Board;
    solve(boardCopy);
    return solutions;
}