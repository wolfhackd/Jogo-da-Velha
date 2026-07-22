

type SquareProps = {
    value: 'X' | 'O' | null,
    onClick: () => void
}

//Posso passar a função por fora do componente

export function Square({value, onClick}: SquareProps) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    )
}