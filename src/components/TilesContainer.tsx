import { useState } from "react";
import Tile from "./Tile";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export interface TileData {
    id: number;
    prize: string;
    image: string;
    isFlipped: boolean;
    isChaseCard: boolean;
}

export default function TilesContainer() {
    const [tileConfig, setTileConfig] = useState(() => {
        const savedConfig = localStorage.getItem("tileConfig");
        return savedConfig
            ? (JSON.parse(savedConfig).map((tile: TileData) => ({
                  ...tile,
                  isFlipped: false,
                  isChaseCard: tile.isChaseCard == true,
              })) as TileData[])
            : [
                  { id: 1, prize: "Gold Coin", image: "🥇", isFlipped: false, isChaseCard: false },
                  { id: 2, prize: "Silver Coin", image: "🥈", isFlipped: false, isChaseCard: false },
                  { id: 3, prize: "Bronze Coin", image: "🥉", isFlipped: false, isChaseCard: false },
                  { id: 4, prize: "Diamond", image: "💎", isFlipped: false, isChaseCard: false },
                  { id: 5, prize: "Star", image: "⭐", isFlipped: false, isChaseCard: false },
                  { id: 6, prize: "Gift Box", image: "🎁", isFlipped: false, isChaseCard: false },
                  { id: 7, prize: "Treasure Chest", image: "🪙", isFlipped: false, isChaseCard: false },
                  { id: 8, prize: "Crown", image: "👑", isFlipped: false, isChaseCard: false },
                  { id: 9, prize: "Mystery Box", image: "❓", isFlipped: false, isChaseCard: false },
                  { id: 10, prize: "Rocket", image: "🚀", isFlipped: false, isChaseCard: false },
                  { id: 11, prize: "Heart", image: "❤️", isFlipped: false, isChaseCard: false },
                  { id: 12, prize: "Lightning", image: "⚡", isFlipped: false, isChaseCard: false },
                  { id: 13, prize: "Key", image: "🔑", isFlipped: false, isChaseCard: false },
                  { id: 14, prize: "Shield", image: "🛡️", isFlipped: false, isChaseCard: false },
                  { id: 15, prize: "Bag of Coins", image: "💰", isFlipped: false, isChaseCard: false },
                  { id: 16, prize: "Medal", image: "🏅", isFlipped: false, isChaseCard: false },
                  { id: 17, prize: "Fire", image: "🔥", isFlipped: false, isChaseCard: false },
                  { id: 18, prize: "Gem", image: "💠", isFlipped: false, isChaseCard: false },
                  { id: 19, prize: "Lucky Clover", image: "🍀", isFlipped: false, isChaseCard: false },
                  { id: 20, prize: "Sun", image: "🌞", isFlipped: false, isChaseCard: false },
                  { id: 21, prize: "Moon", image: "🌙", isFlipped: false, isChaseCard: false },
                  { id: 22, prize: "Anchor", image: "⚓", isFlipped: false, isChaseCard: false },
                  { id: 23, prize: "Bell", image: "🔔", isFlipped: false, isChaseCard: false },
                  { id: 24, prize: "Sword", image: "🗡️", isFlipped: false, isChaseCard: false },
              ];
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isShuffling, setShuffling] = useState(false);
    const [chaseCardFlipped, setChaseCardFlipped] = useState(false);

    const flipTile = (id: number, isFlipped: boolean) => {
        setTileConfig((prevConfig) =>
            prevConfig.map((tile) => {
                if (tile.id === id) {
                    if (tile.isChaseCard && isFlipped) {
                        setChaseCardFlipped(true);
                    }
                    return { ...tile, isFlipped };
                }
                return tile;
            })
        );
    };

    const updateTilePrize = (id: number, prize: string) => {
        setTileConfig(tileConfig.map((tile) => (tile.id === id ? { ...tile, prize } : tile)));
    };

    const handleIsEditing = () => {
        setTileConfig(tileConfig.map((tile) => ({ ...tile, isFlipped: true })));
        setIsEditing(true);
    };

    const handleSave = () => {
        localStorage.setItem("tileConfig", JSON.stringify(tileConfig));
        setTileConfig(tileConfig.map((tile) => ({ ...tile, isFlipped: false })));
        setIsEditing(false);
    };

    const handleShuffle = () => {
        setShuffling(true);
        setTimeout(() => {
            setTileConfig((prevConfig) => {
                let shuffled = [...prevConfig];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            });
            setShuffling(false);
        }, 500);
    };

    const toggleChaseCard = (id: number) => {
        setTileConfig((prevConfig) =>
            prevConfig.map((tile) => (tile.id === id ? { ...tile, isChaseCard: !tile.isChaseCard } : tile))
        );
    };

    const { width, height } = useWindowSize();

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
            className="bg-black"
        >
            {chaseCardFlipped && <ReactConfetti width={width} height={height} numberOfPieces={500} gravity={0.3} />}
            <div
                style={{
                    position: "relative",
                    width: "90%", // Make grid dynamic based on container
                }}
            >
                <div className="d-flex justify-content-between mb-2">
                    <div>
                        {chaseCardFlipped && (
                            <button className="btn btn-secondary me-2" onClick={() => setChaseCardFlipped(false)}>
                                End confetti
                            </button>
                        )}
                    </div>
                    <div>
                        <button className="btn btn-secondary me-2" onClick={handleShuffle}>
                            Shuffle
                        </button>
                        <button className="btn btn-secondary" onClick={isEditing ? handleSave : handleIsEditing}>
                            {isEditing ? "Save" : "Edit"}
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(8, 1fr)", // 8 columns
                        gridTemplateRows: "repeat(3, 1fr)", // 3 rows
                        gap: "1.2vw", // Dynamically adjusts based on screen size
                        justifyContent: "center",
                        width: "100%", // Make it responsive
                    }}
                >
                    {tileConfig.map((tile, index) => (
                        <Tile
                            key={tile.id}
                            data={tile}
                            flipTile={flipTile}
                            isEditing={isEditing}
                            updateTilePrize={updateTilePrize}
                            index={index}
                            isShuffling={isShuffling}
                            toggleChaseCard={toggleChaseCard}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
