// import { useState } from "react";
import cardBackImage from "../assets/Sundance_Cards_1080_1.png";
import "./tile.css";

interface TileData {
    id: number;
    prize: string;
    image: string;
    isFlipped: boolean;
}
interface TileProps {
    data: TileData;
    flipTile: (id: number, isFlipped: boolean) => void;
    updateTilePrize: (id: number, newPrize: string) => void;
    isEditing: boolean;
    index: number;
}
export default function Tile({
    data: { id, isFlipped, prize },
    flipTile,
    isEditing,
    updateTilePrize,
    index,
}: TileProps) {
    const handleFlip = () => {
        if (!isEditing) {
            // flipTile(!isFlipped);
            setTimeout(() => flipTile(id, !isFlipped), 200); // Delay state update for smooth transition
        }
    };

    return (
        <div className={`card1 ${!isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
            <div className="card-inner">
                {/* Card Front (Prize Image) */}
                <div className="card-front">
                    {isEditing ? (
                        <input
                            type="text"
                            value={prize}
                            onChange={(e) => updateTilePrize(id, e.target.value)}
                            className="card-input"
                        />
                    ) : (
                        <span className="prize">{prize}</span>
                    )}
                </div>

                {/* Card Back (Hidden Side) */}
                <div className="card-back d-flex flex-column align items-center justify-content-center">
                    <img src={cardBackImage} alt="Card Back" className="card-image" />
                    <span>{index + 1}</span>
                </div>
            </div>
        </div>
    );
}
