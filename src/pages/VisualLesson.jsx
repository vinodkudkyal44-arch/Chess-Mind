
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import "./VisualLesson.css";

const demos = {
    1: {
        title: "How chess pieces move",
        steps: [
            {
                title: "Meet the chessboard",
                description:
                    "A chessboard has 8 files (a–h) and 8 ranks (1–8). The bottom-right square must always be light.",
                pieces: {
                    a1: "♖", e1: "♔", h1: "♖",
                    a2: "♙", e2: "♙", h2: "♙",
                    a8: "♜", e8: "♚", h8: "♜",
                    a7: "♟", e7: "♟", h7: "♟",
                },
                highlights: ["a1", "e1", "h1", "a8", "e8", "h8"],
            },
            {
                title: "The knight moves in an L-shape",
                description:
                    "A knight moves two squares in one direction and one square sideways. It can jump over other pieces.",
                pieces: { g1: "♘" },
                highlights: ["g1", "f3", "h3", "e2", "e0", "f?"],
                markers: ["e2", "f3", "h3", "e?"],
            },
            {
                title: "The pawn moves forward",
                description:
                    "A pawn normally moves one square forward. From its starting square, it may move two squares if both squares are clear.",
                pieces: { e2: "♙" },
                highlights: ["e2", "e3", "e4"],
                markers: ["e3", "e4"],
            },
        ],
    },
    2: {
        title: "Special chess rules",
        steps: [
            {
                title: "The king is in check",
                description:
                    "The rook attacks the black king along the e-file. The king must escape, block the attack or capture the attacker if legal.",
                pieces: { e8: "♚", e1: "♖", a8: "♜", h1: "♔" },
                highlights: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8"],
            },
            {
                title: "Castling",
                description:
                    "In kingside castling, the king moves two squares toward the rook, and the rook moves next to the king. All castling conditions must be satisfied.",
                pieces: { e1: "♔", h1: "♖" },
                highlights: ["e1", "f1", "g1", "h1"],
                markers: ["g1", "f1"],
            },
            {
                title: "Pawn promotion",
                description:
                    "When a pawn reaches the last rank, it must become a queen, rook, bishop or knight of its color.",
                pieces: { e7: "♙", e8: "♕" },
                highlights: ["e7", "e8"],
            },
        ],
    },
    3: {
        title: "Control the center",
        steps: [
            {
                title: "Find the four central squares",
                description:
                    "The squares d4, e4, d5 and e5 are the center. Controlling them gives your pieces more space and influence.",
                pieces: {},
                highlights: ["d4", "e4", "d5", "e5"],
            },
            {
                title: "Occupy the center",
                description:
                    "White can place pawns on e4 and d4 to claim central space. Black will try to challenge this control.",
                pieces: { e4: "♙", d4: "♙", e7: "♟", d7: "♟" },
                highlights: ["d4", "e4", "d5", "e5"],
            },
            {
                title: "Develop your pieces",
                description:
                    "Bring knights and bishops into the game. Developed pieces help defend your center and prepare your king to castle.",
                pieces: {
                    e4: "♙", d4: "♙", e7: "♟", d7: "♟",
                    f3: "♘", c3: "♘", f6: "♞", c6: "♞",
                },
                highlights: ["f3", "c3", "f6", "c6"],
            },
        ],
    },
    4: {
        title: "Discover chess tactics",
        steps: [
            {
                title: "The knight fork",
                description:
                    "The white knight on d5 attacks both the black king on e7 and queen on f6. A single move creates two threats.",
                pieces: { d5: "♘", e7: "♚", f6: "♛" },
                highlights: ["d5", "e7", "f6"],
            },
            {
                title: "The pin",
                description:
                    "A bishop on b5 attacks a knight on c6. If that knight moves, it may expose the king on e8 to an attack along the diagonal.",
                pieces: { b5: "♗", c6: "♞", e8: "♚" },
                highlights: ["b5", "c6", "e8"],
            },
            {
                title: "The skewer",
                description:
                    "A rook attacks a valuable piece first. When that piece moves, the rook may capture the less valuable piece behind it.",
                pieces: { a1: "♖", a8: "♚", a6: "♜" },
                highlights: ["a1", "a6", "a8"],
            },
        ],
    },
    5: {
        title: "Build a winning position",
        steps: [
            {
                title: "Understand open files",
                description:
                    "An open file has no pawns. Rooks can become powerful when placed on open files.",
                pieces: { a1: "♖", a8: "♜" },
                highlights: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"],
            },
            {
                title: "Recognize passed pawns",
                description:
                    "A passed pawn has no opposing pawn that can stop it or capture it on its route to promotion.",
                pieces: { e6: "♙", a7: "♟", h7: "♟" },
                highlights: ["e6", "e7", "e8"],
            },
            {
                title: "Improve your pieces",
                description:
                    "Find your least active piece and move it to a more useful square. Good piece placement makes your plans stronger.",
                pieces: { c1: "♗", b5: "♗", g1: "♘", f3: "♘" },
                highlights: ["b5", "f3"],
            },
        ],
    },
    6: {
        title: "Endgame examples",
        steps: [
            {
                title: "Activate your king",
                description:
                    "When fewer pieces remain, the king becomes an active fighting piece. Bring it toward the center when safe.",
                pieces: { e4: "♔", e8: "♚" },
                highlights: ["e4", "d4", "f4", "d5", "e5", "f5"],
            },
            {
                title: "Push a passed pawn",
                description:
                    "A supported passed pawn can become a queen. Use your king to help it advance safely.",
                pieces: { e6: "♙", d5: "♔", h8: "♚" },
                highlights: ["e6", "e7", "e8"],
            },
            {
                title: "Checkmate with a queen",
                description:
                    "A queen and king can force checkmate against a lone king. Restrict the enemy king and bring your own king closer.",
                pieces: { c6: "♔", b7: "♕", a8: "♚" },
                highlights: ["a8", "b7", "c6"],
            },
        ],
    },
    7: {
        title: "Explore chess openings",
        steps: [
            {
                title: "The Italian Game: first moves",
                description:
                    "The Italian Game begins 1.e4 e5 2.Nf3 Nc6 3.Bc4. White develops quickly and aims at the f7-square.",
                pieces: {
                    e4: "♙", e5: "♟",
                    f3: "♘", c6: "♞",
                    c4: "♗",
                },
                highlights: ["e4", "e5", "f3", "c6", "c4", "f7"],
            },
            {
                title: "The Sicilian Defense",
                description:
                    "The Sicilian begins 1.e4 c5. Black challenges White's central pawn asymmetrically.",
                pieces: { e4: "♙", c5: "♟" },
                highlights: ["e4", "c5", "d4", "d5"],
            },
            {
                title: "The Ruy Lopez",
                description:
                    "The Ruy Lopez begins 1.e4 e5 2.Nf3 Nc6 3.Bb5. White puts pressure on the knight defending e5.",
                pieces: {
                    e4: "♙", e5: "♟",
                    f3: "♘", c6: "♞",
                    b5: "♗",
                },
                highlights: ["e4", "e5", "f3", "c6", "b5"],
            },
        ],
    },
    8: {
        title: "Practice your chess thinking",
        steps: [
            {
                title: "Look for checks",
                description:
                    "Before making a move, check whether you can safely attack the enemy king.",
                pieces: { e1: "♖", e8: "♚" },
                highlights: ["e1", "e8"],
            },
            {
                title: "Look for captures",
                description:
                    "Check whether you can win an undefended or valuable enemy piece.",
                pieces: { d4: "♘", f5: "♜", e6: "♛" },
                highlights: ["d4", "f5", "e6"],
            },
            {
                title: "Look for threats",
                description:
                    "A strong move can create more than one threat. Look for forks, pins and discovered attacks.",
                pieces: { d5: "♘", e7: "♚", f6: "♛" },
                highlights: ["d5", "e7", "f6"],
            },
        ],
    },
};

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const whitePieces = new Set(["♔", "♕", "♖", "♗", "♘", "♙"]);

export default function VisualLesson({ lessonId }) {
    const demo = demos[lessonId] || demos[1];
    const [stepIndex, setStepIndex] = useState(0);
    const step = demo.steps[stepIndex];

    return (
        <section className="visual-lesson">
            <div className="visual-lesson-heading">
                <span>INTERACTIVE CHESS DEMONSTRATION</span>
                <h2>{demo.title}</h2>
                <p>Follow each step and observe the board.</p>
            </div>

            <div className="visual-demo-layout">
                <div className="visual-board-wrap">
                    <div className="visual-chessboard">
                        {ranks.map((rank, rowIndex) =>
                            files.map((file, colIndex) => {
                                const square = `${file}${rank}`;
                                const isLight = (rowIndex + colIndex) % 2 === 1;
                                const piece = step.pieces[square];

                                return (
                                    <div
                                        key={square}
                                        className={[
                                            "visual-square",
                                            isLight ? "light-square" : "dark-square",
                                            step.highlights?.includes(square) ? "highlight-square" : "",
                                        ].join(" ")}
                                    >
                                        {piece && (
                                            <span
                                                className={`visual-piece ${whitePieces.has(piece) ? "white-piece" : "black-piece"
                                                    }`}
                                            >
                                                {piece}
                                            </span>
                                        )}
                                        {colIndex === 0 && (
                                            <span className="rank-coordinate">{rank}</span>
                                        )}
                                        {rowIndex === 7 && (
                                            <span className="file-coordinate">{file}</span>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="visual-step-panel">
                    <div className="visual-step-count">
                        STEP {stepIndex + 1} / {demo.steps.length}
                    </div>
                    <div className="visual-step-progress">
                        <div
                            style={{
                                width: `${((stepIndex + 1) / demo.steps.length) * 100}%`,
                            }}
                        />
                    </div>

                    <h3>{step.title}</h3>
                    <p>{step.description}</p>

                    <div className="visual-step-controls">
                        <button
                            onClick={() => setStepIndex(0)}
                            title="Restart demonstration"
                            aria-label="Restart demonstration"
                        >
                            <RotateCcw size={16} />
                        </button>
                        <button
                            disabled={stepIndex === 0}
                            onClick={() => setStepIndex((current) => current - 1)}
                        >
                            <ArrowLeft size={16} /> Previous
                        </button>
                        <button
                            className="visual-next"
                            disabled={stepIndex === demo.steps.length - 1}
                            onClick={() => setStepIndex((current) => current + 1)}
                        >
                            Next <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
