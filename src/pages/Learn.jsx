
import { useState } from "react";
import VisualLesson from "./VisualLesson";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Target,
    Brain,
    Crown,
    Trophy,
    ShieldCheck,
    GraduationCap,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Lightbulb,
    // RotateCcw,
} from "lucide-react";
import "./Learn.css";

const lessons = [
    {
        id: 1,
        title: "Chess Fundamentals",
        level: "BEGINNER",
        icon: BookOpen,
        description: "Learn the board, pieces and how every piece moves.",
        sections: [
            {
                heading: "1. Understanding the chessboard",
                text: "A chessboard has 64 squares arranged in 8 rows and 8 columns. The squares alternate between light and dark.",
                points: [
                    "Place the board so the bottom-right corner is a light square.",
                    "Rows are called ranks and are numbered 1 to 8.",
                    "Columns are called files and are named a to h.",
                    "Each square has a coordinate, such as e4 or a1.",
                ],
            },
            {
                heading: "2. The six chess pieces",
                text: "Each player starts with 16 pieces. Learn their names and their starting positions.",
                points: [
                    "King: The most important piece. It moves one square in any direction.",
                    "Queen: The most powerful piece. It moves any distance horizontally, vertically or diagonally.",
                    "Rook: Moves any distance horizontally or vertically.",
                    "Bishop: Moves any distance diagonally.",
                    "Knight: Moves in an L-shape: two squares in one direction and one sideways. It can jump over pieces.",
                    "Pawn: Usually moves one square forward, but captures diagonally.",
                ],
            },
            {
                heading: "3. Setting up the pieces",
                text: "Put the rooks in the corners, knights next to them, bishops next, then the queen and king in the remaining middle squares.",
                points: [
                    "White pieces start on ranks 1 and 2.",
                    "Black pieces start on ranks 8 and 7.",
                    "Queens start on their own color: white queen on a light square, black queen on a dark square.",
                    "Pawns fill the entire row in front of the other pieces.",
                ],
            },
            {
                heading: "4. How turns work",
                text: "White always makes the first move. Players then take turns moving one piece at a time. You cannot move onto a square occupied by your own piece.",
                points: [
                    "A capture removes an opponent's piece from the board.",
                    "Most pieces cannot jump over other pieces.",
                    "The knight is the exception and can jump.",
                    "You may never make a move that leaves your own king in check.",
                ],
            },
        ],
        quiz: {
            question: "Which chess piece can jump over other pieces?",
            options: ["Bishop", "Knight", "Rook", "Queen"],
            answer: 1,
            explanation: "The knight is the only piece that can jump over other pieces.",
        },
    },
    {
        id: 2,
        title: "Rules of Chess",
        level: "BEGINNER",
        icon: ShieldCheck,
        description: "Understand check, checkmate, draws and special moves.",
        sections: [
            {
                heading: "1. Check",
                text: "A king is in check when an opponent's piece attacks its square. You must respond to check immediately.",
                points: [
                    "Move the king to a safe square.",
                    "Capture the attacking piece, if possible.",
                    "Block the attack with another piece, if possible.",
                    "You cannot ignore check or make a move that leaves your king in check.",
                ],
            },
            {
                heading: "2. Checkmate",
                text: "Checkmate happens when the king is in check and there is no legal move to escape. The game ends immediately.",
                points: [
                    "The king cannot move to a square controlled by an enemy piece.",
                    "The attacking piece cannot be captured.",
                    "The attack cannot be blocked.",
                    "The player delivering checkmate wins.",
                ],
            },
            {
                heading: "3. Castling",
                text: "Castling is a special move involving the king and a rook. The king moves two squares toward the rook, and the rook moves to the square next to the king.",
                points: [
                    "Neither the king nor the chosen rook may have moved before.",
                    "All squares between them must be empty.",
                    "The king cannot currently be in check.",
                    "The king cannot pass through or finish on an attacked square.",
                ],
            },
            {
                heading: "4. En passant",
                text: "En passant is a special pawn capture. If an opponent moves a pawn two squares forward from its starting square and lands beside your pawn, you may capture it as though it moved only one square.",
                points: [
                    "The capture must be made immediately on your next move.",
                    "Your pawn moves diagonally to the square the enemy pawn passed over.",
                    "The enemy pawn is removed from the board.",
                ],
            },
            {
                heading: "5. Pawn promotion",
                text: "When a pawn reaches the opposite end of the board, it must be promoted to a queen, rook, bishop or knight of the same color.",
                points: [
                    "You can promote to a queen even if your original queen is still on the board.",
                    "Promotion is not limited to pieces previously captured.",
                    "Most players choose a queen, but sometimes a knight is better.",
                ],
            },
            {
                heading: "6. Draws",
                text: "A chess game can end in a draw, meaning neither player wins.",
                points: [
                    "Stalemate: the player to move has no legal move but is not in check.",
                    "Threefold repetition: the same position occurs three times, with the same player to move and the same possible moves.",
                    "Fifty-move rule: 50 moves by each player occur without a pawn move or capture.",
                    "Insufficient material: neither player can possibly checkmate with the remaining pieces.",
                    "Players may also agree to a draw.",
                ],
            },
        ],
        quiz: {
            question: "What happens when a player is checkmated?",
            options: [
                "The game continues",
                "The player wins",
                "The game ends and the player loses",
                "The player gets another turn",
            ],
            answer: 2,
            explanation: "Checkmate ends the game. The player whose king is checkmated loses.",
        },
    },
    {
        id: 3,
        title: "Opening Principles",
        level: "BEGINNER",
        icon: BookOpen,
        description: "Learn how to start a game with strong opening principles.",
        sections: [
            {
                heading: "1. Control the center",
                text: "The central squares e4, d4, e5 and d5 are extremely important. Pieces placed near the center can influence more of the board.",
                points: [
                    "Try to control central squares with pawns and pieces.",
                    "Central control gives your pieces more mobility.",
                    "Avoid moving the same piece repeatedly without a good reason.",
                ],
            },
            {
                heading: "2. Develop your pieces",
                text: "Development means bringing your pieces from their starting squares to useful active squares.",
                points: [
                    "Develop knights and bishops early.",
                    "Avoid bringing your queen out too early, as it can become a target.",
                    "Try to develop several pieces before launching an attack.",
                ],
            },
            {
                heading: "3. Protect your king",
                text: "King safety is one of the most important opening goals. Castling often helps protect your king and connect your rooks.",
                points: [
                    "Castle when it is safe and useful.",
                    "Avoid unnecessary pawn moves in front of your king.",
                    "Do not leave your king exposed in the center.",
                ],
            },
            {
                heading: "4. Avoid common opening mistakes",
                text: "A good opening is not about memorizing dozens of moves. It is about following sound principles.",
                points: [
                    "Do not move too many pawns without developing pieces.",
                    "Do not bring your queen into danger.",
                    "Do not make unnecessary moves with the same piece.",
                    "Always check whether your opponent threatens something.",
                ],
            },
        ],
        quiz: {
            question: "Which is a key opening principle?",
            options: [
                "Move your queen immediately",
                "Control the center",
                "Move only pawns",
                "Avoid developing knights",
            ],
            answer: 1,
            explanation: "Controlling the center gives your pieces more space and influence.",
        },
    },
    {
        id: 4,
        title: "Chess Tactics",
        level: "INTERMEDIATE",
        icon: Target,
        description: "Find combinations that win pieces and create threats.",
        sections: [
            {
                heading: "1. The fork",
                text: "A fork is an attack by one piece against two or more enemy pieces at the same time.",
                points: [
                    "Knights are especially good at creating forks.",
                    "Look for forks against the king and queen.",
                    "A check can make a fork especially powerful because the opponent must respond.",
                ],
            },
            {
                heading: "2. The pin",
                text: "A pin happens when a piece cannot safely move because doing so would expose a more valuable piece behind it.",
                points: [
                    "An absolute pin involves the king and cannot legally be broken.",
                    "A relative pin involves another valuable piece, such as a queen.",
                    "Bishops, rooks and queens commonly create pins.",
                ],
            },
            {
                heading: "3. The skewer",
                text: "A skewer attacks a valuable piece first. When it moves away, a less valuable piece behind it can be captured.",
                points: [
                    "Skewers often involve queens, rooks and bishops.",
                    "Look for pieces lined up on the same rank, file or diagonal.",
                ],
            },
            {
                heading: "4. Discovered attacks",
                text: "A discovered attack happens when one piece moves out of the way and reveals an attack from another piece behind it.",
                points: [
                    "A discovered check reveals an attack on the enemy king.",
                    "A double check occurs when the moving piece and the revealed piece both attack the king.",
                    "Double check can be especially dangerous because the king must move.",
                ],
            },
            {
                heading: "5. The basic tactical checklist",
                text: "Before every move, look for forcing moves and tactical opportunities.",
                points: [
                    "Checks: Can you safely check the enemy king?",
                    "Captures: Can you win a piece?",
                    "Threats: Can you create an immediate threat?",
                    "Also ask what your opponent is threatening before making your move.",
                ],
            },
        ],
        quiz: {
            question: "What is a fork?",
            options: [
                "An attack on two or more pieces at once",
                "Moving the king two squares",
                "A type of draw",
                "Promoting a pawn",
            ],
            answer: 0,
            explanation: "A fork attacks multiple enemy pieces with one move.",
        },
    },
    {
        id: 5,
        title: "Chess Strategy",
        level: "INTERMEDIATE",
        icon: Brain,
        description: "Build plans, improve your pieces and understand pawn structures.",
        sections: [
            {
                heading: "1. Strategy versus tactics",
                text: "Tactics are short combinations that create immediate results. Strategy is the longer-term plan that improves your position.",
                points: [
                    "Tactics often win material immediately.",
                    "Strategy improves your pieces and position over time.",
                    "Good strategy creates opportunities for tactics.",
                ],
            },
            {
                heading: "2. Improve your worst piece",
                text: "If one of your pieces is inactive or badly placed, find a way to improve it.",
                points: [
                    "Move knights toward central squares.",
                    "Place rooks on open or semi-open files.",
                    "Use bishops on useful diagonals.",
                    "Avoid leaving pieces trapped behind your own pawns.",
                ],
            },
            {
                heading: "3. Pawn structures",
                text: "The arrangement of pawns affects the strengths and weaknesses of a position.",
                points: [
                    "Doubled pawns are two same-color pawns on one file.",
                    "Isolated pawns have no friendly pawns on neighboring files.",
                    "Passed pawns have no opposing pawn able to stop them or capture them on their way to promotion.",
                    "Connected pawns can support one another.",
                ],
            },
            {
                heading: "4. Open files and weak squares",
                text: "A file without pawns is called an open file. Rooks often become powerful when placed on open files.",
                points: [
                    "Use rooks to control open files.",
                    "Look for squares that your opponent cannot easily defend.",
                    "Try to create weaknesses in your opponent's pawn structure.",
                ],
            },
            {
                heading: "5. Make a plan",
                text: "A good plan comes from understanding the position rather than moving pieces randomly.",
                points: [
                    "Identify your opponent's weaknesses.",
                    "Find your least active piece.",
                    "Consider where your king is safest.",
                    "Choose a target and improve your pieces toward it.",
                ],
            },
        ],
        quiz: {
            question: "What is an open file?",
            options: [
                "A diagonal with no bishops",
                "A file with no pawns",
                "A rank with two kings",
                "A file occupied by only knights",
            ],
            answer: 1,
            explanation: "An open file contains no pawns and can be useful for rooks.",
        },
    },
    {
        id: 6,
        title: "Endgame Mastery",
        level: "ADVANCED",
        icon: Crown,
        description: "Learn king activity, pawn endings and basic checkmates.",
        sections: [
            {
                heading: "1. The king becomes active",
                text: "In the endgame, fewer pieces remain on the board. The king often becomes a powerful fighting piece.",
                points: [
                    "Bring your king toward the center.",
                    "Use your king to support passed pawns.",
                    "Keep your king away from dangerous enemy pawns.",
                ],
            },
            {
                heading: "2. The opposition",
                text: "Opposition is an important king-and-pawn endgame concept. Kings face one another with an odd number of squares between them.",
                points: [
                    "The player who is not required to move may have the opposition.",
                    "Opposition can help your king enter important squares.",
                    "Use it to escort a pawn toward promotion.",
                ],
            },
            {
                heading: "3. Passed pawns",
                text: "A passed pawn has no opposing pawn able to stop it or capture it on its route to promotion.",
                points: [
                    "Push a passed pawn when it is safe.",
                    "Use your king to support it.",
                    "Stop your opponent's passed pawn as early as possible.",
                ],
            },
            {
                heading: "4. Basic checkmates",
                text: "Learn the basic methods for delivering checkmate with a material advantage.",
                points: [
                    "King and queen versus king: use your queen to restrict the enemy king and bring your king closer.",
                    "King and rook versus king: use the rook to restrict the enemy king and gradually push it to the edge.",
                    "Two rooks can work together to restrict the enemy king.",
                    "Practice these checkmates until you can perform them confidently.",
                ],
            },
            {
                heading: "5. Rook endgames",
                text: "Rook endgames are common and require active pieces and careful pawn play.",
                points: [
                    "Keep your rook active rather than passive.",
                    "Place your rook behind passed pawns when appropriate.",
                    "Use your king actively.",
                    "Learn the basic Lucena and Philidor positions as you improve.",
                ],
            },
        ],
        quiz: {
            question: "What usually becomes more active in the endgame?",
            options: ["The king", "The captured pieces", "The clock", "The board"],
            answer: 0,
            explanation: "With fewer attacking pieces remaining, the king can become an active piece.",
        },
    },
    {
        id: 7,
        title: "Opening Mastery",
        level: "ADVANCED",
        icon: GraduationCap,
        description: "Explore classic openings and understand their ideas.",
        sections: [
            {
                heading: "1. The Italian Game",
                text: "The Italian Game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4. White develops quickly and aims at the f7-square.",
                points: [
                    "Develop the bishop to c4.",
                    "Castle early when safe.",
                    "Build central control with pawns and pieces.",
                    "Learn plans before memorizing long variations.",
                ],
            },
            {
                heading: "2. The Sicilian Defense",
                text: "The Sicilian Defense begins with 1.e4 c5. Black challenges the center asymmetrically and often creates counterplay on the queenside.",
                points: [
                    "Black fights for central influence from the side.",
                    "Positions can become sharp and tactical.",
                    "There are many variations, including Najdorf and Dragon setups.",
                ],
            },
            {
                heading: "3. The Ruy Lopez",
                text: "The Ruy Lopez begins with 1.e4 e5 2.Nf3 Nc6 3.Bb5. White puts pressure on the knight that helps defend e5.",
                points: [
                    "White develops the bishop to b5.",
                    "Both sides usually fight for central control.",
                    "Long-term plans and piece placement are important.",
                ],
            },
            {
                heading: "4. The Queen's Gambit",
                text: "The Queen's Gambit begins with 1.d4 d5 2.c4. White offers a pawn to challenge Black's central pawn structure.",
                points: [
                    "White aims to control the center.",
                    "Black can accept or decline the gambit.",
                    "The opening often leads to strategic positions.",
                ],
            },
            {
                heading: "5. Build your opening repertoire",
                text: "An opening repertoire is a small collection of openings you understand and can play consistently.",
                points: [
                    "Choose one main opening as White.",
                    "Choose a reliable response to 1.e4 and 1.d4 as Black.",
                    "Study the plans and typical pawn structures.",
                    "Review your own games to find where your opening knowledge needs improvement.",
                ],
            },
        ],
        quiz: {
            question: "Which move starts the Sicilian Defense?",
            options: ["1...e5", "1...c5", "1...Nf6", "1...d5"],
            answer: 1,
            explanation: "The Sicilian Defense starts with 1.e4 c5.",
        },
    },
    {
        id: 8,
        title: "Practice Arena",
        level: "ALL LEVELS",
        icon: Trophy,
        description: "Use a training routine to turn your knowledge into skill.",
        sections: [
            {
                heading: "1. Solve chess puzzles",
                text: "Puzzles train you to recognize tactical patterns and calculate forcing moves.",
                points: [
                    "Look for checks, captures and threats.",
                    "Calculate the opponent's best response.",
                    "Do not guess: understand why the move works.",
                    "Review puzzles you get wrong.",
                ],
            },
            {
                heading: "2. Play slower games",
                text: "Slower games give you time to think and apply what you have learned.",
                points: [
                    "Try rapid games before moving to faster time controls.",
                    "Check for opponent threats before every move.",
                    "Use your opening principles.",
                    "Review important moments after the game.",
                ],
            },
            {
                heading: "3. Analyze your games",
                text: "Game analysis helps you understand mistakes and find areas to improve.",
                points: [
                    "Identify the biggest mistake in the game.",
                    "Ask what your plan was at that moment.",
                    "Check whether you missed a tactic.",
                    "Write down one lesson to remember next time.",
                ],
            },
            {
                heading: "4. A daily training routine",
                text: "Consistency matters more than studying for many hours in one day.",
                points: [
                    "10 minutes: solve chess puzzles.",
                    "10 minutes: study one lesson or opening idea.",
                    "20 minutes: play a thoughtful game.",
                    "10 minutes: review your game and mistakes.",
                ],
            },
            {
                heading: "5. Your improvement checklist",
                text: "Use this checklist during every game to build good habits.",
                points: [
                    "Is my king safe?",
                    "Is any of my pieces undefended?",
                    "What is my opponent threatening?",
                    "Do I have a check, capture or strong threat?",
                    "What will happen after my move?",
                ],
            },
        ],
        quiz: {
            question: "What should you do after playing a chess game?",
            options: [
                "Forget the game",
                "Only check who won",
                "Review mistakes and missed opportunities",
                "Immediately play without thinking",
            ],
            answer: 2,
            explanation: "Reviewing your games helps you understand mistakes and improve.",
        },
    },
];

export default function Learn() {
    const [activeLesson, setActiveLesson] = useState(null);
    const [completed, setCompleted] = useState([]);
    const [answers, setAnswers] = useState({});

    const progress = Math.round((completed.length / lessons.length) * 100);
    const lesson = activeLesson !== null ? lessons[activeLesson] : null;
    const selectedAnswer = lesson ? answers[lesson.id] : undefined;

    function markCompleted() {
        if (!completed.includes(lesson.id)) {
            setCompleted([...completed, lesson.id]);
        }
    }

    function openLesson(index) {
        setActiveLesson(index);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function goToLesson(index) {
        setActiveLesson(index);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <main className="learn-page">
            <nav className="learn-navbar">
                <Link to="/" className="learn-brand">
                    <span>♞</span> CHESS STUDIO
                </Link>
                <Link to="/" className="back-game">← Back to Game</Link>
            </nav>

            {!lesson ? (
                <>
                    <section className="learn-hero">
                        <div className="learn-eyebrow">
                            <BookOpen size={14} />
                            YOUR CHESS JOURNEY STARTS HERE
                        </div>
                        <h1>
                            Master the Art
                            <br />
                            of <span>Chess.</span>
                        </h1>
                        <p>
                            From your very first move to advanced strategies.
                            Learn, practice and become a stronger chess player.
                        </p>
                        <a href="#courses" className="start-learning">
                            Explore Lessons <ArrowRight size={17} />
                        </a>
                        <div className="hero-chess">♟</div>
                    </section>

                    <section className="course-progress">
                        <div className="progress-heading">
                            <div>
                                <span className="learn-eyebrow">YOUR PROGRESS</span>
                                <h2>{completed.length} of 8 lessons completed</h2>
                            </div>
                            <strong>{progress}%</strong>
                        </div>
                        <div className="progress-track">
                            <div style={{ width: `${progress}%` }} />
                        </div>
                    </section>

                    <section className="learning-intro" id="courses">
                        <div>
                            <div className="learn-eyebrow">THE COMPLETE COURSE</div>
                            <h2>Your Path to Chess Mastery</h2>
                            <p>Eight modules. From beginner to advanced player.</p>
                        </div>
                        <span className="module-count">08 MODULES</span>
                    </section>

                    <section className="lesson-grid">
                        {lessons.map((item, index) => {
                            const Icon = item.icon;
                            const isCompleted = completed.includes(item.id);

                            return (
                                <article className="lesson-card" key={item.id}>
                                    <div className="lesson-top">
                                        <span className="lesson-number">
                                            {String(item.id).padStart(2, "0")}
                                        </span>
                                        {isCompleted ? (
                                            <CheckCircle2 size={27} />
                                        ) : (
                                            <Icon size={27} />
                                        )}
                                    </div>
                                    <span className="lesson-level">{item.level}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <ul>
                                        {item.sections.slice(0, 3).map((section) => (
                                            <li key={section.heading}>
                                                <span>✓</span> {section.heading.replace(/^\d+\.\s*/, "")}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className="lesson-button"
                                        onClick={() => openLesson(index)}
                                    >
                                        {isCompleted ? "Review Lesson" : "Start Learning"}
                                        <ArrowRight size={16} />
                                    </button>
                                </article>
                            );
                        })}
                    </section>
                </>
            ) : (
                <section className="lesson-view">
                    <button className="lesson-back" onClick={() => setActiveLesson(null)}>
                        <ArrowLeft size={16} /> All Lessons
                    </button>

                    <div className="lesson-view-heading">
                        <span className="learn-eyebrow">
                            LESSON {String(lesson.id).padStart(2, "0")} · {lesson.level}
                        </span>
                        <h1>{lesson.title}</h1>
                        <p>{lesson.description}</p>
                    </div>

                    <VisualLesson lessonId={lesson.id} />

                    <div className="lesson-content">
                        {lesson.sections.map((section) => (
                            <article className="lesson-topic" key={section.heading}>
                                <h2>{section.heading}</h2>
                                <p>{section.text}</p>
                                <ul>
                                    {section.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}

                        <div className="lesson-quiz">
                            <div className="quiz-title">
                                <Lightbulb size={22} />
                                <div>
                                    <span className="learn-eyebrow">TEST YOUR KNOWLEDGE</span>
                                    <h2>Quick Quiz</h2>
                                </div>
                            </div>

                            <h3>{lesson.quiz.question}</h3>

                            <div className="quiz-options">
                                {lesson.quiz.options.map((option, index) => (
                                    <button
                                        key={option}
                                        className={`quiz-option ${selectedAnswer === index
                                            ? index === lesson.quiz.answer
                                                ? "correct"
                                                : "incorrect"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setAnswers({ ...answers, [lesson.id]: index })
                                        }
                                    >
                                        <span>{String.fromCharCode(65 + index)}</span>
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {selectedAnswer !== undefined && (
                                <p className="quiz-feedback">
                                    {selectedAnswer === lesson.quiz.answer
                                        ? "Correct! "
                                        : "Not quite. "}
                                    {lesson.quiz.explanation}
                                </p>
                            )}
                        </div>

                        <button className="complete-button" onClick={markCompleted}>
                            <CheckCircle2 size={18} />
                            {completed.includes(lesson.id)
                                ? "Lesson Completed"
                                : "Mark Lesson as Completed"}
                        </button>

                        <div className="lesson-navigation">
                            <button
                                className="lesson-nav-button"
                                disabled={activeLesson === 0}
                                onClick={() => goToLesson(activeLesson - 1)}
                            >
                                <ArrowLeft size={16} /> Previous Lesson
                            </button>
                            <button
                                className="lesson-nav-button next"
                                disabled={activeLesson === lessons.length - 1}
                                onClick={() => goToLesson(activeLesson + 1)}
                            >
                                Next Lesson <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <footer className="learn-footer">
                <span>♞ CHESS STUDIO</span>
                <span>THINK · LEARN · MASTER</span>
            </footer>
        </main>
    );
}
