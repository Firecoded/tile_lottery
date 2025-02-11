import cardBackImage from "../assets/Sundance_Cards_1080_1.png";
import "./tile.css";
import { TileData } from "./TilesContainer";

interface TileProps {
    data: TileData;
    flipTile: (id: number, isFlipped: boolean) => void;
    updateTilePrize: (id: number, newPrize: string) => void;
    isEditing: boolean;
    index: number;
    isShuffling: boolean;
    toggleChaseCard: (id: number) => void;
}
export default function Tile({
    data: { id, isFlipped, prize, isChaseCard },
    flipTile,
    isEditing,
    updateTilePrize,
    toggleChaseCard,
    index,
    isShuffling,
}: TileProps) {
    const handleFlip = () => {
        if (!isEditing) {
            setTimeout(() => flipTile(id, !isFlipped), 200); // Delay state update for smooth transition
        }
    };

    return (
        <div
            className={`card1 ${!isFlipped ? "flipped" : ""}`}
            onClick={handleFlip}
            style={{
                transition: "transform 0.3s ease, opacity 0.3s ease",
                animation: isShuffling ? `shuffleEffect 0.5s ease ${index * 0.02}s` : "none",
            }}
        >
            <div className="card-inner bg-dark">
                {/* Card Front (Prize Image) */}
                <div className="card-front bg-dark d-flex flex-column">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={prize}
                                onChange={(e) => updateTilePrize(id, e.target.value)}
                                className="card-input"
                            />
                            <div className="mt-2 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    checked={isChaseCard}
                                    onChange={() => toggleChaseCard(id)}
                                    className="me-2"
                                />
                                <label className="text-white">Chase Card</label>
                            </div>
                        </>
                    ) : (
                        <span
                            className="prize text-white font-weight-bold px-2"
                            style={{ fontSize: "24px", textAlign: "center" }}
                        >
                            {prize}
                        </span>
                    )}
                </div>

                {/* Card Back (Hidden Side) */}
                <div className="card-back d-flex flex-column align-items-center justify-content-center bg-dark">
                    <img src={cardBackImage} alt="Card Back" className="card-image" />
                    <span className="font-weight-bold" style={{ fontSize: "28px", color: "#ff7612" }}>
                        {index + 1}
                    </span>
                </div>
            </div>
        </div>
    );
}
