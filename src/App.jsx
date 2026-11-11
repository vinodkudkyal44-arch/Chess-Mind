import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Learn from "./pages/Learn";
import { useMemo, useState } from "react";
import { Chess } from "chess.js";
import {
  RotateCcw,
  Undo2,
  Crown,
  Clock3,
  Trophy,
  CircleDot,
  ChevronRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import "./App.css";

const symbols = {
  wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙",
  bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟",
};

const pieceNames = {
  k: "King",
  q: "Queen",
  r: "Rook",
  b: "Bishop",
  n: "Knight",
  p: "Pawn",
};

function GamePage() {
  const [fen, setFen] = useState(() => new Chess().fen());
  const [selected, setSelected] = useState(null);
  const [promotion, setPromotion] = useState(null);

  const game = useMemo(() => new Chess(fen), [fen]);
  const board = game.board();
  const history = game.history({ verbose: true });
  const lastMove = history.at(-1);

  const legalMoves = selected
    ? game.moves({ square: selected, verbose: true })
    : [];

  const destinations = legalMoves.map((move) => move.to);

  const checkedKing = game.isCheck()
    ? board.flat().find(
      (piece) => piece?.type === "k" && piece.color === game.turn()
    )?.square
    : null;

  const status = game.isCheckmate()
    ? `Checkmate — ${game.turn() === "w" ? "Black" : "White"} wins`
    : game.isStalemate()
      ? "Draw — Stalemate"
      : game.isThreefoldRepetition()
        ? "Draw — Threefold repetition"
        : game.isInsufficientMaterial()
          ? "Draw — Insufficient material"
          : game.isDraw()
            ? "Draw"
            : `${game.turn() === "w" ? "White" : "Black"} to move`;

  const finished = game.isGameOver();

  function makeMove(from, to, promotionPiece) {
    try {
      const next = new Chess(fen);
      next.move({
        from,
        to,
        ...(promotionPiece ? { promotion: promotionPiece } : {}),
      });

      setFen(next.fen());
      setSelected(null);
      setPromotion(null);
    } catch {
      setSelected(null);
      setPromotion(null);
    }
  }

  function handleSquareClick(square, piece) {
    if (finished || promotion) return;

    if (selected) {
      const move = legalMoves.find((item) => item.to === square);

      if (move) {
        if (move.promotion) {
          setPromotion({
            from: move.from,
            to: move.to,
            color: move.color,
          });
          return;
        }

        makeMove(move.from, move.to);
        return;
      }
    }

    if (piece && piece.color === game.turn()) {
      setSelected(square);
    } else {
      setSelected(null);
    }
  }

  function undoMove() {
    if (history.length === 0) return;

    const next = new Chess(fen);
    next.undo();

    setFen(next.fen());
    setSelected(null);
    setPromotion(null);
  }

  function restartGame() {
    setFen(new Chess().fen());
    setSelected(null);
    setPromotion(null);
  }

  const capturedWhite = history
    .filter((move) => move.color === "b" && move.captured)
    .map((move) => ({ type: move.captured, color: "w" }));

  const capturedBlack = history
    .filter((move) => move.color === "w" && move.captured)
    .map((move) => ({ type: move.captured, color: "b" }));

  const movePairs = [];
  for (let i = 0; i < history.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1],
    });
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon">♞</span>
          <span>CHESS<span className="brand-light">STUDIO</span></span>
        </a>

        <div className="topbar-right">
          <span className="online-indicator" />
          <span className="topbar-label">LOCAL GAME</span>
          <span className="avatar">♔</span>
          <Link to="/learn" className="learn-nav-link">
            <BookOpen size={16} />
            Learn Chess
          </Link>
        </div>
      </header>

      <section className="page-content">
        <div className="heading">
          <div>
            <div className="eyebrow">
              <Sparkles size={13} />
              THE CLASSIC STRATEGY
            </div>
            <h1>Make your <span>move.</span></h1>
            <p>A quiet mind. A calculated move. An endless game.</p>
          </div>

          <div className="game-badge">
            <span className="badge-dot" />
            TWO PLAYER MODE
          </div>
        </div>

        <div className="game-layout">
          <section className="board-section">
            <div className="player-bar">
              <div className="player-avatar black-avatar">♚</div>
              <div className="player-info">
                <strong>Black Player</strong>
                <span>Dark pieces</span>
              </div>
              <div className="captured-pieces">
                {capturedWhite.map((piece, index) => (
                  <span key={index}>{symbols["w" + piece.type]}</span>
                ))}
              </div>
              <span className="turn-indicator">
                {game.turn() === "b" && !finished ? "YOUR TURN" : ""}
              </span>
            </div>

            <div className="board-frame">
              <div className="chess-board">
                {board.flatMap((rank, row) =>
                  rank.map((piece, col) => {
                    const square = piece?.square ??
                      "abcdefgh"[col] + (8 - row);

                    const dark = (row + col) % 2 === 1;
                    const isSelected = selected === square;
                    const isLastMove =
                      lastMove?.from === square ||
                      lastMove?.to === square;
                    const isTarget = destinations.includes(square);
                    const isCheck = checkedKing === square;

                    return (
                      <button
                        type="button"
                        key={square}
                        aria-label={`${square}${piece ? " " + pieceNames[piece.type] : ""}`}
                        className={[
                          "square",
                          dark ? "dark-square" : "light-square",
                          isSelected ? "selected-square" : "",
                          isLastMove ? "last-move" : "",
                          isCheck ? "check-square" : "",
                        ].join(" ")}
                        onClick={() => handleSquareClick(square, piece)}
                      >
                        {col === 0 && (
                          <span className="rank-label">{8 - row}</span>
                        )}
                        {row === 7 && (
                          <span className="file-label">
                            {"abcdefgh"[col]}
                          </span>
                        )}

                        {piece && (
                          <span
                            key={`${square}-${piece.color}-${piece.type}`}
                            className={`piece ${piece.color === "w"
                              ? "white-piece"
                              : "black-piece"
                              }`}
                          >
                            {symbols[piece.color + piece.type]}
                          </span>
                        )}

                        {isTarget && (
                          <span
                            className={
                              piece ? "capture-ring" : "move-dot"
                            }
                          />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {promotion && (
                <div className="promotion-overlay">
                  <div className="promotion-card">
                    <h3>Promote your pawn</h3>
                    <p>Choose your new piece</p>
                    <div className="promotion-options">
                      {["q", "r", "b", "n"].map((type) => (
                        <button
                          key={type}
                          onClick={() =>
                            makeMove(
                              promotion.from,
                              promotion.to,
                              type
                            )
                          }
                        >
                          {symbols[promotion.color + type]}
                          <small>{pieceNames[type]}</small>
                        </button>
                      ))}
                    </div>
                    <button
                      className="cancel-promotion"
                      onClick={() => setPromotion(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="player-bar bottom-player">
              <div className="player-avatar white-avatar">♔</div>
              <div className="player-info">
                <strong>White Player</strong>
                <span>Light pieces</span>
              </div>
              <div className="captured-pieces">
                {capturedBlack.map((piece, index) => (
                  <span key={index}>{symbols["b" + piece.type]}</span>
                ))}
              </div>
              <span className="turn-indicator">
                {game.turn() === "w" && !finished ? "YOUR TURN" : ""}
              </span>
            </div>
          </section>

          <aside className="side-panel">
            <div className="panel-card game-status-card">
              <div className="panel-heading">
                <div className="panel-icon">
                  <Crown size={18} />
                </div>
                <span>GAME STATUS</span>
              </div>

              <h2 className="status-title">
                {finished ? "Game over." : "The board is yours."}
              </h2>
              <p className="status-description">
                {status}
                {!finished && game.isCheck() && " — Your king is under attack!"}
              </p>

              <div className="status-divider" />

              <div className="status-detail">
                <span>TURN</span>
                <strong>
                  {finished
                    ? "Completed"
                    : game.turn() === "w"
                      ? "White"
                      : "Black"}
                </strong>
              </div>
              <div className="status-detail">
                <span>MOVES PLAYED</span>
                <strong>{Math.ceil(history.length / 2)}</strong>
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-heading">
                <div className="panel-icon">
                  <Clock3 size={18} />
                </div>
                <span>MOVE HISTORY</span>
                <span className="move-count">{history.length} PLIES</span>
              </div>

              <div className="move-history">
                {movePairs.length === 0 ? (
                  <div className="empty-history">
                    <span>♟</span>
                    <p>Your game begins here.</p>
                    <small>Make the first move.</small>
                  </div>
                ) : (
                  movePairs.map((pair) => (
                    <div className="move-row" key={pair.number}>
                      <span className="move-number">
                        {String(pair.number).padStart(2, "0")}
                      </span>
                      <span className="move-white">
                        {pair.white?.san}
                      </span>
                      <span className="move-black">
                        {pair.black?.san || "—"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="panel-card action-card">
              <div className="panel-heading">
                <div className="panel-icon">
                  <Trophy size={18} />
                </div>
                <span>GAME CONTROLS</span>
              </div>

              <div className="action-buttons">
                <button
                  className="action-button undo-button"
                  onClick={undoMove}
                  disabled={history.length === 0}
                >
                  <Undo2 size={17} />
                  Undo move
                </button>

                <button
                  className="action-button restart-button"
                  onClick={restartGame}
                >
                  <RotateCcw size={17} />
                  New game
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="quote-card">
              <CircleDot size={15} />
              <p>
                "Chess is the art of analysis."
              </p>
              <span>THINK BEFORE YOU MOVE</span>
            </div>
          </aside>
        </div>

        <footer className="page-footer">
          <span>♞ CHESS STUDIO</span>
          <span>BUILT FOR THE LOVE OF THE GAME</span>
          <span>64 SQUARES. INFINITE POSSIBILITIES.</span>
        </footer>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
